import { app } from "./app.js";
import { connectDB } from "./src/db/index.js";
import dotenv from 'dotenv';

dotenv.config({
    path: './.env'
})

const port = process.env.PORT || 3000;

connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server running at port : ${port}`);
        });
    })
    .catch((error) => {
        console.log("DB connection FAILED : " + error);
    });