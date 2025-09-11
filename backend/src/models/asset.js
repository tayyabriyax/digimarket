import mongoose from "mongoose";

const assetSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ["art", "music", "3dmodel", "ebook"],
        default: "art"
    },
    assetImage: {
        type: Array,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

export const Asset = mongoose.model("Asset", assetSchema);