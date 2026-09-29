import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Headphones } from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Clear previous error
    setError("");

    // Validation
    if (!email.trim() || !password.trim()) {
      setError("Please enter email and password.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Save login session
    localStorage.setItem(
      "helpdesk_logged_in",
      "true"
    );

    // Save user email
    localStorage.setItem(
      "helpdesk_user_email",
      email.trim()
    );

    // Go to dashboard
    navigate("/dashboard", {
      replace: true,
    });
  };

  return (
    <div className="login-page">

      <div className="login-card">

        {/* LOGO */}

        <div className="login-logo">
          <Headphones size={32} />
        </div>

        {/* TITLE */}

        <h1>HelpDesk</h1>

        <p className="login-subtitle">
          Support Ticket Management System
        </p>

        {/* LOGIN FORM */}

        <form onSubmit={handleLogin}>

          {/* EMAIL */}

          <div className="form-group">

            <label>
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
            />

          </div>

          {/* PASSWORD */}

          <div className="form-group">

            <label>
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
            />

          </div>

          {/* ERROR */}

          {error && (
            <div className="form-error">
              {error}
            </div>
          )}

          {/* LOGIN BUTTON */}

          <button
            type="submit"
            className="login-button"
          >
            Sign In
          </button>

        </form>

        {/* DEMO ACCOUNT */}

        <div className="demo-login">

          <strong>
            Demo Account
          </strong>

          <span>
            admin@helpdesk.com
          </span>

          <span>
            Password: Admin@123
          </span>

        </div>

      </div>

    </div>
  );
}

export default Login;