import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import User from './schema/User.schema.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
const DB_URL = process.env.DB_URL;

app.use(express.json());

app.post('/',async (req,res)=>{
    const {email, reg_token,photo_avatar,phone,name} = req.body;
    const user = await User.create({email, reg_token,photo_avatar,phone,name})
    res.status(200).json(user);
})

const startApp = async () => {
    try {
        await mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true })
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (error) {
        console.log(error);
    }
}

startApp()