import { useCallback, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { api } from "../utils/api";

const emptyData = {
  admins: [],
  students: [],
  companies: [],
  drives: [],
  announcements: [],
  applications: [],
};

const loadData = async (role, user) => {
  if (role === "admin") {
    const [students, companies, drives, announcements, applications] = await Promise.all([
      api.adminStudents(),
      api.adminCompanies(),
      api.adminDrives(),
      api.adminAnnouncements(),
      api.adminApplications(),
    ]);
    return { ...emptyData, students, companies, drives, announcements, applications, admins: [user] };
  }

  const [companies, drives, announcements, applications] = await Promise.all([
    api.studentCompanies(),
    api.studentDrives(),
    api.studentAnnouncements(),
    api.studentApplications(),
  ]);
  return {
    ...emptyData,
    students: [user],
    companies,
    drives,
    announcements,
    applications,
  };
};

const AuthProvider = ({ children }) => {
  const [data, setData] = useState(emptyData);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionError, setSessionError] = useState("");

  const refreshData = useCallback(async (currentUser = user) => {
    if (!currentUser) {
      setData(emptyData);
      return;
    }
    setData(await loadData(currentUser.role, currentUser));
  }, [user]);

  useEffect(() => {
    let active = true;
    const restoreSession = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.removeItem("loggedinUser");
        setIsLoading(false);
        return;
      }

      try {
        const result = await api.currentUser();
        if (!active) return;
        const restoredUser = result.user;
        const restoredData = await loadData(restoredUser.role, restoredUser);
        if (!active) return;
        localStorage.setItem("loggedinUser", JSON.stringify(restoredUser));
        setUser(restoredUser);
        setData(restoredData);
      } catch (error) {
        if (error.status === 401 || error.status === 403) {
          localStorage.removeItem("authToken");
          localStorage.removeItem("loggedinUser");
        } else {
          setSessionError(error.message);
        }
      } finally {
        if (active) setIsLoading(false);
      }
    };

    restoreSession();
    return () => {
      active = false;
    };
  }, []);

  const login = async (email, password) => {
    setSessionError("");
    const result = await api.login(email, password);
    localStorage.setItem("authToken", result.token);
    localStorage.setItem("loggedinUser", JSON.stringify(result.user));
    setUser(result.user);
    try {
      setData(await loadData(result.user.role, result.user));
    } catch (error) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("loggedinUser");
      setUser(null);
      setData(emptyData);
      throw error;
    }
    return result.user;
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("loggedinUser");
    setUser(null);
    setData(emptyData);
  };

  const addStudent = async (student) => {
    await api.createStudent(student);
    await refreshData();
  };

  const addCompany = async (company) => {
    await api.createCompany(company);
    await refreshData();
  };

  const addDrive = async (drive) => {
    await api.createDrive(drive);
    await refreshData();
  };

  const updateApplicationStatus = async (applicationId, status) => {
    await api.updateApplicationStatus(applicationId, status);
    await refreshData();
  };

  const applyToDrive = async (driveId) => {
    await api.applyToDrive(driveId);
    await refreshData();
  };

  return (
    <AuthContext.Provider
      value={{
        ...data,
        user,
        isLoading,
        sessionError,
        login,
        logout,
        refreshData,
        addStudent,
        addCompany,
        addDrive,
        updateApplicationStatus,
        applyToDrive,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
