import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  color: { type: String },
  size: { type: String, required: true },
  quantity: { type: Number, required: true },
  id: { type: String, required: true },
  thumbnail: { type: String, required: true },
  salePrice: { type: Number, required: true },
  name: { type: String, required: true }
});

const checkOutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  cart: { type: [cartItemSchema], required: true }, // Store cart items as an array of objects
  createdAt: { type: Date, default: Date.now }
});

const ordersModel =
  mongoose.models.ordersModel ||
  mongoose.model("ordersModel", checkOutSchema);

export default ordersModel;
