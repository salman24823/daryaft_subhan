import mongoose from 'mongoose';

const stuffSchema = new mongoose.Schema({

    stuffName: { type: String }
});

const stuffModel = mongoose.models.stuffModel || mongoose.model('stuffModel', stuffSchema);

export default stuffModel;