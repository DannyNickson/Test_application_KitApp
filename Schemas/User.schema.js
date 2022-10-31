import mongoose from "mongoose";

const { Schema } = mongoose;

const User = new Schema({
    email: { type: String,unique: true},
    reg_token: { type: String },
    photo_avatar: { type: String, default: "photo_uri" },
    phone: { type: String },
    name: { type: String },
    type: { type: String, default: 'user' },
    appointments: [{ type: Schema.Types.ObjectId, ref: "Appointments" }],
})

export default mongoose.model('User', User)