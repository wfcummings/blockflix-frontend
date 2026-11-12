import { useState } from "react";
import { Link, useNavigate } from "react-router";

// Load the register page styles 
import "./Register.css";

import { useAuth } from "./AuthContext";

/** A form that allows users to register for a new account */
export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  // controls whether the password is visible
  const [showPassword, setShowPassword] = useState(false);

  const onRegister = async (formData) => {
    const username = formData.get("username");
    const password = formData.get("password");
    try {
      await register({ username, password });
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
  };

 // Display the register page with a cinema background 
  return (
    <div className="register-background">

      {/* Registeration card  */}
      <div className="register-page">
        <h1>Register for an account</h1>
        <form action={onRegister}>
          <label>
            Username
            <input type="text" name="username" />
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

          <button>Register</button>
          {error && <output>{error}</output>}
        </form>
        <Link to="/login">Already have an account? Log in here.</Link>
      </div>
    </div>
  );
}
