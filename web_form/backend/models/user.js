import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name : { type: String, required: true },
    age : { type: Number, required: true },
    gender : { type: String, required: true },
    status : { type: String, required: true, default:"middle"},
    stance1 : { type: String, required: true },
    stance2 : { type: String, required: true },
    crt : { type: String},                              //cong reflect test
    dl : { type: String},                               //digitale lit
    mr : { type: String},                               //motivated reasoning
    type : { type: String},                             //type of treatment
    rate1 : { type: String},                            //initial rate for stance1
    rate2 : { type: String},                            //initial rate for stance2
    rate3 : { type: String},                            //final rate for stance1
    rate4 : { type: String}                             //final rate for stance2
});

export const User = mongoose.model('User', userSchema);