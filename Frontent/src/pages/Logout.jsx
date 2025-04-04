import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("userToken"); // ✅ Remove user token
    navigate("/login"); // Redirect to login page
  }, [navigate]);

  return null;
};

export default Logout;
