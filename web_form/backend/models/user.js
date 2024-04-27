import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name : { type: String, required: true },
    age : { type: Number, required: true },
    gender : { type: String, required: true },
    status : { type: String, required: true, default:"50000"},
    stance1 : { type: String, required: true },
    stance2 : { type: String, required: true },
    rate1 : { type: String },
    rate2 : { type: String}
});

export const User = mongoose.model('User', userSchema);