import { User } from "../models/user.js";
import { ApiError } from "../utils/ApiError.js";

const isAdmin = async (req, res, next) => {
    const user = req.user;

    const existedUser = await User.findById(user._id);

    if (!existedUser) {
        throw new ApiError(404, "User not found !");
    }

    const isAdmin = existedUser.role === "ADMIN";

    if (isAdmin) {
        next();
    } else {
        throw new ApiError(401, "Access Denied !");
    }
}

export { isAdmin }