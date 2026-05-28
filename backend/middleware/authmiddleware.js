import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Expect "id" in the payload
    const userId = decoded.id;
    if (!userId) return res.status(401).json({ error: "Invalid token payload" });

    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(401).json({ error: "User not found" });

    req.user = user; // full user doc with _id, name, regNo
    next();
  } catch (err) {
    console.error("JWT error:", err.message);
    res.status(401).json({ error: "Invalid token" });
  }
};