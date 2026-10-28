require('dotenv').config();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const User = require('../models/User');

const seedAdmin = async () => {
  const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
  if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
    throw new Error('Set ADMIN_NAME, ADMIN_EMAIL, and ADMIN_PASSWORD in backend/.env');
  }

  await connectDB();
  const email = ADMIN_EMAIL.trim().toLowerCase();
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    if (existingUser.role === 'admin') {
      if (process.argv.includes('--reset-password')) {
        existingUser.password = await bcrypt.hash(ADMIN_PASSWORD, 12);
        await existingUser.save();
        console.log('Existing admin password updated from ADMIN_PASSWORD.');
        return;
      }

      console.log('An admin account with this email already exists; it was not changed.');
      return;
    }
    throw new Error('This email is already registered as a student.');
  }

  const password = await bcrypt.hash(ADMIN_PASSWORD, 12);
  await User.create({ name: ADMIN_NAME.trim(), email, password, role: 'admin' });
  console.log('Initial admin account created.');
};

seedAdmin()
  .catch((error) => {
    console.error('Admin setup failed:', error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
