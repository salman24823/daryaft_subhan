import mongoose from "mongoose";

const newsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
});

const newsletterModel =
  mongoose.models.newsletterModel ||
  mongoose.model("newsletterModel", newsletterSchema);

export default newsletterModel;
