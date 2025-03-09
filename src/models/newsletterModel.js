import mongoose from "mongoose";

const newletterSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
});

const newsletterModel =
  mongoose.models.newsletterModel ||
  mongoose.model("newsletterModel", newletterSchema);

export default newsletterModel;
