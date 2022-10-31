import mongoose from "mongoose";

const { Schema } = mongoose;

const Doctor = new Schema({
    email: { type: String,unique : true, dropDups: true},
    reg_token: { type: String },
    photo_avatar: { type: String, default: "photo_uri" },
    phone: { type: String },
    name: { type: String },
    type: { type: String, default: 'doc' },
    scpec: { type: String, default: 'therapist' },
    free: { type: Boolean, default: true },
    appointments_accepted: [{ type: Schema.Types.ObjectId, ref: "Appointments" }],
})

export default mongoose.model('Doctor',Doctor)