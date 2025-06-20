import mongoose from 'mongoose';

const WebinarSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  speaker: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  registrationUrl: String,
  imageUrl: String,
  published: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Webinar || mongoose.model('Webinar', WebinarSchema);