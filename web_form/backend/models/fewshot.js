import mongoose from "mongoose";


const FewShotSchema = new mongoose.Schema({
    section: { type: String, required: true },
    content1: { type: String, required: true },
    content2: { type: String, required: true },
});


export const FewShot = mongoose.model('FewShot', FewShotSchema);