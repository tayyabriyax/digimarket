import { Asset } from "../models/asset.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createAsset = async (req, res) => {
    const user = req.user;
    const { title, description, price, category } = req.body;
    const { assetImage } = req.files;

    if ([title, price, category].some(field => field.trim() === "")) {
        throw new ApiError(400, "All fields are required !");
    }

    if (!assetImage) {
        throw new ApiError(400, "Asset Image is required !");
    }

    const assetImageURLs = await Promise.all(
        assetImage.map((image) => uploadOnCloudinary(image.path))
    );

    const createdAsset = await Asset.create({
        title,
        price,
        description,
        category,
        createdBy: user._id,
        assetImage: assetImageURLs
    });

    res.status(201).json(
        new ApiResponse(201, createdAsset, "Asset uploaded Successfully !")
    )
}

const getUsersAllAssets = async (req, res) => {
    const user = req.user;

    const assets = await Asset.find({ createdBy: user._id });

    res.status(200).json(
        new ApiResponse(200, assets)
    )
}

const deleteUserAssetById = async (req, res) => {
    const user = req.user;
    const assetId = req.query;

    if (assetId) {
        await Asset.findOneAndDelete({ createdBy: user._id, _id: assetId });
    } else {
        throw new ApiError(404, "Please insert a valid id !");
    }

    res.status(200).json(
        new ApiResponse(200)
    )
}

const getAssetById = async (req, res) => {
    const assetId = req.query;

    if (!assetId) {
        throw new ApiError(404, "Please insert a valid id !")
    }

    const asset = await Asset.findById(assetId);

    res.status(200).json(
        new ApiResponse(200, asset)
    )
}

export { createAsset, getUsersAllAssets, deleteUserAssetById, getAssetById };