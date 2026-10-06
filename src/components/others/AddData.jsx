import React, { useState } from "react";
import {
  Users,
  Building2,
  UserPlus,
  Plus,
  Mail,
  Phone,
  GraduationCap,
  MapPin,
  BriefcaseBusiness,
  Globe,
  IndianRupee,
  CalendarDays,
} from "lucide-react";

const AddData = () => {
  const [activeTab, setActiveTab] = useState("student");

  const [student, setStudent] = useState({
    name: "",
    rollNo: "",
    email: "",
    phone: "",
    branch: "",
    year: "",
    cgpa: "",
  });

  const [company, setCompany] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    location: "",
    industry: "",
    package: "",
    role: "",
  });

  const handleStudentChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleCompanyChange = (e) => {
    setCompany({
      ...company,
      [e.target.name]: e.target.value,
    });
  };

  const handleStudentSubmit = (e) => {
    e.preventDefault();

    console.log("Student Added:", student);

    alert("Student added successfully!");

    setStudent({
      name: "",
      rollNo: "",
      email: "",
      phone: "",
      branch: "",
      year: "",
      cgpa: "",
    });
  };

  const handleCompanySubmit = (e) => {
    e.preventDefault();

    console.log("Company Added:", company);

    alert("Company added successfully!");

    setCompany({
      name: "",
      email: "",
      phone: "",
      website: "",
      location: "",
      industry: "",
      package: "",
      role: "",
    });
  };

  return (
    <div className="min-h-screen chalk-bg-container px-5 py-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-7">
          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-xl green-bg-container flex items-center justify-center">
              {activeTab === "student" ? (
                <UserPlus size={21} className="text-white" />
              ) : (
                <Building2 size={21} className="text-white" />
              )}
            </div>

            <div>
              <h1 className="text-3xl font-bold text-[#103d2c]">
                Add {activeTab === "student" ? "Student" : "Company"}
              </h1>

              <p className="text-gray-500 mt-1">
                Add new records to the placement portal
              </p>
            </div>

          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border rounded-2xl p-2 mb-6 shadow-sm">

          <div className="grid grid-cols-2 gap-2">

            <button
              onClick={() => setActiveTab("student")}
              className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition ${
                activeTab === "student"
                  ? "moss-bg-container text-white"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              <Users size={18} />
              Add Student
            </button>

            <button
              onClick={() => setActiveTab("company")}
              className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition ${
                activeTab === "company"
                  ? "moss-bg-container text-white"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              <Building2 size={18} />
              Add Company
            </button>

          </div>

        </div>

        {/* Student Form */}
        {activeTab === "student" && (
          <form
            onSubmit={handleStudentSubmit}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8"
          >

            <div className="flex items-center gap-3 mb-7">

              <div className="w-10 h-10 rounded-xl bg-[#e6eee7] flex items-center justify-center">
                <GraduationCap
                  size={25}
                  className="text-[var(--moss)]"
                />
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#103d2c]">
                  Student Information
                </h2>

                <p className="text-sm text-gray-500">
                  Enter the student's academic and contact details
                </p>
              </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Name */}
              <FormInput
                label="Full Name"
                name="name"
                value={student.name}
                onChange={handleStudentChange}
                placeholder="Enter student name"
                icon={Users}
                required
              />

              {/* Roll No */}
              <FormInput
                label="Roll Number"
                name="rollNo"
                value={student.rollNo}
                onChange={handleStudentChange}
                placeholder="e.g. 2545152"
                icon={GraduationCap}
                required
              />

              {/* Email */}
              <FormInput
                label="Email Address"
                name="email"
                type="email"
                value={student.email}
                onChange={handleStudentChange}
                placeholder="student@college.edu"
                icon={Mail}
                required
              />

              {/* Phone */}
              <FormInput
                label="Phone Number"
                name="phone"
                value={student.phone}
                onChange={handleStudentChange}
                placeholder="Enter phone number"
                icon={Phone}
                required
              />

              {/* Branch */}
              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Branch
                </label>

                <select
                  name="branch"
                  value={student.branch}
                  onChange={handleStudentChange}
                  required
                  className="w-full mt-2 px-4 py-3 border border-gray-200 rounded-xl outline-none text-sm focus:border-[#52745a] bg-white"
                >
                  <option value="">Select branch</option>
                  <option value="CSE">
                    Computer Science & Engineering
                  </option>
                  <option value="ECE">
                    Electronics & Communication
                  </option>
                  <option value="ME">
                    Mechanical Engineering
                  </option>
                  <option value="CE">
                    Civil Engineering
                  </option>
                  <option value="EE">
                    Electrical Engineering
                  </option>
                </select>
              </div>

              {/* Year */}
              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Year
                </label>

                <select
                  name="year"
                  value={student.year}
                  onChange={handleStudentChange}
                  required
                  className="w-full mt-2 px-4 py-3 border border-gray-200 rounded-xl outline-none text-sm focus:border-[#52745a] bg-white"
                >
                  <option value="">Select year</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>

              {/* CGPA */}
              <FormInput
                label="CGPA"
                name="cgpa"
                type="number"
                value={student.cgpa}
                onChange={handleStudentChange}
                placeholder="e.g. 8.5"
                icon={GraduationCap}
                required
              />

            </div>

            <div className="flex justify-end mt-8">

              <button
                type="submit"
                className="flex items-center gap-2 green-bg-container text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-[#0c3023] transition"
              >
                <Plus size={17} />
                Add Student
              </button>

            </div>

          </form>
        )}

        {/* Company Form */}
        {activeTab === "company" && (
          <form
            onSubmit={handleCompanySubmit}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8"
          >

            <div className="flex items-center gap-3 mb-7">

              <div className="w-10 h-10 rounded-xl bg-[#e6eee7] flex items-center justify-center">
                <Building2
                  size={20}
                  className="text-[#52745a]"
                />
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#103d2c]">
                  Company Information
                </h2>

                <p className="text-sm text-gray-500">
                  Enter company details for placement management
                </p>
              </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Company Name */}
              <FormInput
                label="Company Name"
                name="name"
                value={company.name}
                onChange={handleCompanyChange}
                placeholder="e.g. TCS"
                icon={Building2}
                required
              />

              {/* Industry */}
              <FormInput
                label="Industry"
                name="industry"
                value={company.industry}
                onChange={handleCompanyChange}
                placeholder="e.g. Information Technology"
                icon={BriefcaseBusiness}
                required
              />

              {/* Email */}
              <FormInput
                label="Company Email"
                name="email"
                type="email"
                value={company.email}
                onChange={handleCompanyChange}
                placeholder="hr@company.com"
                icon={Mail}
                required
              />

              {/* Phone */}
              <FormInput
                label="Contact Number"
                name="phone"
                value={company.phone}
                onChange={handleCompanyChange}
                placeholder="Enter contact number"
                icon={Phone}
              />

              {/* Website */}
              <FormInput
                label="Website"
                name="website"
                value={company.website}
                onChange={handleCompanyChange}
                placeholder="https://company.com"
                icon={Globe}
              />

              {/* Location */}
              <FormInput
                label="Location"
                name="location"
                value={company.location}
                onChange={handleCompanyChange}
                placeholder="e.g. Bangalore"
                icon={MapPin}
                required
              />

              {/* Package */}
              <FormInput
                label="Expected Package (LPA)"
                name="package"
                type="number"
                value={company.package}
                onChange={handleCompanyChange}
                placeholder="e.g. 6"
                icon={IndianRupee}
                required
              />

              {/* Role */}
              <FormInput
                label="Primary Job Role"
                name="role"
                value={company.role}
                onChange={handleCompanyChange}
                placeholder="e.g. Software Developer"
                icon={BriefcaseBusiness}
                required
              />

            </div>

            <div className="flex justify-end mt-8">

              <button
                type="submit"
                className="flex items-center gap-2 green-bg-container text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-[#0c3023] transition"
              >
                <Plus size={17} />
                Add Company
              </button>

            </div>

          </form>
        )}

      </div>
    </div>
  );
};


/* Reusable Input */

const FormInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  icon: Icon,
  required = false,
}) => {
  return (
    <div>

      <label className="text-sm font-semibold text-gray-700">
        {label}
      </label>

      <div className="relative mt-2">

        <Icon
          size={17}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none text-sm focus:border-[#52745a] focus:ring-1 focus:ring-[#52745a]/20 transition"
        />

      </div>

    </div>
  );
};

export default AddData;