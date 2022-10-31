import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import router from './routers/index.js'
import nodeCron from 'node-cron';
import cronFunction from './cron/cronCheckAppointment.js'

dotenv.config();
const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL;

const app = express();

//Middleware
app.use(express.json());
app.use('/api', router)

const startApp = async () => {
    //db connection
    await mongoose.connect(DB_URL,
        { useUnifiedTopology: true, useNewUrlParser: true, autoIndex: true }
    )
        .then(() => console.log("Successfully connect to MongoDB."))
        .catch((err) => console.error("Connection error", err));
    try {
        nodeCron.schedule('0 0 * * * *',cronFunction);
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (error) {
        console.log(error);
    }
}

startApp() 