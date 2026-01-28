import mongoose from 'mongoose';

const UrlSchema = new mongoose.Schema(
  {
    shortId: { type: String, unique: true, index: true },
    longUrl: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    title: { type: String },
    tags: [{ type: String }],
    domain: { type: String },
    expiresAt: { type: Date },
    clicks: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.models.Url || mongoose.model('Url', UrlSchema);
