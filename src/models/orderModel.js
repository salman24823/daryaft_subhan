import mongoose from "mongoose";

const checkOutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ordersModel =
  mongoose.models.ordersModel ||
  mongoose.model("ordersModel", checkOutSchema);

export default ordersModel;
