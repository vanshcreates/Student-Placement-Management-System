const express = require('express');
const {
  getStudents,
  getCompanies,
  getDrives,
  getApplications,
  updateApplicationStatus,
  deleteStudent,
  deleteCompany,
  deleteDrive,
  createCompany,
  createDrive,
  getAnnouncements,
} = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.use(protect, adminOnly);
router.get('/students', getStudents);
router.get('/companies', getCompanies);
router.get('/drives', getDrives);
router.get('/applications', getApplications);
router.get('/announcements', getAnnouncements);
router.patch('/applications/:applicationId/status', updateApplicationStatus);
router.delete('/students/:studentId', deleteStudent);
router.delete('/companies/:companyId', deleteCompany);
router.delete('/drives/:driveId', deleteDrive);
router.post('/companies', createCompany);
router.post('/drives', createDrive);

module.exports = router;
