import { useState } from "react";
import { Link, useNavigate } from "react-router";

// Load the register page styles 
import "./Register.css";


import { useAuth } from "./AuthContext";

/** A form that allows users to log into an existing account. */
export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false)

  const onLogin = async (formData) => {
    const username = formData.get("username");
    const password = formData.get("password");
    try {
      await login({ username, password });
      navigate("/movies");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    < div className="register-background">
      <div className="register-page">
        <h1>Welcome back </h1>
      <p>Log in to your account and find your next movie </p>
      <form action={onLogin}>
        <label>
          Username
          <input type="username" name="username" required />
        </label>

        {/*  Password  field with a show/hide button   */}
          <label htmlFor="password">Password</label>
          <div className="password-field">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              required/>
            <button
              type="button"
              className="password-toggle"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((previous) => !previous)}>
              <span aria-hidden="true">👁</span>
            </button>
          </div>


        <button>Login</button>
        {error && <output>{error}</output>}
      </form>
      <Link to="/register">Need an account? Register here.</Link>
      </div>
    </div>
  );
}
