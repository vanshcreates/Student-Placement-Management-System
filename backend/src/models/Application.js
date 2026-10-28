const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    driveId: { type: mongoose.Schema.Types.ObjectId, ref: 'Drive', required: true },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    studentEmail: { type: String, required: true },
    status: {
      type: String,
      enum: ['Applied', 'Shortlisted', 'Selected', 'Rejected'],
      default: 'Applied',
    },
  },
  { timestamps: true },
);

applicationSchema.index({ driveId: 1, studentId: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);
