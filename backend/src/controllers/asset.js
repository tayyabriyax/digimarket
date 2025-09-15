import { Asset } from "../models/asset.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createAsset = async (req, res) => {
    const user = req.user;
    const { title, description, price, category } = req.body;
    const { assetImage } = req.files;

    if ([title, price, category].some(field => field.trim() === "")) {
        return res.status(400).json(
            new ApiError(400, "All fields are required !")
        )
    }

    if (!assetImage) {
        return res.status(400).json(
            new ApiError(400, "Asset Image is required !")
        )
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

    return res.status(201).json(
        new ApiResponse(201, createdAsset, "Asset uploaded Successfully !")
    )
}

const getUsersAllAssets = async (req, res) => {
    const user = req.user;

    const assets = await Asset.find({ createdBy: user._id });

    return res.status(200).json(
        new ApiResponse(200, assets)
    )
}

const deleteUserAssetById = async (req, res) => {
    const user = req.user;
    const assetId = req.query;

    if (assetId) {
        await Asset.findOneAndDelete({ createdBy: user._id, _id: assetId });
    } else {
        return res.status(404).json(
            new ApiError(404, "Asset not found !")
        )
    }

    return res.status(200).json(
        new ApiResponse(200)
    )
}

const getAssetById = async (req, res) => {
    const assetId = req.query;

    if (!assetId) {
        return res.status(404).json(
            new ApiError(404, "Asset not found !")
        )
    }

    const asset = await Asset.findById(assetId);

    return res.status(200).json(
        new ApiResponse(200, asset)
    )
}

const getAssetsByFilters = async (req, res) => {
    const { name, category, price, page = 1 } = req.query;

    const query = {};
    if (name) {
        query.title = new RegExp(`^${name}`, "i");
    }
    if (category) {
        query.category = category;
    }

    let sort = {};
    if (price) {
        sort.price = price === "low_to_high" ? 1 : -1;
    }

    const limit = 4;
    const skip = (page - 1) * limit;

    const assets = await Asset.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit);

    const total = await Asset.countDocuments(query);

    return res.status(200).json(
        new ApiResponse(200, {
            assets,
            total,
            hasMore: skip + assets.length < total,
        })
    );
}

export { createAsset, getUsersAllAssets, deleteUserAssetById, getAssetById, getAssetsByFilters };