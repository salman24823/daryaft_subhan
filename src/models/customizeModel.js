import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
  stuffType: { type: String, required: true, trim: true }, // Material type (e.g., "Cotton", "Polyester")
  color: { type: String, required: true, trim: true }, // Color name (e.g., "Red")
  colorCode: { type: String, required: true, trim: true }, // Hex color code (e.g., "#FF0000")
  image: { type: String, required: true, trim: true }, // Image URL linked to stuff and color
  price: { type: Number, required: true }, // Price for this combination
});

const customizerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true }, // Product name (e.g., "T-Shirt")
    variants: { type: [variantSchema], default: [] }, // List of variations
  },
  { timestamps: true } // Auto-add createdAt & updatedAt
);

const CustomizerModel =
  mongoose.models.CustomizerModel ||
  mongoose.model("CustomizerModel", customizerSchema);

export default CustomizerModel;
