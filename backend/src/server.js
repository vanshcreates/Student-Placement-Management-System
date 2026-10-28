require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET must be set in backend/.env');
}

app.use(cors({ origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173' }));
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Placement backend is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/student', studentRoutes);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
