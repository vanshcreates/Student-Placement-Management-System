import { useContext, useState } from "react";
import {
  ArrowLeft,
  BriefcaseBusiness,
  Building2,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Plus,
  Search,
  Trash2,
  Users,
} from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import AddData from "./AddData";

const navigation = [
  { id: "Dashboard", icon: LayoutDashboard },
  { id: "Students", icon: Users },
  { id: "Applications", icon: ClipboardList },
  { id: "Companies", icon: Building2 },
  { id: "Placement Drives", icon: BriefcaseBusiness },
];

const AdminPanel = ({ onLogout }) => {
  const [activeView, setActiveView] = useState("Dashboard");
  const {
    students,
    companies,
    drives,
    applications,
    updateApplicationStatus,
    deleteStudent,
    deleteCompany,
    deleteDrive,
  } = useContext(AuthContext);

  const showAddForm = (tab) => setActiveView(`Add ${tab}`);
  const isAddView = activeView.startsWith("Add ") || activeView === "Create Drive";
  const addTab = activeView === "Create Drive" ? "drive" : activeView.slice(4).toLowerCase();

  return (
    <div className="flex min-h-screen bg-[#f5f6ef] text-gray-800">
      <aside className="flex w-64 shrink-0 flex-col green-bg-container text-white">
        <div className="border-b border-white/10 px-6 py-6">
          <h1 className="text-xl font-bold">Placement Portal</h1>
          <p className="mt-1 text-xs text-green-200">Admin Panel</p>
        </div>
        <nav className="flex-1 space-y-1 px-4 py-6">
          {navigation.map(({ id, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveView(id)}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                activeView === id
                  ? "chalk-bg-container text-[#103d2c]"
                  : "text-[var(--pine)] hover:bg-white/10"
              }`}
            >
              <Icon size={18} />
              {id}
            </button>
          ))}
        </nav>
        <div className="border-t border-white/10 p-4">
          <p className="px-3 py-2 text-sm font-semibold">Placement Admin</p>
          <button
            type="button"
            onClick={onLogout}
            className="mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[var(--pine)] hover:bg-white/10"
          >
            <LogOut size={17} />
            Logout
          </button>
        </div>
      </aside>

      <main className="min-w-0 flex-1 overflow-y-auto p-5 lg:p-8">
        <header className="mb-7 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-[#103d2c]">
              {isAddView ? activeView : activeView}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage placement accounts, companies, and recruitment drives.
            </p>
          </div>
          {["Students", "Companies", "Placement Drives"].includes(activeView) && !isAddView && (
            <button
              type="button"
              onClick={() =>
                showAddForm(
                  activeView === "Placement Drives" ? "Drive" :
                    activeView === "Students" ? "Student" : "Company",
                )
              }
              className="flex items-center gap-2 rounded-xl green-bg-container px-5 py-3 text-sm font-semibold text-white"
            >
              <Plus size={17} />
              {activeView === "Placement Drives" ? "Create Drive" : `Add ${activeView === "Students" ? "Student" : "Company"}`}
            </button>
          )}
          {isAddView && (
            <button
              type="button"
              onClick={() => setActiveView(
                addTab === "drive" ? "Placement Drives" :
                  addTab === "student" ? "Students" : "Companies",
              )}
              className="flex items-center gap-2 text-sm font-semibold text-[#52745a]"
            >
              <ArrowLeft size={17} />
              Back to {addTab === "drive" ? "drives" : addTab === "student" ? "students" : "companies"}
            </button>
          )}
        </header>

        {isAddView ? (
          <AddData initialTab={addTab} />
        ) : activeView === "Dashboard" ? (
          <DashboardOverview
            students={students}
            companies={companies}
            drives={drives}
            onNavigate={setActiveView}
          />
        ) : activeView === "Students" ? (
          <StudentsList students={students} onDelete={deleteStudent} />
        ) : activeView === "Applications" ? (
          <ApplicationsList
            applications={applications}
            companies={companies}
            onStatusChange={updateApplicationStatus}
          />
        ) : activeView === "Companies" ? (
          <CompaniesList companies={companies} onDelete={deleteCompany} />
        ) : activeView === "Placement Drives" ? (
          <DrivesList drives={drives} onDelete={deleteDrive} />
        ) : null}
      </main>
    </div>
  );
};

const DashboardOverview = ({ students, companies, drives, onNavigate }) => (
  <div className="space-y-7">
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {[
        ["Students", students.length, Users],
        ["Companies", companies.length, Building2],
        ["Placement Drives", drives.length, BriefcaseBusiness],
      ].map(([label, count, Icon]) => (
        <button
          key={label}
          type="button"
          onClick={() => onNavigate(label)}
          className="flex items-center justify-between rounded-2xl border bg-white p-5 text-left shadow-sm hover:shadow-md"
        >
          <div>
            <p className="text-sm text-gray-500">Total {label}</p>
            <p className="mt-2 text-3xl font-bold text-[#103d2c]">{count}</p>
          </div>
          <Icon size={23} className="text-[#52745a]" />
        </button>
      ))}
    </section>

    <section className="grid gap-4 md:grid-cols-3">
      {[
        ["Add Student", "Create a student login account", "Students"],
        ["Add Company", "List a new placement company", "Companies"],
        ["Create Drive", "Publish a placement opportunity", "Placement Drives"],
      ].map(([title, description, view]) => (
        <button
          key={title}
          type="button"
          onClick={() => onNavigate(title === "Create Drive" ? title : `Add ${title.slice(4)}`)}
          className="rounded-2xl border bg-white p-5 text-left shadow-sm hover:shadow-md"
        >
          <Plus size={20} className="text-[#52745a]" />
          <p className="mt-3 font-semibold text-[#103d2c]">{title}</p>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
          <span className="sr-only">Open {view}</span>
        </button>
      ))}
    </section>

    <DrivesList drives={drives} compact />
  </div>
);

const StudentsList = ({ students, onDelete }) => {
  const [search, setSearch] = useState("");
  const searchTerm = search.trim().toLowerCase();
  const filteredStudents = students.filter((student) =>
    [
      student.name,
      student.email,
      student.rollNo,
      student.course,
      student.batch,
    ].some((value) => String(value || "").toLowerCase().includes(searchTerm)),
  );

  return (
    <section className="space-y-4">
      <label className="relative block max-w-xl">
        <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search students by name, email, roll number, course, or batch"
          className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-[#52745a]"
        />
      </label>
      <DataTable
        title="Registered Students"
        emptyMessage={searchTerm ? "No students match this search." : "No students are registered yet. Add a student to create a login account."}
        headers={["Name", "Email", "Roll Number", "Course", "Batch", "CGPA"]}
        rows={filteredStudents.map((student) => [
          student.name,
          student.email,
          student.rollNo || "—",
          student.course || student.branch || "—",
          student.batch || student.year || "—",
          student.cgpa ?? "—",
        ])}
        records={filteredStudents}
        onDelete={onDelete}
        deletePrompt={(student) =>
          `Delete ${student.name}? Their placement applications will also be deleted.`
        }
      />
    </section>
  );
};

const ApplicationsList = ({ applications, companies, onStatusChange }) => {
  const [search, setSearch] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [error, setError] = useState("");
  const companyNames = [...new Set([
    ...companies.map((company) => company.name),
    ...applications.map((application) => application.drive?.company),
  ].filter(Boolean))].sort((a, b) => a.localeCompare(b));
  const searchTerm = search.trim().toLowerCase();
  const filteredApplications = applications.filter((application) => {
    const student = application.student || {};
    const drive = application.drive || {};
    const matchesSearch = [
      student.name,
      student.email,
      student.rollNo,
      student.course,
      drive.company,
      drive.role,
    ].some((value) => String(value || "").toLowerCase().includes(searchTerm));
    return (
      matchesSearch &&
      (!companyFilter || drive.company === companyFilter) &&
      (!statusFilter || application.status === statusFilter)
    );
  });

  const handleStatusChange = async (applicationId, status) => {
    setError("");
    try {
      await onStatusChange(applicationId, status);
    } catch (statusError) {
      setError(statusError.message);
    }
  };

  return (
    <section className="space-y-4">
      <div>
        <h3 className="text-lg font-bold text-[#103d2c]">Student Applications</h3>
        <p className="mt-1 text-sm text-gray-500">
          Search applicants, filter by hiring company or status, and update application outcomes.
        </p>
      </div>
      <div className="grid gap-3 rounded-2xl border bg-white p-4 shadow-sm md:grid-cols-[minmax(0,1fr)_220px_180px]">
        <label className="relative">
          <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search student name, email, roll no, or role"
            className="w-full rounded-lg border px-10 py-2.5 text-sm outline-none focus:border-[#52745a]"
          />
        </label>
        <select
          aria-label="Filter by company"
          value={companyFilter}
          onChange={(event) => setCompanyFilter(event.target.value)}
          className="rounded-lg border bg-white px-3 py-2.5 text-sm"
        >
          <option value="">All companies</option>
          {companyNames.map((company) => <option key={company} value={company}>{company}</option>)}
        </select>
        <select
          aria-label="Filter by application status"
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className="rounded-lg border bg-white px-3 py-2.5 text-sm"
        >
          <option value="">All statuses</option>
          {["Applied", "Shortlisted", "Selected", "Rejected"].map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>
      {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-800">{error}</p>}
      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <table className="w-full table-fixed text-left text-xs sm:text-sm">
          <thead className="bg-gray-50 text-[10px] uppercase text-gray-500 sm:text-xs">
            <tr>
              {["Student", "Email", "Roll No.", "Company", "Role", "Applied", "Status", "Action"].map((heading) => (
                <th key={heading} className="break-words px-1.5 py-3 font-semibold sm:px-2">{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredApplications.map((application) => (
              <tr key={application.id} className="hover:bg-gray-50">
                <td className="break-words px-1.5 py-3 font-medium text-[#103d2c] sm:px-2">{application.student?.name || "Student"}</td>
                <td className="break-all px-1.5 py-3 sm:px-2">{application.student?.email || "—"}</td>
                <td className="break-words px-1.5 py-3 sm:px-2">{application.student?.rollNo || "—"}</td>
                <td className="break-words px-1.5 py-3 sm:px-2">{application.drive?.company || "—"}</td>
                <td className="break-words px-1.5 py-3 sm:px-2">{application.drive?.role || "—"}</td>
                <td className="break-words px-1.5 py-3 sm:px-2">
                  {application.createdAt ? new Date(application.createdAt).toLocaleDateString() : "—"}
                </td>
                <td className="break-words px-1.5 py-3 sm:px-2">{application.status}</td>
                <td className="break-words px-1.5 py-3 sm:px-2">
                  {application.status === "Shortlisted" ? (
                    <span className="font-semibold text-green-700">Shortlisted</span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleStatusChange(application.id, "Shortlisted")}
                      className="rounded-lg green-bg-container px-1.5 py-2 text-[10px] font-semibold text-white sm:px-2 sm:text-xs"
                    >
                      Mark shortlisted
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {filteredApplications.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-gray-500">
                  {applications.length ? "No applications match these filters." : "No students have applied to a placement drive yet."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="text-sm text-gray-500">Showing {filteredApplications.length} of {applications.length} applications</p>
    </section>
  );
};

const CompaniesList = ({ companies, onDelete }) => (
  <DataTable
    title="Placement Companies"
    emptyMessage="No companies have been added yet."
    headers={["Company", "Industry", "Contact Email", "Role", "Location", "Package"]}
    rows={companies.map((company) => [
      company.name,
      company.industry || "—",
      company.email || "—",
      company.role || "—",
      company.location || "—",
      company.package ? `${company.package} LPA` : "—",
    ])}
    records={companies}
    onDelete={onDelete}
    deletePrompt={(company) =>
      `Delete ${company.name}? Its placement drives and applications for those drives will also be deleted.`
    }
  />
);

const DrivesList = ({ drives, compact = false, onDelete }) => (
  <DataTable
    title={compact ? "Placement Drives" : "Published Placement Drives"}
    emptyMessage="No placement drives published yet. Create a drive to share it with students."
    headers={["Company", "Role", "Compensation", "Location", "Batch", "Deadline", "Status"]}
    rows={drives.map((drive) => [
      drive.company,
      drive.role,
      drive.ctc || "—",
      drive.location || "—",
      drive.eligibleBatch || "—",
      drive.deadline || "—",
      drive.status || "Active",
    ])}
    records={drives}
    onDelete={onDelete}
    deletePrompt={(drive) =>
      `Delete the ${drive.company} - ${drive.role} drive? Applications submitted to this drive will also be deleted.`
    }
  />
);

const DataTable = ({ title, headers, rows, emptyMessage, records, onDelete, deletePrompt }) => {
  const [deleteError, setDeleteError] = useState("");
  const [deletingId, setDeletingId] = useState("");

  const handleDelete = async (record) => {
    if (!window.confirm(deletePrompt(record))) return;
    setDeleteError("");
    setDeletingId(record.id);
    try {
      await onDelete(record.id);
    } catch (error) {
      setDeleteError(error.message);
    } finally {
      setDeletingId("");
    }
  };

  return (
    <section className="overflow-hidden rounded-2xl border bg-white shadow-sm">
      <div className="border-b px-5 py-4">
        <h3 className="font-bold text-[#103d2c]">{title}</h3>
        <p className="mt-1 text-sm text-gray-500">{rows.length} records</p>
      </div>
      {deleteError && (
        <p role="alert" className="m-4 rounded-lg bg-red-50 p-3 text-sm text-red-800">
          {deleteError}
        </p>
      )}
      {rows.length === 0 ? (
        <EmptyState message={emptyMessage} />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                {headers.map((header) => <th key={header} className="px-5 py-3 font-semibold">{header}</th>)}
                {onDelete && <th className="px-5 py-3 font-semibold">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map((row, index) => {
                const record = records[index];
                return (
                  <tr key={record?.id || `${row[0]}-${index}`} className="hover:bg-gray-50">
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="px-5 py-4 text-gray-700">{cell}</td>
                    ))}
                    {onDelete && (
                      <td className="px-5 py-4">
                        <button
                          type="button"
                          onClick={() => handleDelete(record)}
                          disabled={deletingId === record.id}
                          className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-50 disabled:opacity-60"
                          aria-label={`Delete ${record.name || record.company || "record"}`}
                        >
                          <Trash2 size={16} />
                          {deletingId === record.id ? "Deleting..." : "Delete"}
                        </button>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

const EmptyState = ({ message }) => (
  <p className="p-8 text-center text-sm text-gray-500">{message}</p>
);

export default AdminPanel;
