import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    regularPrice: {
      type: Number,
      required: true,
    },
    salePrice: {
      type: Number,
    },
    stockStatus: {
      type: String,
      enum: ["instock", "outofstock"],
      default: "instock",
    },
    category: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    variations: [
      {
        colorName: String,
        colorCode: String,
        image: String,
      },
    ],
    sizes: {
      type: [String],
      default: [],
    },
    thumbnail: {
      type: String,
    },
    metaTitle: {
      type: String,
    },
    metaDescription: {
      type: String,
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt
);

// Check if the model already exists to avoid redefining it
const ProductModel =
  mongoose.models.ProductModel || mongoose.model("ProductModel", productSchema);

export default ProductModel;