function InputField({
  label,type = "text",
   name, value,
  onChange,
  error,
  placeholder,
}) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input type={type} name={name}
        value={value} onChange={onChange} placeholder={placeholder} className="form-input"/>
          {error && (
          <div className="error-message">
          <span className="error-icon">!</span>
          <span>{error}</span>
        </div>
      )}
    </div>
  )}

export default InputField