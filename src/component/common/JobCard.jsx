import { ClipboardCheck } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ApllyJob } from "../../services/operations/fetchJobPosts";

const JobCard = ({ job }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {token} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);

  const handleApplyNowClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitApplication = () => {
    dispatch(ApllyJob(navigate, job.job_id,token));
    handleCloseModal(); // Close modal after submission
  };

  return (
    <>
      <div className="flex justify-center items-center bg-gray-300 w-full">
        <div className="w-full bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {job.job_title}
          </h2>
          <p className="text-lg text-blue-600 mb-2">{job.company_name}</p>
          <p className="text-gray-600 mb-1">Location: {job.location}</p>
          <p className="text-gray-600 mb-3">Salary: {job.salary} P/M</p>
          <p className="text-gray-700 mb-4">{job.job_description}</p>
          <button
            className="w-max p-5 bg-blue-950 text-white py-2 rounded hover:bg-blue-900 transition duration-300"
            onClick={handleApplyNowClick}
          >
            Apply Now
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 w-full">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[50%]">
            <h2 className="text-2xl font-bold text-white bg-blue-950 p-4 rounded-t-xl mb-4">
              Verify Details
            </h2>

            {/* Job Details Card */}
            <div className="bg-white p-4 rounded-lg shadow-xl mb-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Job Information
              </h3>
              <p className="text-gray-600">Title: {job.job_title}</p>
              <p className="text-gray-600">Industry: {job.industry}</p>
              <p className="text-gray-600">Company: {job.company_name}</p>
              <p className="text-gray-600">Location: {job.location}</p>
              <p className="text-gray-600">Salary: {job.salary} P/M</p>
              <p className="text-gray-600">
                Description: {job.job_description}
              </p>
            </div>

            {/* Eligibility Card */}
            <div className="bg-white p-4 rounded-lg shadow-xl mb-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Eligibility
              </h3>
              <p className="text-gray-600">
                Experience: {job.eligibility.experience}
              </p>
              <p className="text-gray-600">Degree: {job.eligibility.degree}</p>
              <p className="text-gray-600">
                Skills: {job.eligibility.skills.join(", ")}
              </p>
            </div>

            {/* Application Info Card */}
            <div className="bg-white p-4 rounded-lg shadow-xl mb-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Application Information
              </h3>
              <p className="text-gray-600">
                Application Deadline: {new Date(job.application_deadline).toLocaleDateString()}
              </p>
              <p className="text-gray-600">
                Post Date: {new Date(job.application_post_date).toLocaleDateString()}
              </p>
              <p className="text-gray-600">TPR Coordinator: {job.name}</p>
              <p className="text-gray-600">Department: {job.department}</p>
            </div>

            {/* Contact Information Card */}
            <div className="bg-white p-4 rounded-lg shadow-xl mb-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Contact Information
              </h3>
              <p className="text-gray-600">Email: {job.email}</p>
              <p className="text-gray-600">
                Company Website:
                <a
                  href={job.company_website}
                  className="text-blue-600 hover:underline cursor-pointer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {job.company_website}
                </a>
              </p>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition duration-300"
                onClick={handleCloseModal}
              >
                Close
              </button>
              <button
                className="px-4 py-2 bg-blue-950 text-white rounded hover:bg-blue-900 transition duration-300"
                onClick={handleSubmitApplication}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JobCard;
