import crypto from "crypto";
import sortObject from "sortobject";
import config from "../configs/config.js";
import Purchase from "../models/Purchase.js";
import Course from "../models/Course.js";
import User from "../models/User.js";

export const vnpayReturn = async (req, res) => {
  try {
    let vnp_Params = req.query;
    const secureHash = vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];

    vnp_Params = sortObject(vnp_Params);
    const signData = new URLSearchParams(vnp_Params).toString();
    const hmac = crypto.createHmac("sha512", config.vnp_HashSecret);
    const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

    if (secureHash === signed) {
      const orderId = vnp_Params["vnp_TxnRef"];
      const responseCode = vnp_Params["vnp_ResponseCode"];

      if (responseCode === "00") {
        const purchase = await Purchase.findById(orderId);
        const { userId, courseId } = purchase;
        await Purchase.findByIdAndUpdate(orderId, { status: "completed" });
        await User.findByIdAndUpdate(userId, {
          $addToSet: { enrolledCourses: courseId },
        });
        await Course.findByIdAndUpdate(courseId, {
          $addToSet: { enrolledStudents: userId },
        });
        return res.redirect(`${process.env.VITE_CLIENT_URL}/payment-success`);
      } else {
        await Purchase.findByIdAndUpdate(orderId, { status: "failed" });
        return res.redirect(`${process.env.VITE_CLIENT_URL}/payment-fail`);
      }
    } else {
      return res.status(400).json({ success: false, message: "Error" });
    }
  } catch (error) {
    console.error("Return URL Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
