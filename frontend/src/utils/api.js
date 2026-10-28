const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const request = async (path, options = {}) => {
  const { body, ...requestOptions } = options;
  const headers = new Headers(requestOptions.headers);
  const token = localStorage.getItem("authToken");

  if (body !== undefined) {
    headers.set("Content-Type", "application/json");
  }
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...requestOptions,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(result.message || `Request failed (${response.status})`);
    error.status = response.status;
    throw error;
  }

  return result;
};

const normalizeRecord = (record) => {
  if (!record || typeof record !== "object") return record;
  const normalized = { ...record, id: record.id || record._id };
  if (record.createdAt && !record.date) {
    const createdAt = new Date(record.createdAt);
    if (!Number.isNaN(createdAt.getTime())) {
      normalized.date = createdAt.toLocaleDateString();
      normalized.time = createdAt.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  }
  if (normalized.driveId && typeof normalized.driveId === "object") {
    normalized.driveId = normalized.driveId._id || normalized.driveId.id;
  }
  return normalized;
};

export const api = {
  login: (email, password) =>
    request("/auth/login", { method: "POST", body: { email, password } }),
  currentUser: async () => {
    const result = await request("/auth/me");
    return { ...result, user: normalizeRecord(result.user) };
  },
  adminStudents: async () => (await request("/admin/students")).map(normalizeRecord),
  createStudent: (student) =>
    request("/auth/students", { method: "POST", body: student }),
  deleteStudent: (studentId) =>
    request(`/admin/students/${encodeURIComponent(studentId)}`, { method: "DELETE" }),
  adminCompanies: async () => (await request("/admin/companies")).map(normalizeRecord),
  studentCompanies: async () => (await request("/student/companies")).map(normalizeRecord),
  createCompany: (company) =>
    request("/admin/companies", { method: "POST", body: company }),
  deleteCompany: (companyId) =>
    request(`/admin/companies/${encodeURIComponent(companyId)}`, { method: "DELETE" }),
  adminDrives: async () => (await request("/admin/drives")).map(normalizeRecord),
  deleteDrive: (driveId) =>
    request(`/admin/drives/${encodeURIComponent(driveId)}`, { method: "DELETE" }),
  adminApplications: async () =>
    (await request("/admin/applications")).map((application) => ({
      ...normalizeRecord(application),
      student: application.studentId,
      drive: application.driveId,
    })),
  updateApplicationStatus: (applicationId, status) =>
    request(`/admin/applications/${encodeURIComponent(applicationId)}/status`, {
      method: "PATCH",
      body: { status },
    }),
  studentDrives: async () => (await request("/student/drives")).map(normalizeRecord),
  createDrive: (drive) =>
    request("/admin/drives", { method: "POST", body: drive }),
  adminAnnouncements: async () =>
    (await request("/admin/announcements")).map(normalizeRecord),
  studentAnnouncements: async () =>
    (await request("/student/announcements")).map(normalizeRecord),
  studentApplications: async () =>
    (await request("/student/applications")).map(normalizeRecord),
  applyToDrive: (driveId) =>
    request(`/student/drives/${encodeURIComponent(driveId)}/apply`, {
      method: "POST",
    }),
};
