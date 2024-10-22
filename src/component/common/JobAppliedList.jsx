import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAllAppliedJob,
  widthDrawApplication,
} from "../../services/operations/fetchJobPosts";

const JobAppliedList = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    appliedJobData: jobs = [],
    loading,
    error,
  } = useSelector((state) => state.appliedJob);

  useEffect(() => {
    dispatch(getAllAppliedJob(navigate, token));
  }, [dispatch, navigate, token]);

  const handleOnClick = (application_id) => {
    dispatch(widthDrawApplication(navigate, application_id, token));
  };

  console.log("Jobs:", jobs); // Debugging line

  return (
    <div className="flex w-full bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full">
        <h1 className="text-2xl font-bold p-4 text-green-600 mb-4">
          Your Applied Applications
        </h1>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error.message}</p>
        ) : jobs.length === 0 ? (
          <p className="text-gray-500">No applications found.</p>
        ) : (
          <ul className="space-y-4">
            {jobs.map((job) => (
              <li
                key={job.application_id}
                className="bg-gray-50 p-4 border rounded-lg flex justify-between items-center w-full"
              >
                <div>
                  <h2 className="font-semibold text-lg text-gray-800">
                    {job.job_title}
                  </h2>
                  <p className="text-gray-600">{job.company}</p>
                  <p className="text-gray-500 text-sm">
                    Applied on:{" "}
                    {new Date(job.application_post_date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex space-x-3">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                    onClick={() => handleOnClick(job.application_id)}
                  >
                    Withdraw Application
                  </button>
                  <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
                    View Submitted Application
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default JobAppliedList;
