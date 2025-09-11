import { Router } from "express";
import { createAsset, deleteUserAssetById, getAssetById, getUsersAllAssets } from "../controllers/asset.js";
import { upload } from "../middlewares/multer.js";
import { verifyAccessToken } from "../middlewares/verifyAccessToken.js";

const router = Router();

router.route("/upload").post(verifyAccessToken, upload.fields([{ name: "assetImage", maxCount: 2 }]), createAsset);

router.route("/get-user-assets").get(verifyAccessToken, getUsersAllAssets);

router.route("/delete-user-asset").delete(verifyAccessToken, deleteUserAssetById);

router.route("/get-asset-details").get(verifyAccessToken, getAssetById);

export default router;