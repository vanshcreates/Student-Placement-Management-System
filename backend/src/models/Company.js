const mongoose = require('mongoose');

const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    phone: { type: String },
    website: { type: String },
    location: { type: String },
    industry: { type: String },
    package: { type: String },
    role: { type: String },
    description: { type: String },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Company', companySchema);
