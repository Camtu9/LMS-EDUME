import jwt from "jsonwebtoken";
import User from "../models/User.js"

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

export const protectEducator = async (req, res, next) => {
  try {
      const userId = req.user.id
      const user = await User.findById(userId).select('role')
      if(user.role !== 'educator'){
          return res.json({
              success: false,
              message: 'Unauhthorized'
          })
      }
      next()
  } catch (error) {
      res.json({success: false, message: error.message})
  }
}

