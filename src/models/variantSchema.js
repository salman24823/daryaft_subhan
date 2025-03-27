import mongoose from 'mongoose';

const variantSchema = new mongoose.Schema({
    title : { type: String, required: true },
    variantImage: { type: String, required: true },
    variantColorName: { type: String, required: true },
    variantColorCode: { type: String, required: true },
    stuffName: [{ type: String }]
});

const Variant = mongoose.models.Variant || mongoose.model('Variant', variantSchema);

export default Variant;