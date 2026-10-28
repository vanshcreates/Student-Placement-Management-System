const Drive = require('../models/Drive');
const Application = require('../models/Application');
const Company = require('../models/Company');
const Announcement = require('../models/Announcement');

exports.getEligibleDrives = async (req, res) => {
  try {
    const drives = await Drive.find();
    return res.status(200).json(drives);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to get drives', error: error.message });
  }
};

exports.applyToDrive = async (req, res) => {
  const { driveId } = req.params;

  try {
    const drive = await Drive.findById(driveId);
    if (!drive) {
      return res.status(404).json({ message: 'Placement drive not found' });
    }

    if (drive.status !== 'Active' || (drive.deadline && new Date(`${drive.deadline}T23:59:59`) < new Date())) {
      return res.status(400).json({ message: 'This placement drive is closed' });
    }

    const student = req.user;
    const graduationYear = student.batch?.match(/\d{4}/g)?.at(-1);
    const eligibleYears = drive.eligibleBatch?.match(/\d{4}/g) || [];
    if (
      Number(student.cgpa || 0) < Number(drive.minCgpa || 0) ||
      (eligibleYears.length > 0 && !eligibleYears.includes(graduationYear))
    ) {
      return res.status(403).json({ message: 'You do not meet this drive’s eligibility requirements' });
    }

    const exists = await Application.findOne({ driveId, studentId: student._id });
    if (exists) {
      return res.status(409).json({ message: 'You have already applied to this drive' });
    }

    const application = await Application.create({
      driveId,
      studentId: student._id,
      studentEmail: student.email,
      status: 'Applied',
    });

    return res.status(201).json(application);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid placement drive ID' });
    }
    if (error.code === 11000) {
      return res.status(409).json({ message: 'You have already applied to this drive' });
    }
    return res.status(500).json({ message: 'Application failed', error: error.message });
  }
};

exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ studentId: req.user._id })
      .populate('driveId')
      .sort({ createdAt: -1 });
    return res.status(200).json(applications);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to load applications', error: error.message });
  }
};

exports.getCompanies = async (req, res) => {
  try {
    return res.status(200).json(await Company.find().sort({ createdAt: -1 }));
  } catch (error) {
    return res.status(500).json({ message: 'Failed to load companies', error: error.message });
  }
};

exports.getAnnouncements = async (req, res) => {
  try {
    return res.status(200).json(await Announcement.find().sort({ createdAt: -1 }));
  } catch (error) {
    return res.status(500).json({ message: 'Failed to load announcements', error: error.message });
  }
};
