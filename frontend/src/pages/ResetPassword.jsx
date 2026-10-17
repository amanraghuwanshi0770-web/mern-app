import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../api/api";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      navigate("/forgot-password", { replace: true });
      return;
    }

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await resetPassword(email, password);

      navigate("/login", {
        replace: true,
        state: {message: "Password reset successfully. Please login."},
      });
    } catch (error) {
      setError( error.response?.data?.message || "Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Reset Password</h1>
        <p>Enter your new password below.</p>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="password">New Password</label>

            <div className="password-wrapper">
             <input id="password" type={showPassword ?"text" :"password"} 
             value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter new password"/>

             <button type="button" className="toggle-password" 
             onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Hide" : "Show"}
             </button>

         </div>
        </div>

          <div className="form-group">
            <label htmlFor="confirmPassword"> Confirm Password </label>

            <div className="password-wrapper">
            <input id="confirmPassword" type={showConfirmPassword ? "text" : "password"} 
            value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm new password"/>

             <button type="button" className="toggle-password" 
             onClick={()=> setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? "Hide" : "Show"}
             </button>

          </div>
        </div>

          <button type="submit" disabled={loading}> {loading ? "Resetting..." : "Reset Password"} </button>
        </form>

        <p><Link to="/login">Back to Login</Link></p>
      </div>
    </div>
  );
}
export default ResetPassword;