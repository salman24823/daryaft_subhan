import mongoose from "mongoose";

const stateSchema = new mongoose.Schema(
  {
    statusState: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const StateModel = mongoose.models.State || mongoose.model("State", stateSchema);

export default StateModel;
