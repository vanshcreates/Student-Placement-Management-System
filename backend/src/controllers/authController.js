const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (user) => jwt.sign(
  { id: user._id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: '7d' },
);

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email: email.trim().toLowerCase() });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const safeUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      course: user.course,
      cgpa: user.cgpa,
      batch: user.batch,
      skills: user.skills,
      rollNo: user.rollNo,
      phone: user.phone,
    };

    return res.status(200).json({
      message: 'Login successful',
      token: generateToken(user),
      user: safeUser,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.registerStudent = async (req, res) => {
  const { name, email, password, course, cgpa, batch, skills, rollNo, phone } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email and password are required' });
  }

  try {
    const existing = await User.findOne({ email: email.trim().toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: 'Student already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const student = await User.create({
      name,
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      role: 'student',
      course,
      cgpa,
      batch,
      skills: skills || [],
      rollNo,
      phone,
      createdBy: req.user?._id,
    });

    return res.status(201).json({
      message: 'Student created successfully',
      student: {
        _id: student._id,
        name: student.name,
        email: student.email,
        role: student.role,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'A user with this email already exists' });
    }
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getCurrentUser = async (req, res) => {
  return res.status(200).json({ user: req.user });
};
