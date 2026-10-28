const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, default: 'General' },
    important: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Announcement', announcementSchema);
