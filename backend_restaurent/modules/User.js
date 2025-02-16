const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    phoneNumber: { type: String },
    cart: [
        {
            product: { type: String, required: true },
            quantity: { type: Number, required: true },
            product_id: { type: String, required: true },
            price: { type: Number, required: true },
            diet:{type:String ,required :true},
        }
    ],
    orders: [{
        order_id: { type: String, required: true },
        cart_value: { type: Number, required: true },
        cart: [{
            product: { type: String, required: true },
            quantity: { type: Number, required: true },
            product_id: { type: Number, required: true },
            price: { type: Number, required: true },
            diet:{type:String ,required :true},
        }],
        order_at: { type: Date, default: Date.now },
        delivery_eta: { type: Date },
        status:{type:String,required:true},
        addressname: { type: String }
    }],
    userAdress:[ {
        addressname: { type: String },
        street: { type: String },
        city: { type: String },
        state: { type: String },
        zip: { type: String },
    }],
    tablereservation: [
        {
            type: mongoose.Schema.Types.ObjectId,  
            ref: 'Reservations'  
        }
    ]
});




module.exports = mongoose.model('User', userSchema);