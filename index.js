import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import UserRouter from './Routers/UserRouter.js'

dotenv.config();
const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL;

const app = express();

//Middleware
app.use(express.json());
app.use('/api', UserRouter)

const startApp = async () => {
    //db connection
    await mongoose.connect(DB_URL,
        { useUnifiedTopology: true, useNewUrlParser: true, autoIndex: true }
    )
        .then(() => console.log("Successfully connect to MongoDB."))
        .catch((err) => console.error("Connection error", err));
    try {
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (error) {
        console.log(error);
    }
}

startApp() 