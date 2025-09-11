import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";

const verifyAccessToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        throw new ApiError(401, "Authorization token missing !");
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        throw new ApiError(401, "Unauthorized !");
    }
}

export { verifyAccessToken };