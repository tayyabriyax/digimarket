import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    if ([username, email, password].some(field => field.trim() === "")) {
        return res.status(400).json(
            new ApiError(400, "All fields are required !")
        )
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        return res.status(409).json(
            new ApiError(409, "Username or Email already exist !")
        )
    }

    const newUser = await User.create({
        username,
        email,
        password
    })

    const createdUser = await User.findById(newUser._id);

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User created Successfully !")
    )
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if ([email, password].some(field => field.trim === "")) {
        return res.status(400).json(
            new ApiError(400, "Email and Password is required !")
        )
    }

    const existedUser = await User.findOne({ email }).select("+password");

    if (!existedUser) {
        return res.status(404).json(
            new ApiError(404, "User not found !")
        )
    }

    const isPasswordCorrect = await existedUser.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
        return res.status(403).json(
            new ApiError(403, "Invalid Password !")
        )
    }

    const accessToken = await existedUser.generateAccessToken();

    return res.status(200).json(
        new ApiResponse(200, accessToken)
    )
}

const getUserProfile = async (req, res) => {
    const user = req.user;

    const existedUser = await User.findById(user._id);

    if (!existedUser) {
        return res.status(404).json(
            new ApiError(404, "User not found !")
        )
    }

    return res.status(200).json(
        new ApiResponse(200, existedUser)
    )
}

const updateUser = async (req, res) => {
    const user = req.user;
    const { fullname, about } = req.body;
    const profilePic = req.file;

    const profilePicUrl = await uploadOnCloudinary(profilePic.path);

    await User.findOneAndUpdate(
        {
            _id: user._id
        },
        {
            fullname,
            about,
            profilePic: profilePicUrl
        });

    return res.status(200).json(
        new ApiResponse(200)
    )
}

const getAllUsers = async (req, res) => {
    const users = await User.find();

    return res.status(200).json(
        new ApiResponse(200, users)
    )
}

const deleteUser = async (req, res) => {
    const { userId } = req.query;

    if (userId) {
        await User.findByIdAndDelete(userId);
    } else {
        return res.status(404).json(
            new ApiError(404, "User not found !")
        )
    }

    return res.status(200).json(
        new ApiResponse(200, "User deleted !")
    )
}

export { registerUser, loginUser, getUserProfile, updateUser, getAllUsers, deleteUser }