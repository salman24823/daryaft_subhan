import mongoose from "mongoose";

// User Schema for MongoDB
const formSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    }
  },
  { timestamps: true } // Automatically add createdAt and updatedAt
);

// Create a model
const logoModel = mongoose.models.logoModel || mongoose.model("logoModel", formSchema);

export default logoModel;
