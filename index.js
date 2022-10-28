import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();
const DB_URL = process.env.DB_URL;
app.use(express.json());


const startApp = async () => {
    try {
        await mongoose.connect(DB_URL)
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (error) {
        console.log(error);
    }
}

startApp()