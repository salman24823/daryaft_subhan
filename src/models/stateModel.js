// models/ToggleModel.js
import mongoose from 'mongoose';

const ToggleSchema = new mongoose.Schema({
  isSelected: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const ToggleModel = mongoose.models.ToggleModel || mongoose.model('ToggleModel', ToggleSchema);

export default ToggleModel;  