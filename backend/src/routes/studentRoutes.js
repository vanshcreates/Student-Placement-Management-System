const express = require('express');
const {
  getEligibleDrives,
  applyToDrive,
  getMyApplications,
  getCompanies,
  getAnnouncements,
} = require('../controllers/studentController');
const { protect, studentOnly } = require('../middleware/auth');

const router = express.Router();

router.use(protect, studentOnly);
router.get('/drives', getEligibleDrives);
router.get('/companies', getCompanies);
router.get('/announcements', getAnnouncements);
router.post('/drives/:driveId/apply', applyToDrive);
router.get('/applications', getMyApplications);

module.exports = router;
