import { useState } from "react";

const  Login=() => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="relative p-8 bg-white shadow-lg rounded-xl w-96">
        
        {/* Form */}
        <h2 className="mb-4 text-2xl font-semibold text-center">Login to your account</h2>
        <form className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-sm text-gray-600">Email</label>
            <input
              type="email"
              placeholder="jmsmedical@gmail.com"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm text-gray-600">Password</label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
              <button
                type="button"
                className="absolute inset-y-0 flex items-center right-3"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Login Now
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-4 text-sm text-center text-gray-600">
          Dont't Have an account? <a href="/Signup" className="font-semibold text-blue-500">Signup</a>
        </p>
      </div>
    </div>
  );
}

export default Login;