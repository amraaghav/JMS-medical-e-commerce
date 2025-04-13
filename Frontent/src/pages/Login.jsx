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

    if (!email || !password) {
      setError("Both email and password are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/signin", {
        email,
        password,
      });

      console.log("Login Success. Token:", data.token);
      localStorage.setItem("userToken", data.token);
      setAuth(true);

      // Slight delay to allow state update
      setTimeout(() => {
        navigate("/");
      }, 100);
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-200">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Sign In</h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <input
          className="border p-2 mb-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border p-2 mb-6 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 w-full rounded-md font-semibold transition"
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

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
