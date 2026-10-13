import { useState } from "react";

function PasswordField({
  label, name, value, onChange, error, placeholder,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="form-group">
      {label && <label>{label}</label>}

      <div className="password-wrapper">
        <input
          type={showPassword ? "text" : "password"}
          name={name} value={value} onChange={onChange} placeholder={placeholder}
          className="form-input"/>

        <button type="button" className="toggle-password-btn"
          onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

   {error && (
        <div className="error-message">
          <span className="error-icon">!</span>
          <span>{error}</span>
        </div>
      )}</div>
  )}
export default PasswordField