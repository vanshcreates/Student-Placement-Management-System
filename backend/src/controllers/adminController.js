const Company = require('../models/Company');
const Drive = require('../models/Drive');
const User = require('../models/User');
const Announcement = require('../models/Announcement');
const Application = require('../models/Application');

exports.getStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' }).select('-password');
    return res.status(200).json(students);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch students', error: error.message });
  }
};

exports.getCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    return res.status(200).json(companies);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch companies', error: error.message });
  }
};

exports.getDrives = async (req, res) => {
  try {
    const drives = await Drive.find();
    return res.status(200).json(drives);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch drives', error: error.message });
  }
};

exports.getApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate('studentId', 'name email rollNo course batch cgpa')
      .populate('driveId', 'company role ctc deadline')
      .sort({ createdAt: -1 });
    return res.status(200).json(applications);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch applications', error: error.message });
  }
};

exports.updateApplicationStatus = async (req, res) => {
  const allowedStatuses = ['Applied', 'Shortlisted', 'Selected', 'Rejected'];
  const { status } = req.body;

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ message: `Status must be one of: ${allowedStatuses.join(', ')}` });
  }

  try {
    const application = await Application.findByIdAndUpdate(
      req.params.applicationId,
      { status },
      { new: true, runValidators: true },
    )
      .populate('studentId', 'name email rollNo course batch cgpa')
      .populate('driveId', 'company role ctc deadline');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    return res.status(200).json(application);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid application ID' });
    }
    return res.status(500).json({ message: 'Failed to update application status', error: error.message });
  }
};

exports.deleteStudent = async (req, res) => {
  const session = await User.startSession();

  try {
    let result;
    await session.withTransaction(async () => {
      const student = await User.findOne({
        _id: req.params.studentId,
        role: 'student',
      }).session(session);

      if (!student) {
        result = null;
        return;
      }

      const applications = await Application.deleteMany(
        { studentId: student._id },
        { session },
      );
      await student.deleteOne({ session });
      result = { deletedApplications: applications.deletedCount };
    });

    if (!result) {
      return res.status(404).json({ message: 'Student not found' });
    }

    return res.status(200).json({
      message: 'Student and their applications deleted',
      ...result,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid student ID' });
    }
    return res.status(500).json({ message: 'Failed to delete student', error: error.message });
  } finally {
    await session.endSession();
  }
};

exports.deleteCompany = async (req, res) => {
  const session = await Company.startSession();

  try {
    let result;
    await session.withTransaction(async () => {
      const company = await Company.findById(req.params.companyId).session(session);
      if (!company) {
        result = null;
        return;
      }

      const drives = await Drive.find({ company: company.name })
        .select('_id')
        .session(session);
      const driveIds = drives.map((drive) => drive._id);
      const applications = driveIds.length
        ? await Application.deleteMany({ driveId: { $in: driveIds } }, { session })
        : { deletedCount: 0 };
      await Drive.deleteMany({ company: company.name }, { session });
      await company.deleteOne({ session });
      result = {
        deletedDrives: drives.length,
        deletedApplications: applications.deletedCount,
      };
    });

    if (!result) {
      return res.status(404).json({ message: 'Company not found' });
    }

    return res.status(200).json({
      message: 'Company and related drives and applications deleted',
      ...result,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid company ID' });
    }
    return res.status(500).json({ message: 'Failed to delete company', error: error.message });
  } finally {
    await session.endSession();
  }
};

exports.deleteDrive = async (req, res) => {
  const session = await Drive.startSession();

  try {
    let result;
    await session.withTransaction(async () => {
      const drive = await Drive.findById(req.params.driveId).session(session);
      if (!drive) {
        result = null;
        return;
      }

      const applications = await Application.deleteMany(
        { driveId: drive._id },
        { session },
      );
      await drive.deleteOne({ session });
      result = { deletedApplications: applications.deletedCount };
    });

    if (!result) {
      return res.status(404).json({ message: 'Placement drive not found' });
    }

    return res.status(200).json({
      message: 'Placement drive and related applications deleted',
      ...result,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid placement drive ID' });
    }
    return res.status(500).json({ message: 'Failed to delete placement drive', error: error.message });
  } finally {
    await session.endSession();
  }
};

exports.createCompany = async (req, res) => {
  try {
    const company = await Company.create(req.body);
    await Announcement.create({
      title: `${company.name} joined the placement portal`,
      description: `${company.name} is now listed as a placement company. Check the company cards and upcoming opportunities for details.`,
      category: 'New Company',
      important: true,
    });
    return res.status(201).json(company);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Failed to create company', error: error.message });
  }
};

exports.createDrive = async (req, res) => {
  try {
    const drive = await Drive.create(req.body);
    await Announcement.create({
      title: `${drive.company} placement drive announced`,
      description: `${drive.company} is hiring for ${drive.role}. Apply before ${drive.deadline}.`,
      category: 'Placement Drive',
      important: true,
    });
    return res.status(201).json(drive);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Failed to create drive', error: error.message });
  }
};

exports.getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    return res.status(200).json(announcements);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch announcements', error: error.message });
  }
};
