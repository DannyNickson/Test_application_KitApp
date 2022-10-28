import mongoose from "mongoose";

const { Schema } = mongoose;

const Appointments = new Schema({
    date: { type: Date, default: Date.now },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    doctor: { type: Schema.Types.ObjectId, ref: 'Doctor' },
    active: { type: Boolean, default: false },
})

export default mongoose.model('Appointments', Appointments)