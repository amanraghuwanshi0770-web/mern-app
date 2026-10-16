function Button({ text, loading }) {
  return (
    <button type="submit" className="btn-primary" disabled={loading}>
      {loading ? (
        <div>
          <div className="loader"></div>
          Please wait...
        </div>
      ) : (
        text
      )}
    </button>
  );
  
}

export default Button;