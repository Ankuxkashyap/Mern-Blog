import User from "../models/User.model.js";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;

    // console.log("Token received:", token);

    if (!token) {
        return res.status(401).json({ message: "Unauthorized access" });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");
        // console.log("Decoded user:", decoded);
        if (!user) {
        return res.status(404).json({ message: "User not found" });
        }
    
        req.user = user; 
        next(); 
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(401).json({ message: "Invalid token" });
    }
}