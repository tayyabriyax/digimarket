import express from "express";
import cors from "cors";

export const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({
    limit: "16kb"
}))

app.use(express.urlencoded({
    limit: "16kb"
}))

app.use(express.static(
    "public"
))

import userRouter from "./src/routes/user.js";
import assetRouter from "./src/routes/asset.js";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/asset", assetRouter);