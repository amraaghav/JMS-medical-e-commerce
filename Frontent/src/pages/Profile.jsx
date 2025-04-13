import React, { useState, useEffect } from "react";
import axios from "axios";
import { Camera, Mail, Phone } from "lucide-react";

const Profile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    phone: "",
  });
  const [editMode, setEditMode] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    setUserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.get("/api/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data);
    } catch (error) {
      console.error("Failed to fetch user data", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("userToken");
      await axios.put(
        "/api/user/profile",
        {
          username: userData.username,
          email: userData.email,
          phone: userData.phone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEditMode(false);
      fetchUserData(); // refresh data
    } catch (error) {
      console.error("Failed to update profile", error);
    }
  };

  return (
    <div className="bg-blue-50 min-h-screen flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 mb-24">
        <h2 className="text-xl font-bold mb-4 text-gray-700">User Profile</h2>

        {/* Profile Image */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={profileImage || "https://via.placeholder.com/100"}
              alt="Profile"
              className="w-24 h-24 rounded-full border-2 border-gray-300"
            />
            <label className="absolute bottom-0 right-0 bg-white p-1 rounded-full cursor-pointer shadow-md">
              <Camera size={18} className="text-gray-600" />
              <input type="file" className="hidden" onChange={handleImageChange} />
            </label>
          </div>
          <h3 className="text-lg font-semibold mt-2">
            {editMode ? (
              <input
                name="username"
                value={userData.username}
                onChange={handleChange}
                className="border px-2 py-1 rounded text-sm"
              />
            ) : (
              userData.username || "Hi there!"
            )}
          </h3>
        </div>

        {/* Contact Details */}
        <div className="mt-4 space-y-4">
          {/* Phone */}
          <div className="flex justify-between items-center border p-3 rounded-md">
            <div className="flex items-center gap-2">
              <Phone size={20} className="text-gray-500" />
              {editMode ? (
                <input
                  name="phone"
                  value={userData.phone}
                  onChange={handleChange}
                  className="border px-2 py-1 rounded text-sm"
                />
              ) : (
                <span>{userData.phone || "+91 XXXXXXXX"}</span>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="flex justify-between items-center border p-3 rounded-md">
            <div className="flex items-center gap-2">
              <Mail size={20} className="text-gray-500" />
              {editMode ? (
                <input
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  className="border px-2 py-1 rounded text-sm"
                />
              ) : (
                <span>{userData.email || "No email found"}</span>
              )}
            </div>
          </div>
        </div>

        {/* Edit / Save Button */}
        <div className="mt-6 flex justify-end">
          {editMode ? (
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={handleSave}
            >
              Save
            </button>
          ) : (
            <button
              className="text-blue-600 font-medium"
              onClick={() => setEditMode(true)}
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
