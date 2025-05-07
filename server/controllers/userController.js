import Stripe from "stripe";
import Purchase from "../models/Purchase.js";
import User from "../models/User.js";
import Course from "../models/Course.js";
import CourseProgress from "../models/CourseProgress.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmail = reg.test(email);
    if (!name || !email || !password) {
      return res.json({ success: false, message: "The input is required" });
    } else if (!isEmail) {
      return res.json({
        success: false,
        message: "The email is not correctly",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "Email is already in use" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    res.json({ success: true, user });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Incorrect password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({
      success: true,
      token,
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getUserData = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const updateUserInformation = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email } = req.body;

    const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmail = reg.test(email);

    if (!name || !email) {
      return res.json({
        success: false,
        message: "Username and email are required",
      });
    }

    if (!isEmail) {
      return res.json({ success: false, message: "Invalid email format" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser._id.toString() !== userId) {
      return res.json({ success: false, message: "Email is already in use" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true, runValidators: true }
    ).select("-password");

    res.json({
      success: true,
      message: "User information updated",
      user: updatedUser,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const changePassword = async (req, res) => {
  const userId = req.user.id;
  const { currentPassword, newPassword, confirmPassword } = req.body;
  try {
    const user = await User.findById(userId).select("password");
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "The current password is not correct",
      });
    }
    if (newPassword !== confirmPassword) {
      return res.json({
        success: false,
        message: "The new password and confirm password do not match",
      });
    }
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      return res.json({
        success: false,
        message: "New password must be different from current password",
      });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      { new: true, runValidators: true }
    );
    res.json({
      success: true,
      message: "Password changed",
    });
  } catch (error) {
    res.json({ success: true, message: error.message });
  }
};

export const userEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    const userData = await User.findById(userId).populate("enrolledCourses");
    res.json({ success: true, enrolledCourses: userData.enrolledCourses });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// export const purchaseCourse = async (req, res) => {
//   try {
//     const { courseId } = req.body;
//     const { origin } = req.headers;
//     const userId = req.user.id;

//     const userData = await User.findById(userId);
//     const courseData = await Course.findById(courseId);

//     if (!userData || !courseData) {
//       return res.json({ success: false, message: "Data not found" });
//     }

//     const purchaseData = {
//       courseId: courseData._id,
//       userId,
//       amount: (
//         courseData.coursePrice -
//         (courseData.discount * courseData.coursePrice) / 100
//       ).toFixed(2),
//     };

//     const newPurchase = await Purchase.create(purchaseData);

//     const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
//     const currency = process.env.CURRENCY.toLowerCase();

//     const line_items = [
//       {
//         price_data: {
//           currency,
//           product_data: {
//             name: courseData.courseTitle,
//           },
//           unit_amount: Math.floor(newPurchase.amount) * 100,
//         },
//         quantity: 1,
//       },
//     ];

//     const session = await stripeInstance.checkout.sessions.create({
//       success_url: `${origin}/loading/my-enrollments`,
//       cancel_url: `${origin}/loading/my-enrollments`,
//       line_items: line_items,
//       mode: "payment",
//       metadata: {
//         purchaseId: newPurchase._id.toString(),
//       },
//     });

//     res.json({ success: true, session_url: session.url });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

import crypto from "crypto";
import sortObject from "sortobject";
import config from "../configs/config.js";
import dateFormat from "dateformat";
export const purchaseCourse = async (req, res) => {
  try {
    const ipAddr =
      req.headers["x-forwarded-for"] ||
      req.connection?.remoteAddress ||
      req.socket?.remoteAddress ||
      req.connection?.socket?.remoteAddress;

    const { courseId, bankCode, language, orderDescription, orderType } =
      req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    if (!user || !course) {
      return res
        .status(404)
        .json({ success: false, message: "User or course not found" });
    }
    const usdToVndRate = 25959
    const amountUSD = course.coursePrice * (1 - course.discount / 100);
    const amount = Math.ceil(amountUSD * usdToVndRate);

    const purchase = await Purchase.create({
      courseId: course._id,
      userId,
      amount,
    });

    const tmnCode = config.vnp_TmnCode;
    const secretKey = config.vnp_HashSecret;
    const vnpUrl = config.vnp_Url;
    const returnUrl = config.vnp_ReturnUrl;

    const date = new Date();
    const createDate = dateFormat(date, "yyyymmddHHMMss");
    const orderId = purchase._id.toString();

    let vnp_Params = {
      vnp_Version: "2.1.0",
      vnp_Command: "pay",
      vnp_TmnCode: tmnCode,
      vnp_Locale: language || "vn",
      vnp_CurrCode: "VND",
      vnp_TxnRef: orderId,
      vnp_OrderInfo: orderDescription || course.courseTitle,
      vnp_OrderType: orderType || "other",
      vnp_Amount: Math.ceil(amount * 100),
      vnp_ReturnUrl: returnUrl,
      vnp_IpAddr: ipAddr,
      vnp_CreateDate: createDate,
    };

    if (bankCode && bankCode.trim() !== "") {
      vnp_Params["vnp_BankCode"] = bankCode;
    }
    

    vnp_Params = sortObject(vnp_Params);

    const redirectUrl = new URLSearchParams("");
    Object.entries(vnp_Params).sort(([key1, key2]) => key1.toString().localeCompare(key2.toString())).forEach(([key, value]) => {
      if(!value || value === "" || value === undefined || value === null){
        return;
      }
      redirectUrl.append(key, value.toString());
    });
    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(Buffer.from(redirectUrl.toString(), 'utf-8')).digest("hex");
    redirectUrl.append("vnp_SecureHash",signed);
    console.log(redirectUrl.toString());

    res.json({ success: true, session_url: vnpUrl + "?" + redirectUrl.toString()});
  } catch (error) {
    console.error("Payment Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateUserCourseProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId, lectureId } = req.body;

    const progressData = await CourseProgress.findOne({ userId, courseId });

    if (progressData) {
      if (progressData.lectureCompleted.includes(lectureId)) {
        return res.json({
          success: true,
          message: "Lecture already completed",
        });
      }
      progressData.lectureCompleted.push(lectureId);
      await progressData.save();
    } else {
      await CourseProgress.create({
        userId,
        courseId,
        lectureCompleted: [lectureId],
      });
    }

    res.json({ success: true, message: "Progress updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getUserCourseProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.body;
    const progressData = await CourseProgress.findOne({ userId, courseId });
    res.json({ success: true, progressData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const addUserRating = async (req, res) => {
  const userId = req.user.id;
  const { courseId, rating } = req.body;

  if (!courseId || !userId || !rating || rating < 1 || rating > 5) {
    return res.json({ success: false, message: "Invalid input" });
  }

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.json({ success: false, message: "Course not found" });
    }

    const user = await User.findById(userId);
    if (!user || !user.enrolledCourses.includes(courseId)) {
      return res.json({
        success: false,
        message: "User has not purchased this course",
      });
    }

    const existingRatingIndex = course.courseRatings.findIndex(
      (r) => r.userId === userId
    );

    if (existingRatingIndex > -1) {
      course.courseRatings[existingRatingIndex].rating = rating;
    } else {
      course.courseRatings.push({ userId, rating });
    }

    await course.save();
    return res.json({ success: true, message: "Rating is added" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
