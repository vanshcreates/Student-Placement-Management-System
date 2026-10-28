import { useContext } from "react";
import "./index.css";
import Login from "./components/Auth/Login";
import StudentDashboard from "./components/dashboard/StudentDashboard";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import { AuthContext } from "./context/AuthContext";

const App = () => {
  const { user, isLoading, login, logout, sessionError } = useContext(AuthContext);

  return (
    <>
      {isLoading ? (
        <div className="flex min-h-screen items-center justify-center text-[var(--pine)]">
          Connecting to placement portal...
        </div>
      ) : null}
      {!isLoading && !user && <Login handleLogin={login} initialError={sessionError} />}
      {user?.role === "student" && (
        <StudentDashboard user={user} onLogout={logout} />
      )}
      {user?.role === "admin" && <AdminDashboard onLogout={logout} />}
    </>
  );
};

export default App;
