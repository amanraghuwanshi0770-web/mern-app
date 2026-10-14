import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import PasswordField from "../components/PasswordField";
import Button from "../components/Button";
import { signupUser } from "../api/api";

import {
  validateName,
  validateEmail,
  validateSignupPassword,
  validateConfirmPassword,
} from "../utils/validation";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setServerError("");

    // mobile keyboard ke extra space / capital letters hatao
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    const nameErr = validateName(cleanName);
    const emailErr = validateEmail(cleanEmail);
    const passwordErr = validateSignupPassword(password);
    const confirmErr = validateConfirmPassword(password, confirmPassword);

    setNameError(nameErr);
    setEmailError(emailErr);
    setPasswordError(passwordErr);
    setConfirmPasswordError(confirmErr);

    if (nameErr || emailErr || passwordErr || confirmErr) {
      return;
    }

    setLoading(true);
    try {
      await signupUser({
        name: cleanName,
        email: cleanEmail,
        password,
      });
      navigate("/login");
    } catch (error) {
      console.log("Signup error:", error);
      setServerError(
        error.response?.data?.message ||
          error.message ||
          "Signup failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Create Account</h1>
        <p>Sign up to get started</p>

        {serverError && <p className="error-message">{serverError}</p>}

        <form onSubmit={handleSignup} noValidate>
          <InputField
            label="Name"
            name="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setNameError("");
            }}
            placeholder="Enter your name"
            error={nameError}
          />

          <InputField
            label="Email"
            type="email"
            name="email"
            autoCapitalize="none"
            autoCorrect="off"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
            }}
            placeholder="Enter email"
            error={emailError}
          />

          <PasswordField
            label="Password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError("");
            }}
            placeholder="Enter password"
            error={passwordError}
          />

          <PasswordField
            label="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setConfirmPasswordError("");
            }}
            placeholder="Confirm password"
            error={confirmPasswordError}
          />

          <Button text="Sign Up" loading={loading} />
        </form>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;