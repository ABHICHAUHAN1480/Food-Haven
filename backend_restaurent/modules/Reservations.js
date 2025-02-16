const mongoose = require("mongoose");

const reservationsSchema = new mongoose.Schema({
    clerkId: { type: String, required: true },
    fullname: { type: String, required: true },
    bookingId: { type: String ,required:true,unique:true}, 
    tableno: { type: String },
    reservationtime: { type: String, required: true },
    reservationdate: { type: String, required: true },
    reservationstatus: { type: String, required: true },
    email:{type:String,required:true},
    phoneNumber:{type:String,required:true},
    noofpeople:{type:Number,required:true},
    specialrequest:{type:String},
});

module.exports = mongoose.model("Reservations", reservationsSchema);