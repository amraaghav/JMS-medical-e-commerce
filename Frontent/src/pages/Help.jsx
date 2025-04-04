import React from "react";

const MedicalHelp = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-100">
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
     
        
        <div className="mt-6">
          <p className="text-gray-700 font-semibold">Need Help?</p>
          <p className="text-gray-500 text-sm">Order related</p>
          <div className="relative mt-2">
            <input 
              type="text" 
              className="w-full border rounded-md py-2 px-4" 
              placeholder="Search..." 
            />
            <button className="absolute right-0 top-0 bottom-0 px-4  text-red-600 font-semibold rounded-r-md">
              MY ORDERS
            </button>
          </div>
        </div>
        
        <div className="mt-6">
          <h2 className="text-gray-700 font-semibold">Additional Topics</h2>
          <ul className="mt-2 shadow-md rounded-md divide-y divide-gray-200 ">
            {[
              "A guide to JMS medical",
              "Prescription Guide",
              "Order Placement",
              "Order Delivery",
              "Payments",
              "Policies",
              "Offers",
            ].map((topic, index) => (
              <li key={index} className="px-4 py-3 hover:bg-gray-100 cursor-pointer">
                {topic}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MedicalHelp;
