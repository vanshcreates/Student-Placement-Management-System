import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Login = ({ handleLogin, initialError = "" }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(initialError);
  const [submitting, setSubmitting] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await handleLogin(email.trim(), password);
      setPassword("");
    } catch (loginError) {
      setError(loginError.message);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center h-220 w-200 green-bg-container">
        <h1 className="text-5xl font-bold _login">CamCaRR</h1>
        <span className="_login">
          Student Placement Management System for a college Training & Placement
          Cell (TPO).
        </span>
      </div>
      <div className="flex items-center border-2 h-220 w-200 justify-center">
        <form
          onSubmit={submitHandler}
          className="flex flex-col items-center gap-10"
        >
          <h2 className="text-2xl font-bold ">Login Page</h2>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            className="w-100 p-2"
            type="email"
            placeholder="Enter your email"
          />
          <label className="relative block w-100">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 pr-11"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-gray-600 hover:bg-gray-100"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </label>
          {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
          <button disabled={submitting} className="w-60 p-2 green-bg-container text-white disabled:opacity-60">
            {submitting ? "Signing in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
