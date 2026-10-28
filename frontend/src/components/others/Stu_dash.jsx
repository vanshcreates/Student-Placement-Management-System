import { useContext, useMemo } from "react";
import {
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  FileText,
  Trophy,
  UserRound,
  Users,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AuthContext } from "../../context/AuthContext";

const STATUS_COLORS = ["#52745a", "#103d2c", "#d97706", "#b91c1c"];
const STATUS_GROUPS = [
  { name: "Applied", matches: ["applied"] },
  { name: "Shortlisted", matches: ["shortlist"] },
  { name: "Selected", matches: ["select", "accept", "offer", "placed"] },
  { name: "Rejected", matches: ["reject"] },
];

const isEligibleForDrive = (student, drive) => {
  if (!student) return false;
  const meetsCgpa = Number(student.cgpa || 0) >= Number(drive.minCgpa || 0);
  const graduationYear = student.batch?.match(/\d{4}/g)?.at(-1);
  const eligibleYears = drive.eligibleBatch?.match(/\d{4}/g) || [];
  return meetsCgpa && (!eligibleYears.length || eligibleYears.includes(graduationYear));
};

const isDriveOpen = (drive) =>
  drive.status?.toLowerCase() === "active" &&
  (!drive.deadline || new Date(`${drive.deadline}T23:59:59`) >= new Date());

const Stu_dash = ({ user, onNavigate }) => {
  const { students, drives, applications } = useContext(AuthContext);
  const student = students.find((account) => account.email === user?.email) || user;

  const eligibleDrives = drives.filter(
    (drive) => isDriveOpen(drive) && isEligibleForDrive(student, drive),
  );

  const applicationStatuses = useMemo(
    () =>
      STATUS_GROUPS.map(({ name, matches }) => ({
        name,
        value: applications.filter((application) =>
          matches.some((match) => application.status?.toLowerCase().includes(match)),
        ).length,
      })),
    [applications],
  );

  const placementActivity = useMemo(() => {
    const now = new Date();
    return Array.from({ length: 6 }, (_, index) => {
      const monthDate = new Date(now.getFullYear(), now.getMonth() - 5 + index, 1);
      const month = monthDate.toLocaleString(undefined, { month: "short" });
      const count = applications.filter((application) => {
        const appliedAt = new Date(application.createdAt || application.appliedAt);
        return (
          !Number.isNaN(appliedAt.getTime()) &&
          appliedAt.getMonth() === monthDate.getMonth() &&
          appliedAt.getFullYear() === monthDate.getFullYear()
        );
      }).length;
      return { month, applications: count };
    });
  }, [applications]);

  const packageData = useMemo(() => {
    const ranges = [
      { range: "Under 6 LPA", min: 0, max: 6 },
      { range: "6–10 LPA", min: 6, max: 10 },
      { range: "10–20 LPA", min: 10, max: 20 },
      { range: "20+ LPA", min: 20, max: Infinity },
    ];

    return ranges.map(({ range, min, max }) => ({
      range,
      drives: drives.filter((drive) => {
        const amount = Number(String(drive.ctc || "").match(/\d+(\.\d+)?/)?.[0]);
        return Number.isFinite(amount) && amount >= min && amount < max;
      }).length,
    }));
  }, [drives]);

  const profileFields = [
    student?.name,
    student?.email,
    student?.course,
    student?.batch,
    student?.cgpa !== undefined && student?.cgpa !== null,
    student?.phone,
    student?.rollNo,
    student?.skills?.length,
  ];
  const profileCompletion = Math.round(
    (profileFields.filter(Boolean).length / profileFields.length) * 100,
  );
  const appliedCount = applications.length;
  const shortlistedCount = applications.filter((application) =>
    application.status?.toLowerCase().includes("shortlist"),
  ).length;
  const selectedCount = applications.filter((application) =>
    ["select", "accept", "offer", "placed"].some((status) =>
      application.status?.toLowerCase().includes(status),
    ),
  ).length;
  const hasApplications = applications.length > 0;
  const totalCategorizedApplications = applicationStatuses.reduce(
    (total, status) => total + status.value,
    0,
  );

  const stats = [
    { title: "Eligible Drives", value: eligibleDrives.length, icon: BriefcaseBusiness },
    { title: "Applications", value: appliedCount, icon: FileText },
    { title: "Shortlisted", value: shortlistedCount, icon: Users },
    { title: "Selected", value: selectedCount, icon: Trophy },
  ];

  const progressItems = [
    { label: "Profile completion", value: profileCompletion, icon: CheckCircle2 },
    { label: "Eligible drives applied", value: eligibleDrives.length ? Math.min(100, Math.round((appliedCount / eligibleDrives.length) * 100)) : 0, icon: Clock3 },
  ];
  const recentApplications = [...applications]
    .sort((a, b) => new Date(b.createdAt || b.appliedAt) - new Date(a.createdAt || a.appliedAt))
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-[#f5f6ef] px-6 py-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#103d2c]">Placement Dashboard</h1>
            <p className="mt-1 text-gray-500">Your placement activity and opportunities.</p>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-5 py-3 shadow-sm">
            <UserRound size={20} className="text-[#52745a]" />
            <div>
              <p className="text-xs text-gray-500">Profile completion</p>
              <p className="font-bold text-[#103d2c]">{profileCompletion}%</p>
            </div>
          </div>
        </header>

        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" aria-label="Placement summary">
          {stats.map(({ title, value, icon: Icon }) => (
            <article key={title} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{title}</p>
                  <p className="mt-2 text-3xl font-bold text-[#103d2c]">{value}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e6eee7]">
                  <Icon size={22} className="text-[#52745a]" />
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <article className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
            <h2 className="text-lg font-bold text-[#103d2c]">Placement activity</h2>
            <p className="mb-5 text-sm text-gray-500">Applications submitted in the last six months</p>
            {hasApplications ? (
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={placementActivity}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} />
                    <YAxis allowDecimals={false} axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Line dataKey="applications" type="monotone" stroke="#103d2c" strokeWidth={3} dot={{ r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <EmptyChartMessage message="Your application activity will appear here after you apply to a drive." />
            )}
          </article>

          <article className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#103d2c]">Application status</h2>
            <p className="mb-3 text-sm text-gray-500">Current status of your applications</p>
            {hasApplications && totalCategorizedApplications > 0 ? (
              <>
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={applicationStatuses} cx="50%" cy="50%" innerRadius={55} outerRadius={82} paddingAngle={4} dataKey="value">
                        {applicationStatuses.map((status, index) => (
                          <Cell key={status.name} fill={STATUS_COLORS[index]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2">
                  {applicationStatuses.map((status, index) => (
                    <div key={status.name} className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-gray-600">
                        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: STATUS_COLORS[index] }} />
                        {status.name}
                      </span>
                      <strong className="text-[#103d2c]">{status.value}</strong>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <EmptyChartMessage message="Statuses will appear here when you have applications." />
            )}
          </article>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#103d2c]">Drives by package</h2>
            <p className="mb-5 text-sm text-gray-500">Compensation ranges in the database</p>
            {drives.length ? (
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={packageData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="range" axisLine={false} tickLine={false} />
                    <YAxis allowDecimals={false} axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Bar dataKey="drives" fill="#52745a" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <EmptyChartMessage message="Published placement drives will appear here." />
            )}
          </article>

          <article className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#103d2c]">Placement progress</h2>
            <p className="mb-6 text-sm text-gray-500">Based on your profile and application data</p>
            <div className="space-y-6">
              {progressItems.map(({ label, value, icon: Icon }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e6eee7]">
                    <Icon size={20} className="text-[#52745a]" />
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 flex justify-between gap-4">
                      <span className="text-sm font-semibold">{label}</span>
                      <span className="text-sm font-bold">{value}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100">
                      <div className="h-2 rounded-full bg-[#52745a]" style={{ width: `${value}%` }} />
                    </div>
                  </div>
                </div>
              ))}
              <p className="text-sm text-gray-600">
                {eligibleDrives.length
                  ? `${eligibleDrives.length} open drive${eligibleDrives.length === 1 ? "" : "s"} currently match your profile.`
                  : "No open drives currently match your profile. Check back for new opportunities."}
              </p>
            </div>
          </article>
        </section>

        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-[#103d2c]">Recent applications</h2>
              <p className="text-sm text-gray-500">Your latest submissions from the database</p>
            </div>
            {onNavigate && (
              <button type="button" onClick={() => onNavigate("My Applications")} className="text-sm font-semibold text-[#52745a] hover:underline">
                View all applications
              </button>
            )}
          </div>
          {recentApplications.length ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-gray-500">
                  <tr>
                    <th className="py-3 pr-4">Company</th>
                    <th className="py-3 pr-4">Role</th>
                    <th className="py-3 pr-4">Date</th>
                    <th className="py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentApplications.map((application) => {
                    const drive = drives.find((item) => item.id === application.driveId);
                    return (
                      <tr key={application.id} className="border-t">
                        <td className="py-3 pr-4 font-medium text-[#103d2c]">{drive?.company || "Placement company"}</td>
                        <td className="py-3 pr-4">{drive?.role || "Placement drive"}</td>
                        <td className="py-3 pr-4">
                          {application.createdAt
                            ? new Date(application.createdAt).toLocaleDateString()
                            : "—"}
                        </td>
                        <td className="py-3">{application.status || "Applied"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="rounded-xl bg-[#f5f6ef] p-5 text-sm text-gray-600">
              You haven’t applied to any drives yet.
              {onNavigate && (
                <button type="button" onClick={() => onNavigate("Drives")} className="ml-1 font-semibold text-[#52745a] hover:underline">
                  Browse eligible drives
                </button>
              )}
            </p>
          )}
        </section>
      </div>
    </div>
  );
};

const EmptyChartMessage = ({ message }) => (
  <div className="flex h-[220px] items-center justify-center rounded-xl bg-[#f5f6ef] px-6 text-center text-sm text-gray-500">
    {message}
  </div>
);

export default Stu_dash;
