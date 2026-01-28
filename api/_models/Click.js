import mongoose from 'mongoose';

const ClickSchema = new mongoose.Schema(
  {
    url: { type: mongoose.Schema.Types.ObjectId, ref: 'Url', index: true },
    ip: { type: String },
    userAgent: { type: String },
    referrer: { type: String },
    country: { type: String }
  },
  { timestamps: true }
);

export default mongoose.models.Click || mongoose.model('Click', ClickSchema);
