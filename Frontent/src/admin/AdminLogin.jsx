import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // ✅ Import useNavigate

const AdminLogin = ({ setAdmin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();  // ✅ Initialize navigation

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("🔹 Sending Login Request:", { email, password });

        try {
            const { data } = await axios.post("http://localhost:5000/api/admin/login", { email, password });

            console.log("✅ Login Success:", data);
            localStorage.setItem("adminToken", data.token);
            if (setAdmin) setAdmin(data.admin);

            navigate("/admin");  // ✅ Redirect to Admin Dashboard
        } catch (err) {
            console.error("❌ Login Error:", err.response?.data || err.message);
            setError(err.response?.data?.message || "Invalid Credentials");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
                <form onSubmit={handleLogin} className="flex flex-col space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-2 border rounded w-full"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-2 border rounded w-full"
                    />
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                        Login
                    </button>
                </form>
                {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            </div>
        </div>
    );
};

export default AdminLogin;
