import mongoose from 'mongoose';

const AdminData = new mongoose.Schema({
    phoneNumber: {
        type: Number,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

export const AdminDatas = mongoose.model('AdminData', AdminData);
