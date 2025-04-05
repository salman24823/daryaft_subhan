import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  color: { type: String },
  size: { type: String, required: true },
  quantity: { type: Number, required: true },
  id: { type: String, default : "N/A" },
  thumbnail: { type: String, required: true },
  salePrice: { type: Number, required: true },
  name: { type: String, default : "N/A" } ,

  colorCode: { type: String, default : "N/A" } ,
  logoPrice: { type: String, default : "N/A" } ,
  logoPosition: { type: String, default : "N/A" } ,
  logoSize: { type: String, default : "N/A" } ,
  selectedLogo: { type: String, default : "N/A" } ,
  stuffPrice: { type: String, default : "N/A" } ,
});

const checkOutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  cart: { type: [cartItemSchema], required: true }, // Store cart items as an array of objects
  status: { type: String , default: "Processing"}, 
  createdAt: { type: Date, default: Date.now }
});

const ordersModel =
  mongoose.models.ordersModel ||
  mongoose.model("ordersModel", checkOutSchema);

export default ordersModel;
