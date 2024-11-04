import axios from "axios";

const API_URL = "http:// 10.0.0.13/api/auth"; // Update this URL if needed for production

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export const register = async ({ name, surname, email, password }) => {
  if (!name || !surname) {
    throw new Error("Name and surname are required.");
  }
  if (!isValidEmail(email)) {
    throw new Error("Invalid email format.");
  }
  if (!isValidPassword(password)) {
    throw new Error(
      "Password must be at least 8 characters, include an uppercase letter, a number, and a special character."
    );
  }

  // Here, you would implement the actual registration logic, e.g., an API call
  return { success: true }; // Placeholder for success response
};

export const loginUser = async (email, password) => {
  if (!email || !password) {
    throw new Error("Email and password are required.");
  }

  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });

    // Assuming the response has token details
    const { token } = response.data;

    localStorage.setItem("token", token);

    // Return the token and user information
    return { token, user }; 
  } catch (error) {
    console.error("Login error: ", error);
    throw new Error(error.response?.data?.message || 'Login failed'); // Adjust based on your backend error response
  }
};
