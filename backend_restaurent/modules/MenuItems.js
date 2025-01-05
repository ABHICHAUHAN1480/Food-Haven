const mongoose = require("mongoose");

const menuitemsSchema = new mongoose.Schema({
  id: {  type: String,  required: true,unique: true },
  title: { type: String,required: true },
  price: {   type: Number, required: true  },
  image_url: { type: String },
  servings: {
    number: { type: Number },
    size: { type: Number },
    unit: { type: String}
  },
  diet :{ type: String,required: true },
    rating: { type: Number, required: true },
  category: { type: String, required: true }
});

module.exports = mongoose.model("MenuItems", menuitemsSchema);

