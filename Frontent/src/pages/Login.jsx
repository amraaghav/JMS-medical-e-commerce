import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const SignIn = ({ setAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Check if both email and password are provided
    if (!email || !password) {
      setError("Both email and password are required.");
      return;
    }

    setLoading(true);  // Set loading state
    setError("");  // Clear previous error

    try {
      // Send login request to the server
      const { data } = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // Log the received token (can be removed after testing)
      console.log("Login Success. Token:", data.token);

      // Store the received token in localStorage
     localStorage.setItem("userToken", data.token);

      
      // Set authentication state to true (user is logged in)
      setAuth(true);

      // Clear the form fields after successful login
      setEmail("");
      setPassword("");

      // Redirect to home or dashboard after login
      setTimeout(() => {
        navigate("/"); // You can change this to any page you want the user to go after login
      }, 100); // Slight delay to allow state update
    } catch (err) {
      console.error("Login error:", err);

      // Check if error has a specific message from backend
      const errorMessage = err.response?.data?.message || "Invalid email or password";
      setError(errorMessage); // Show the error message to the user
    } finally {
      setLoading(false); // Stop the loading state after API call
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-200">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Sign In</h2>

        {/* Show error message if there is any */}
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        {/* Email input */}
        <input
          className="border p-2 mb-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password input */}
        <input
          className="border p-2 mb-6 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Submit button */}
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 w-full rounded-md font-semibold transition"
          type="submit"
          disabled={loading} // Disable button while loading
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Link to Sign Up page */}
        <p className="text-sm mt-4 text-center">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-500 underline hover:text-blue-700 transition"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
