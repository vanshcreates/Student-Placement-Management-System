import { useContext, useState } from "react";
import {
  Building2,
  BriefcaseBusiness,
  CalendarDays,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Plus,
  UserPlus,
} from "lucide-react";
import { AuthContext } from "../../context/AuthContext";

const EMPTY_STUDENT = {
  name: "",
  rollNo: "",
  email: "",
  phone: "",
  branch: "",
  year: "",
  cgpa: "",
  password: "",
};

const EMPTY_COMPANY = {
  name: "",
  email: "",
  phone: "",
  website: "",
  location: "",
  industry: "",
  package: "",
  role: "",
};

const EMPTY_DRIVE = {
  company: "",
  role: "",
  ctc: "",
  type: "Full Time",
  location: "",
  eligibleBatch: "",
  minCgpa: "",
  deadline: "",
  description: "",
};

const AddData = ({ initialTab = "student", onDone }) => {
  const { students, companies, addStudent, addCompany, addDrive } =
    useContext(AuthContext);
  const [activeTab, setActiveTab] = useState(initialTab);
  const [student, setStudent] = useState(EMPTY_STUDENT);
  const [company, setCompany] = useState(EMPTY_COMPANY);
  const [drive, setDrive] = useState(EMPTY_DRIVE);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const handleStudentSubmit = async (event) => {
    event.preventDefault();
    const email = student.email.trim().toLowerCase();
    if (students.some((existing) => existing.email?.toLowerCase() === email)) {
      setMessage("A student account already exists for this email.");
      setMessageType("error");
      return;
    }

    try {
      await addStudent({
        ...student,
        email,
        course: student.branch,
        batch: student.year,
        cgpa: Number(student.cgpa),
      });
      setStudent(EMPTY_STUDENT);
      setMessage("Student added. They can now sign in with this email and password.");
      setMessageType("success");
    } catch (error) {
      setMessage(error.message);
      setMessageType("error");
    }
  };

  const handleCompanySubmit = async (event) => {
    event.preventDefault();
    const email = company.email.trim().toLowerCase();
    if (companies.some((existing) => existing.email?.toLowerCase() === email)) {
      setMessage("A company with this contact email already exists.");
      setMessageType("error");
      return;
    }

    try {
      await addCompany({ ...company, name: company.name.trim(), email });
      setCompany(EMPTY_COMPANY);
      setMessage("Company added and students have been notified.");
      setMessageType("success");
    } catch (error) {
      setMessage(error.message);
      setMessageType("error");
    }
  };

  const handleDriveSubmit = async (event) => {
    event.preventDefault();
    try {
      await addDrive({ ...drive, minCgpa: Number(drive.minCgpa) });
      setDrive(EMPTY_DRIVE);
      setMessage("Placement drive published and students have been notified.");
      setMessageType("success");
    } catch (error) {
      setMessage(error.message);
      setMessageType("error");
    }
  };

  const title =
    activeTab === "student"
      ? "Student"
      : activeTab === "company"
        ? "Company"
        : "Placement Drive";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#103d2c]">Add {title}</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage portal records and opportunities from the administrator account.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2 rounded-2xl border bg-white p-2 shadow-sm">
        {[
          ["student", "Student", UserPlus],
          ["company", "Company", Building2],
          ["drive", "Placement Drive", BriefcaseBusiness],
        ].map(([tab, label, Icon]) => (
          <button
            key={tab}
            type="button"
            onClick={() => {
              setActiveTab(tab);
              setMessage("");
            }}
            className={`flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition ${
              activeTab === tab
                ? "moss-bg-container text-white"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            <Icon size={18} />
            {label}
          </button>
        ))}
      </div>

      {message && (
        <p role="status"         className={`rounded-xl p-4 text-sm ${
          messageType === "error" ? "bg-red-50 text-red-800" : "bg-green-50 text-green-800"
        }`}>
          {message}
        </p>
      )}

      {activeTab === "student" && (
        <form
          onSubmit={handleStudentSubmit}
          className="grid gap-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:grid-cols-2"
        >
          <FormInput label="Full Name" name="name" value={student.name} onChange={(e) => setStudent({ ...student, name: e.target.value })} icon={UserPlus} required />
          <FormInput label="Roll Number" name="rollNo" value={student.rollNo} onChange={(e) => setStudent({ ...student, rollNo: e.target.value })} icon={GraduationCap} required />
          <FormInput label="Email Address" name="email" type="email" value={student.email} onChange={(e) => setStudent({ ...student, email: e.target.value })} icon={Mail} required />
          <FormInput label="Initial Password" name="password" type="password" value={student.password} onChange={(e) => setStudent({ ...student, password: e.target.value })} icon={Mail} required />
          <FormInput label="Phone Number" name="phone" type="tel" value={student.phone} onChange={(e) => setStudent({ ...student, phone: e.target.value })} icon={Phone} required />
          <FormInput label="Branch / Course" name="branch" value={student.branch} onChange={(e) => setStudent({ ...student, branch: e.target.value })} icon={GraduationCap} required />
          <FormInput label="Graduation Batch" name="year" value={student.year} onChange={(e) => setStudent({ ...student, year: e.target.value })} placeholder="e.g. 2026" icon={CalendarDays} required />
          <FormInput label="CGPA" name="cgpa" type="number" min="0" max="10" step="0.01" value={student.cgpa} onChange={(e) => setStudent({ ...student, cgpa: e.target.value })} icon={GraduationCap} required />
          <div className="flex justify-end md:col-span-2">
            <SubmitButton label="Add Student" />
          </div>
        </form>
      )}

      {activeTab === "company" && (
        <form
          onSubmit={handleCompanySubmit}
          className="grid gap-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:grid-cols-2"
        >
          <FormInput label="Company Name" name="name" value={company.name} onChange={(e) => setCompany({ ...company, name: e.target.value })} icon={Building2} required />
          <FormInput label="Industry" name="industry" value={company.industry} onChange={(e) => setCompany({ ...company, industry: e.target.value })} icon={BriefcaseBusiness} required />
          <FormInput label="Contact Email" name="email" type="email" value={company.email} onChange={(e) => setCompany({ ...company, email: e.target.value })} icon={Mail} required />
          <FormInput label="Contact Number" name="phone" type="tel" value={company.phone} onChange={(e) => setCompany({ ...company, phone: e.target.value })} icon={Phone} />
          <FormInput label="Website" name="website" type="url" value={company.website} onChange={(e) => setCompany({ ...company, website: e.target.value })} icon={Building2} />
          <FormInput label="Location" name="location" value={company.location} onChange={(e) => setCompany({ ...company, location: e.target.value })} icon={MapPin} required />
          <FormInput label="Package (LPA)" name="package" value={company.package} onChange={(e) => setCompany({ ...company, package: e.target.value })} icon={BriefcaseBusiness} required />
          <FormInput label="Primary Job Role" name="role" value={company.role} onChange={(e) => setCompany({ ...company, role: e.target.value })} icon={BriefcaseBusiness} required />
          <div className="flex justify-end md:col-span-2">
            <SubmitButton label="Add Company" />
          </div>
        </form>
      )}

      {activeTab === "drive" && (
        <form
          onSubmit={handleDriveSubmit}
          className="grid gap-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:grid-cols-2"
        >
          <label className="text-sm font-semibold text-gray-700">
            Company
            <select
              value={drive.company}
              onChange={(e) => {
                const selectedCompany = companies.find((item) => item.name === e.target.value);
                setDrive({
                  ...drive,
                  company: e.target.value,
                  location: drive.location || selectedCompany?.location || "",
                });
              }}
              required
              className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm"
            >
              <option value="">Select a company</option>
              {companies.map((item) => (
                <option key={item.id} value={item.name}>{item.name}</option>
              ))}
            </select>
          </label>
          <FormInput label="Job Role" name="role" value={drive.role} onChange={(e) => setDrive({ ...drive, role: e.target.value })} icon={BriefcaseBusiness} required />
          <FormInput label="Compensation" name="ctc" value={drive.ctc} placeholder="e.g. 8 - 12 LPA" onChange={(e) => setDrive({ ...drive, ctc: e.target.value })} icon={BriefcaseBusiness} required />
          <FormInput label="Location" name="location" value={drive.location} onChange={(e) => setDrive({ ...drive, location: e.target.value })} icon={MapPin} required />
          <FormInput label="Eligible Graduation Batch" name="eligibleBatch" value={drive.eligibleBatch} placeholder="e.g. 2025 / 2026" onChange={(e) => setDrive({ ...drive, eligibleBatch: e.target.value })} icon={GraduationCap} required />
          <FormInput label="Minimum CGPA" name="minCgpa" type="number" min="0" max="10" step="0.1" value={drive.minCgpa} onChange={(e) => setDrive({ ...drive, minCgpa: e.target.value })} icon={GraduationCap} required />
          <FormInput label="Application Deadline" name="deadline" type="date" min={new Date().toISOString().slice(0, 10)} value={drive.deadline} onChange={(e) => setDrive({ ...drive, deadline: e.target.value })} icon={CalendarDays} required />
          <label className="text-sm font-semibold text-gray-700">
            Employment Type
            <select value={drive.type} onChange={(e) => setDrive({ ...drive, type: e.target.value })} className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm">
              <option>Full Time</option>
              <option>Internship</option>
              <option>Full Time + Intern</option>
            </select>
          </label>
          <label className="text-sm font-semibold text-gray-700 md:col-span-2">
            Drive Details
            <textarea value={drive.description} onChange={(e) => setDrive({ ...drive, description: e.target.value })} rows="3" className="mt-2 w-full rounded-xl border border-gray-200 p-4 text-sm" placeholder="Describe the role and recruitment process" />
          </label>
          <div className="flex justify-end md:col-span-2">
            <SubmitButton label="Publish Drive" />
          </div>
        </form>
      )}

      {onDone && (
        <button type="button" onClick={onDone} className="text-sm font-semibold text-[#52745a]">
          Back to dashboard
        </button>
      )}
    </div>
  );
};

const FormInput = ({ label, name, icon: Icon, ...inputProps }) => (
  <label className="text-sm font-semibold text-gray-700">
    {label}
    <span className="relative mt-2 block">
      <Icon size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        name={name}
        {...inputProps}
        className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-[#52745a]"
      />
    </span>
  </label>
);

const SubmitButton = ({ label }) => (
  <button
    type="submit"
    className="flex items-center gap-2 rounded-xl green-bg-container px-6 py-3 text-sm font-semibold text-white"
  >
    <Plus size={17} />
    {label}
  </button>
);

export default AddData;
