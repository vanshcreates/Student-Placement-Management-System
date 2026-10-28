const mongoose = require('mongoose');
const dns = require('node:dns');

const connectDB = async () => {
  const dnsServers = (process.env.DNS_SERVERS || '')
    .split(',')
    .map((server) => server.trim())
    .filter(Boolean);

  if (dnsServers.length > 0) {
    dns.setServers(dnsServers);
  }

  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/student-placement';

  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    throw error;
  }
};

module.exports = connectDB;
