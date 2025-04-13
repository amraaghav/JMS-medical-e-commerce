import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AddressForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    pincode: "",
    locality: "",
    address: "",
    city: "",
    state: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem("address", JSON.stringify(form));
    const selectedItems = JSON.parse(localStorage.getItem("selectedItems"));
    navigate("/order-details", { state: { selectedItems } });
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-6 border-b pb-2">
        Add Delivery Address
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          className="border p-3 rounded outline-blue-500"
        />
        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          value={form.mobile}
          onChange={handleChange}
          className="border p-3 rounded outline-blue-500"
        />
        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={form.pincode}
          onChange={handleChange}
          className="border p-3 rounded outline-blue-500"
        />
        <input
          type="text"
          name="locality"
          placeholder="Locality"
          value={form.locality}
          onChange={handleChange}
          className="border p-3 rounded outline-blue-500"
        />
      </div>

      <textarea
        name="address"
        placeholder="Address (Area and Street)"
        value={form.address}
        onChange={handleChange}
        rows="3"
        className="w-full border p-3 rounded mt-4 outline-blue-500"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <input
          type="text"
          name="city"
          placeholder="City/District/Town"
          value={form.city}
          onChange={handleChange}
          className="border p-3 rounded outline-blue-500"
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={form.state}
          onChange={handleChange}
          className="border p-3 rounded outline-blue-500"
        />
      </div>

      <button
        onClick={handleSave}
        className="mt-6 w-full bg-orange-500 text-white font-medium py-2 rounded hover:bg-orange-600 transition"
      >
        Save and Deliver Here
      </button>
    </div>
  );
};

export default AddressForm;
