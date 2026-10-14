
function InputField({ label, error, ...props }) {
  return (
    <div className="input-group">
      <label>{label}</label>
      <input {...props} />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
}
export default InputField;