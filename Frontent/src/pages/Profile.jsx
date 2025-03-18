import React, { useState } from "react";
import { Camera, Mail, Phone } from "lucide-react";

const Profile= () => {
  const [profileImage, setProfileImage] = useState(null);

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

  return (
    <div className="bg-blue-50 min-h-screen flex justify-center items-center p-4 ">
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
          <h3 className="text-lg font-semibold mt-2">Hi there!</h3>
        </div>

        {/* Contact Details */}
        <div className="mt-4 space-y-4">
          {/* Mobile Number */}
          <div className="flex justify-between items-center border p-3 rounded-md">
            <div className="flex items-center gap-2">
              <Phone size={20} className="text-gray-500" />
              <span>+91 6202813534</span>
            </div>
            <button className="text-red-500 text-sm font-medium">Edit</button>
          </div>

          {/* Primary Email */}
          <div className="flex justify-between items-center border p-3 rounded-md">
            <div className="flex items-center gap-2">
              <Mail size={20} className="text-gray-500" />
              <span>Vinaysingh85400@gmail</span>
            </div>
            <button className="text-red-500 text-sm font-medium">Edit</button>
          </div>

          {/* Work Email */}
          <div className="flex justify-between items-center border p-3 rounded-md">
            <div className="flex items-center gap-2">
              <Mail size={20} className="text-gray-500" />
              <span>Add email address</span>
            </div>
            <button className="text-red-500 text-sm font-medium">Edit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
