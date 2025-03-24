import mongoose from "mongoose";

const stateSchema = new mongoose.Schema(
  {
    statusState: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const State = mongoose.models.State || mongoose.model("State", stateSchema);

export default State;
