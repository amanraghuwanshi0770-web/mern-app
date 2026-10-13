export const validateName = (name) => {
  if (name.trim() === "") {
    return "Name is required";
  }
};

export const validateEmail = (email) => {
  if (email.trim() === "") {
    return "Email is required";
    
  }
  const emailPattern = /\S+@\S+\.\S+/;
  if (!emailPattern.test(email)) {
    return "Please enter a valid email";
  }
  return "";
};

export const validateLoginPassword = (password) => {
  if (password === "") {
    return "Password is required";
  }
  return "";
};

export const validateSignupPassword = (password) => {
  if (password === "") {
    return "Password is required";
  }
  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }
  if (!/[a-zA-Z]/.test(password)) {
    return "Password must have at least 1 alphabet (a-z)";
  }
  if (!/[0-9]/.test(password)) {
    return "Password must have at least 1 number (0-9)";
  }
  if (!/[^a-zA-Z0-9]/.test(password)) {
    return "Password must have at least 1 special character (@, #, $, !)";
  }
  return "";
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (confirmPassword === "") {
    return "Please confirm your password";
  }
  if (password !== confirmPassword) {
    return "Passwords do not match";
  }
  return "";
};
