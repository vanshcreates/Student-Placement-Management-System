const express = require('express');
const { login, registerStudent, getCurrentUser } = require('../controllers/authController');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.post('/login', login);
router.post('/students', protect, adminOnly, registerStudent);
router.get('/me', protect, getCurrentUser);

module.exports = router;
