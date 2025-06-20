import mongoose from 'mongoose';

const CaseStudySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  clientName: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    required: true,
  },
  imageUrl: String,
  published: {
    type: Boolean,
    default: false,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
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

export default mongoose.models.CaseStudy || mongoose.model('CaseStudy', CaseStudySchema);