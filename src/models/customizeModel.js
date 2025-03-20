import mongoose from "mongoose";

const customizeSchema = new mongoose.Schema({
  logo: { type: String },
  colorName: { type: String },
  colorCode: { type: String },
  colorImage: { type: String },
});

const customizeModel =
  mongoose.models.customizemodel || // Ensuring lowercase consistency
  mongoose.model("customizemodel", customizeSchema);

export default customizeModel;
