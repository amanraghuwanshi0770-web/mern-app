function Button({ text, loading }) {
  
  return (
    <button type="submit" className="btn-primary" disabled={loading}>
      {<div class="loader"></div> ? "Please wait..." : text}
    </button>
  );
}
export default Button;