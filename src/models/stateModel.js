import mongoose from "mongoose";

const stateSchema = new mongoose.Schema({
  designingMode: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const State = mongoose.models.State || mongoose.model("State", stateSchema);

export default State;
