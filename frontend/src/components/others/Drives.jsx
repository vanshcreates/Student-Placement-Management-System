import { useContext, useMemo, useState } from "react";
import { BriefcaseBusiness, CalendarDays, MapPin, Search, X } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";

const isEligibleForDrive = (student, drive) => {
  if (!student) return false;
  const meetsCgpa = Number(student.cgpa || 0) >= Number(drive.minCgpa || 0);
  const graduationYear = student.batch?.match(/\d{4}/g)?.at(-1);
  const eligibleYears = drive.eligibleBatch?.match(/\d{4}/g) || [];
  return meetsCgpa && (!eligibleYears.length || eligibleYears.includes(graduationYear));
};

const Drives = ({ user }) => {
  const { drives, students, applications, applyToDrive } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedDrive, setSelectedDrive] = useState(null);
  const [applyError, setApplyError] = useState("");
  const student = students.find((account) => account.email === user?.email);

  const visibleDrives = useMemo(
    () =>
      drives.filter((drive) => {
        const applied = applications.some(
          (application) =>
            application.driveId === drive.id &&
            application.studentEmail === user?.email,
        );
        const eligible = isEligibleForDrive(student, drive);
        const searchMatches = `${drive.company} ${drive.role}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        return (
          searchMatches &&
          (filter === "All" ||
            (filter === "Eligible" && eligible) ||
            (filter === "Applied" && applied))
        );
      }),
    [applications, drives, filter, searchTerm, student, user?.email],
  );

  const handleApply = async (drive) => {
    if (!user?.email || !isEligibleForDrive(student, drive)) return;
    setApplyError("");
    try {
      await applyToDrive(drive.id);
    } catch (error) {
      setApplyError(error.message);
    }
  };

  return (
    <section className="min-h-screen bg-[#f3f4f0] px-6 py-10 text-gray-800">
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[#0c2a21]">Placement Drives</h1>
          <p className="mt-1 text-gray-600">Explore opportunities posted by the placement cell.</p>
        </div>
        {applyError && (
          <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-800">
            {applyError}
          </p>
        )}

        <div className="flex flex-col gap-3 rounded-xl bg-white p-4 shadow-sm sm:flex-row">
          <label className="relative flex-1">
            <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search companies or roles"
              className="w-full rounded-lg border px-10 py-2.5 text-sm outline-none focus:border-[#52745a]"
            />
          </label>
          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            className="rounded-lg border bg-white px-4 py-2.5 text-sm"
          >
            <option>All</option>
            <option>Eligible</option>
            <option>Applied</option>
          </select>
        </div>

        {visibleDrives.length === 0 ? (
          <p className="rounded-xl border bg-white p-8 text-center text-gray-500">
            No drives match this selection.
          </p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {visibleDrives.map((drive) => {
              const eligible = isEligibleForDrive(student, drive);
              const applied = applications.some(
                (application) =>
                  application.driveId === drive.id &&
                  application.studentEmail === user?.email,
              );
              const expired =
                drive.deadline &&
                new Date(`${drive.deadline}T23:59:59`) < new Date();
              return (
                <article key={drive.id} className="space-y-4 rounded-2xl border bg-white p-5 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-[#52745a]">{drive.company}</p>
                      <h2 className="mt-1 text-lg font-bold text-[#103d2c]">{drive.role}</h2>
                    </div>
                    <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                      {expired ? "Closed" : drive.status || "Active"}
                    </span>
                  </div>
                  <div className="grid gap-2 text-sm text-gray-600 sm:grid-cols-2">
                    <p><strong>CTC:</strong> {drive.ctc || "Not specified"}</p>
                    <p><strong>Type:</strong> {drive.type || "Full Time"}</p>
                    <p className="flex items-center gap-1"><MapPin size={15} />{drive.location || "Not specified"}</p>
                    <p><strong>Minimum CGPA:</strong> {drive.minCgpa ?? "Not specified"}</p>
                    <p><strong>Batch:</strong> {drive.eligibleBatch || "All batches"}</p>
                    <p className="flex items-center gap-1"><CalendarDays size={15} />Deadline: {drive.deadline || "Not specified"}</p>
                  </div>
                  {student && (
                    <p className={`text-xs font-medium ${eligible ? "text-green-700" : "text-amber-700"}`}>
                      {eligible ? "You meet the listed eligibility criteria." : "You do not meet the listed eligibility criteria."}
                    </p>
                  )}
                  <div className="flex items-center justify-between border-t pt-3">
                    <button
                      type="button"
                      onClick={() => setSelectedDrive(drive)}
                      className="text-sm p-2 font-semibold text-[#52745a] hover:underline"
                    >
                      View details
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApply(drive)}
                      disabled={applied || expired || !eligible}
                      className="rounded-lg green-bg-container px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-gray-300"
                    >
                      {applied ? "Applied" : expired ? "Closed" : "Apply"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {selectedDrive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={() => setSelectedDrive(null)}>
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="drive-detail-title"
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-[#52745a]">{selectedDrive.company}</p>
                <h2 id="drive-detail-title" className="text-xl font-bold text-[#103d2c]">{selectedDrive.role}</h2>
              </div>
              <button type="button" aria-label="Close details" onClick={() => setSelectedDrive(null)}>
                <X size={20} />
              </button>
            </div>
            <p className="mt-4 whitespace-pre-wrap text-sm text-gray-600">{selectedDrive.description || "No additional details provided."}</p>
            <p className="mt-4 flex items-center gap-2 text-sm text-gray-600"><BriefcaseBusiness size={16} />{selectedDrive.ctc || "Compensation not specified"}</p>
            <p className="mt-2 flex items-center gap-2 text-sm text-gray-600"><MapPin size={16} />{selectedDrive.location || "Location not specified"}</p>
          </section>
        </div>
      )}
    </section>
  );
};

export default Drives;
