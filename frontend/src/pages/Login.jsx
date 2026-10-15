import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import PasswordField from "../components/PasswordField";
import Button from "../components/Button";
import { loginUser } from "../api/api";
import { validateEmail, validateLoginPassword } from "../utils/validation";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setServerError("");

    const emailErr = validateEmail(email);
    const passwordErr = validateLoginPassword(password);

    setEmailError(emailErr);
    setPasswordError(passwordErr);

    if (emailErr || passwordErr) {
      return;
    }

    setLoading(true);
    try {
      const response = await loginUser({ email: email.trim(), password });
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/home", { replace: true });
    } catch (error) {
      setServerError(error.response?.data?.message || error.message || "Login failed. Please try again.");
    }finally{
    setLoading(false)}
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Welcome Back</h1>
        <p className="login-subtitle">Login to your account</p>

        {serverError && <p className="error-message">{serverError}</p>}

        <form onSubmit={handleLogin} noValidate>

          <InputField label="Email" type="email" name="email"
            value={email} onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("")
            }}
            placeholder="Enter email" error={emailError}/>

          <PasswordField label="Password" name="password" value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError("")}}
            placeholder="Enter password" error={passwordError}/>
            
          <Button text="Login" loading={loading}/>
        </form>

        <p className="signup-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
