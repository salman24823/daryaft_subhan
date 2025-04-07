import mongoose from "mongoose";

// Cart Item Schema
const cartItemSchema = new mongoose.Schema({
  color: { type: String },
  size: { type: String, required: true },
  quantity: { type: Number, required: true },
  id: { type: String, default: "N/A" },
  thumbnail: { type: String, required: true },
  salePrice: { type: Number, required: true },
  name: { type: String, default: "N/A" },
  colorCode: { type: String, default: "N/A" },
  logoPrice: { type: String, default: "N/A" },
  logoPosition: {
    x: { type: String, default: "N/A" },
    y: { type: String, default: "N/A" },
  },
  logoSize: { type: String, default: "N/A" },
  selectedLogo: { type: String, default: "N/A" },
  stuffPrice: { type: String, default: "N/A" },
});

// Checkout Schema with Status
const checkOutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  cart: { type: [cartItemSchema], required: true }, // Store cart items as an array of objects

  status: {
    type: String,
    default: "Processing",
    enum: ["Processing", "Delivered"], // Only "Processing" or "Delivered" are valid
  },
  createdAt: { type: Date, default: Date.now },
});

// Ensure that the model is created only once
const ordersModel =
  mongoose.models.ordersModel || mongoose.model("ordersModel", checkOutSchema);

export default ordersModel;
