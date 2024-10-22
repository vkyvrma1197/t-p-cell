import React, { useState } from 'react';

const StudentDetailsForm = () => {
  const [sameAddress, setSameAddress] = useState(false);
  const handleSameAddressToggle = () => setSameAddress(!sameAddress);
  const inputField = 'block w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring';

  return (
    <div className="p-4  w-full mx-auto bg-gray-100 shadow-md rounded-lg ">
      {/* Header */}
      <h1 className="text-2xl font-semibold mb-4">Welcome Sonam Mishra</h1>

      {/* Add Student Personal Details Section */}
      <div className="mb-6 bg-blue-200 p-4 rounded-md">
        <h2 className="text-xl font-bold">ADD STUDENT PERSONAL DETAILS</h2>
      </div>

      {/* Form Section */}
      <form className="space-y-6">
        {/* Row 1 - Passing Year, Roll No., Admission Year */}
        <div className="flex flex-wrap gap-6">
          <div className="flex-1 min-w-[250px]">
            <label className="block mb-1">Passing Year</label>
            <input type="text" className={inputField} placeholder="2025" />
          </div>
          <div className="flex-1 min-w-[250px]">
            <label className="block mb-1">Roll No.</label>
            <input type="text" className={inputField} placeholder="MCA/10035/23" />
          </div>
          <div className="flex-1 min-w-[250px]">
            <label className="block mb-1">Adm. Year</label>
            <input type="text" className={inputField} placeholder="2023" />
          </div>
        </div>

        {/* Row 2 - Degree, Branch, Semester */}
        <div className="flex flex-wrap gap-6">
          <div className="flex-1 min-w-[250px]">
            <label className="block mb-1">Degree</label>
            <select className={inputField}>
              <option value="MCA">MCA</option>
            </select>
          </div>
          <div className="flex-1 min-w-[250px]">
            <label className="block mb-1">Branch</label>
            <select className={inputField}>
              <option value="Computer Application">Computer Application</option>
            </select>
          </div>
          <div className="flex-1 min-w-[250px]">
            <label className="block mb-1">Semester</label>
            <select className={inputField}>
              <option value="Third">Third</option>
            </select>
          </div>
        </div>

        {/* Personal Details */}
        <h3 className="text-xl font-semibold mt-6">Personal Details</h3>
        <div className="flex flex-wrap gap-6">
          <div className="flex-1 min-w-[250px]">
            <label className="block mb-1">Primary Email ID</label>
            <input type="email" className={inputField} placeholder="smishra301111@gmail.com" />
          </div>
          <div className="flex-1 min-w-[250px]">
            <label className="block mb-1">Institute Email ID</label>
            <input type="email" className={inputField} placeholder="mca10035.23@bitmesra.ac.in" />
          </div>
          <div className="flex-1 min-w-[250px]">
            <label className="block mb-1">Primary Mobile No.</label>
            <input type="text" className={inputField} placeholder="+91 9399217267" />
          </div>
        </div>

        {/* Other fields like Gender, Disability, etc. */}
        <div className="flex flex-wrap gap-6">
          <div className="flex-1 min-w-[250px]">
            <label className="block mb-1">Gender</label>
            <select className={inputField}>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="flex-1 min-w-[250px]">
            <label className="block mb-1">Reservation Category</label>
            <select className={inputField}>
              <option value="GEN">GEN</option>
            </select>
          </div>
          <div className="flex-1 min-w-[250px]">
            <label className="block mb-1">Blood Group</label>
            <input type="text" className={inputField} placeholder="O+ve" />
          </div>
        </div>

        {/* Parent Details */}
        <h3 className="text-xl font-semibold mt-6">Parent Details</h3>
        <div className="flex flex-wrap gap-6">
          <div className="flex-1 min-w-[250px]">
            <label className="block mb-1">Father's Name</label>
            <input type="text" className={inputField} placeholder="Bhaskar Mishra" />
          </div>
          <div className="flex-1 min-w-[250px]">
            <label className="block mb-1">Mother's Name</label>
            <input type="text" className={inputField} placeholder="Rukmani Mishra" />
          </div>
        </div>
        <div className="flex flex-wrap gap-6">
          <div className="flex-1 min-w-[250px]">
            <label className="block mb-1">Father's Mobile No.</label>
            <input type="text" className={inputField} placeholder="9639693456" />
          </div>
          <div className="flex-1 min-w-[250px]">
            <label className="block mb-1">Mother's Mobile No.</label>
            <input type="text" className={inputField} placeholder="8839051600" />
          </div>
        </div>

        {/* Address Details */}
        <h3 className="text-xl font-semibold mt-6">Correspondence Address</h3>
        <div className="flex flex-wrap gap-6">
          <div className="flex-1 min-w-[250px]">
            <label className="block mb-1">Country</label>
            <select className={inputField}>
              <option value="India">India</option>
            </select>
          </div>
          <div className="flex-1 min-w-[250px]">
            <label className="block mb-1">State</label>
            <select className={inputField}>
              <option value="Jharkhand">Jharkhand</option>
            </select>
          </div>
          <div className="flex-1 min-w-[250px]">
            <label className="block mb-1">City/District</label>
            <select className={inputField}>
              <option value="Ranchi">Ranchi</option>
            </select>
          </div>
        </div>

        {/* Permanent Address */}
        <h3 className="text-xl font-semibold mt-6">Permanent Address</h3>
        <div>
          <label>
            <input type="checkbox" onChange={handleSameAddressToggle} />
            Same as Correspondence Address
          </label>
        </div>
        {!sameAddress && (
          <div className="flex flex-wrap gap-6">
            <div className="flex-1 min-w-[250px]">
              <label className="block mb-1">Country</label>
              <select className={inputField}>
                <option value="India">India</option>
              </select>
            </div>
            <div className="flex-1 min-w-[250px]">
              <label className="block mb-1">State</label>
              <select className={inputField}>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
              </select>
            </div>
            <div className="flex-1 min-w-[250px]">
              <label className="block mb-1">City/District</label>
              <input type="text" className={inputField} placeholder="Indore" />
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

// Tailwind CSS utility classes

export default StudentDetailsForm;
