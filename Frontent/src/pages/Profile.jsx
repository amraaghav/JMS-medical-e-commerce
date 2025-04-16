import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    profileImage: "",
  });

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.get("http://localhost:5000/api/user/details", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

    if (response.data.userId !== localStorage.getItem("currentUserId")) {
      // Clear previous profile image if a new user logs in
      localStorage.removeItem("profileImage");
      localStorage.setItem("currentUserId", response.data.userId);
    }
    setUserData({
      ...response.data,
      profileImage: localStorage.getItem("profileImage") || "",
    });
    } catch (error) {
      console.error("Failed to fetch user data", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageData = reader.result;
        localStorage.setItem("profileImage", imageData);
        setUserData((prevState) => ({
          ...prevState,
          profileImage: imageData,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-blue-50 min-h-screen flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 mb-24">
        <h2 className="text-xl font-bold mb-4 text-gray-700">User Profile</h2>

        {/* Profile Image */}
        <div className="flex flex-col items-center">
          <label htmlFor="profileImageUpload">
            <img
              src={userData.profileImage || "https://via.placeholder.com/100"}
              alt="Profile"
              className="w-24 h-24 rounded-full border-2 border-gray-300 cursor-pointer"
            />
          </label>
          <h3 className="text-lg font-semibold mt-2">
            {userData.name || "Hi there!"}
          </h3>
          <input
            type="file"
            id="profileImageUpload"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        {/* Contact Details */}
        <div className="mt-4 space-y-4">
          {/* Phone */}
          <div className="flex items-center gap-2 border p-3 rounded-md">
            <span className="text-gray-500">📞</span>
            <span>{userData.phone || "+91 XXXXXXXX"}</span>
          </div>

          {/* Email */}
          <div className="flex items-center gap-2 border p-3 rounded-md">
            <span className="text-gray-500">✉️</span>
            <span>{userData.email || "No email found"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
