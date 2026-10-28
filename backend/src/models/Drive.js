const mongoose = require('mongoose');

const driveSchema = new mongoose.Schema(
  {
    company: { type: String, required: true },
    role: { type: String, required: true },
    ctc: { type: String },
    type: { type: String },
    location: { type: String },
    eligibleBatch: { type: String },
    minCgpa: { type: Number, default: 0 },
    deadline: { type: String },
    status: { type: String, default: 'Active' },
    description: { type: String },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Drive', driveSchema);
