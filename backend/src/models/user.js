import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: [true, "Username already exixts !"],
        trim: true,
        lowercase: [true, "Username must be in lowercase !"]
    },
    email: {
        type: String,
        rewuired: true,
        unique: [true, "Email already exists !"],
        trim: true,
        lowercase: [true, "Email must be in lowercase !"]
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    fullname: {
        type: String
    },
    about: {
        type: String
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    },
    profilePic: {
        type: String
    }
}, {
    timestamps: true
})

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 8);
        return next;
    } else {
        return next;
    }
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "2h"
        }
    )
}

export const User = mongoose.model("User", userSchema);