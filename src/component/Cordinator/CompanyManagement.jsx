import React from 'react';

function CompanyManagement() {
  return (
    <div className="p-6 bg-white w-full">
      {/* Top Section: Search and Add Company */}
      <div className="flex items-center justify-between mb-8">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search companies..."
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Add Company Button */}
        <button className="ml-4 px-6 py-2 bg-blue-950 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition-all duration-300">
          + Add Company
        </button>
      </div>

      {/* Company Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {['TechCorp', 'FinanceHub', 'EcoSolutions'].map((company, idx) => (
          <div key={idx} className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold">{company}</h2>
            <p className="text-sm text-gray-500">Department</p>
            <div className="text-sm mt-2">
              <span className="font-semibold">Contact:</span> John Doe
            </div>
            <div className="text-sm">
              <span className="font-semibold">Date:</span> 2024-03-01
            </div>
            <div className="text-sm mt-2">
              <span className="font-semibold">Open Positions:</span> 3
            </div>
            <button className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-100">
              Add openings
            </button>
          </div>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="bg-white p-4 rounded-lg shadow mb-8">
        <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="text-gray-500">
              <th>Company</th>
              <th>Action</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td>TechCorp</td>
              <td>New job posting</td>
              <td>2024-03-01</td>
              <td className="text-green-600">Active</td>
            </tr>
            <tr>
              <td>FinanceHub</td>
              <td>Interview scheduled</td>
              <td>2024-02-28</td>
              <td className="text-yellow-600">Pending</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Application Statistics */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Application Statistics</h3>
          {[
            { label: 'Applications Submitted', percentage: 75 },
            { label: 'Shortlisted Candidates', percentage: 50 },
            { label: 'Interviews Completed', percentage: 25 },
          ].map((stat, idx) => (
            <div key={idx} className="mb-4">
              <span className="block text-sm font-medium mb-1">
                {stat.label}
              </span>
              <div className="w-full bg-gray-200 h-4 rounded">
                <div
                  className="bg-blue-950 h-4 rounded"
                  style={{ width: `${stat.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <button className="w-full py-2 bg-gray-100 rounded mb-2 hover:bg-gray-300 transition-all duration-500">
            Send Notifications
          </button>
          <button className="w-full py-2 bg-gray-100 rounded mb-2 hover:bg-gray-300 transition-all duration-500">
            Schedule Campus Visit
          </button>
          <button className="w-full py-2 bg-gray-100 rounded mb-2 hover:bg-gray-300 transition-all duration-500">
            Generate Reports
          </button>
          <button className="w-full py-2 bg-gray-100 rounded hover:bg-gray-300 transition-all duration-500">
            Manage Students
          </button>
        </div>
      </div>
    </div>
  );
}

export default CompanyManagement;
