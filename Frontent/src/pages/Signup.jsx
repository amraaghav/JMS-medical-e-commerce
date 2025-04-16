import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Signup = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault(); // Prevent the default form submission
  
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,        // Use user-entered name from state
          email,       // Use user-entered email from state
          password,    // Use user-entered password from state
        }),
      });
  
      const data = await res.json();
      if (!res.ok) {
        // If the response is not ok, throw an error
        throw new Error(data.message || "Signup failed");
      }
  
      localStorage.setItem("token", data.token);
      console.log("Signup successful", data);
  
      navigate("/login"); // Navigate to the login page
    } catch (err) {
      // Check if the error message indicates the user is already registered
      if (err.message === "User already registered") {
        alert("This email is already registered. Please log in instead.");
      } else {
        alert("Signup failed. Please try again."); // Generic error message
      }
      console.error("Signup error:", err.message);
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-100 to-blue-200">
      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-green-600">Sign Up</h2>

        <input
          className="border p-2 mb-4 w-full rounded-md"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          className="border p-2 mb-4 w-full rounded-md"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="border p-2 mb-6 w-full rounded-md"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          className="bg-green-500 hover:bg-green-600 text-white py-2 w-full rounded-md font-semibold"
          type="submit"
        >
          Register
        </button>

        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 underline hover:text-blue-700">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
