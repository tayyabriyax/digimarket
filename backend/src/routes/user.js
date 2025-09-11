import { Router } from "express";
import { deleteUser, getAllUsers, getUserProfile, loginUser, registerUser, updateUser } from "../controllers/user.js";
import { verifyAccessToken } from "../middlewares/verifyAccessToken.js";
import { upload } from "../middlewares/multer.js";
import { isAdmin } from "../middlewares/verifyAdmin.js";

const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/get-profile").get(verifyAccessToken, getUserProfile);

router.route("/update-profile").put(verifyAccessToken, upload.single("profilePic"), updateUser);

router.route("/get-all-users").get(verifyAccessToken, isAdmin, getAllUsers);

router.route("/delete-user").delete(verifyAccessToken, isAdmin, deleteUser);

export default router;