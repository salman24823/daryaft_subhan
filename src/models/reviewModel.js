import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "ProductModel", // Assuming there's a Product model
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    title: {
      type: String,
    },
    review: {
      type: String,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
  },
  { timestamps: true }
);

const ReviewModel =
  mongoose.models.ReviewModel || mongoose.model("ReviewModel", ReviewSchema);

export default ReviewModel;
