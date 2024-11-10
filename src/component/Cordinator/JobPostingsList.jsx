import React from "react";
import { Edit, DeleteIcon, Eye,Plus } from "lucide-react";

const JobPosting = ({ title, description, postedDate, deadline }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4 w-full">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <div className="text-sm text-gray-500 mb-4">
        <p>Posted: {postedDate}</p>
        <p>Deadline: {deadline}</p>
      </div>
      <div className="flex gap-4">
        <button className="flex items-center border-2 border-gray-300 text-gray-700 p-2 px-4 rounded hover:bg-gray-100 gap-2">
          <Edit size={16} /> Edit
        </button>
        <button className="flex items-center border-2 border-gray-300 text-gray-700 p-2 px-4 rounded hover:bg-gray-100 gap-2">
          <DeleteIcon size={16} /> Delete
        </button>
        <button className="flex items-center border-2 border-gray-300 text-gray-700 p-2 px-4 rounded hover:bg-gray-100 gap-2">
          <Eye size={16} /> View Applicants
        </button>
      </div>
    </div>
  );
};

const JobPostingsList = () => {
  const jobPostings = [
    {
      title: "Software Engineer",
      description:
        "We are seeking a talented Software Engineer to join our team...",
      postedDate: "2023-05-01",
      deadline: "2023-06-01",
    },
    {
      title: "Product Manager",
      description:
        "Join our product team and help shape the future of our products...",
      postedDate: "2023-05-05",
      deadline: "2023-06-15",
    },
    {
      title: "UX Designer",
      description:
        "We're looking for a creative UX Designer to enhance our user experiences...",
      postedDate: "2023-05-10",
      deadline: "2023-06-10",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gray-100 p-6">
      <div className="flex justify-between items-center">
        {" "}
        <h1 className="text-3xl font-bold mb-6 ">TechCorp Job Postings</h1>{" "}
        <button className="bg-blue-950 text-white py-2 px-6 rounded hover:bg-blue-800 flex items-center gap-2">
          <Plus/> Add Opening
        </button>
      </div>
      <div className="flex flex-col items-center">
        {jobPostings.map((job, index) => (
          <JobPosting
            key={index}
            title={job.title}
            description={job.description}
            postedDate={job.postedDate}
            deadline={job.deadline}
          />
        ))}
      </div>
     </div>
  );
};

export default JobPostingsList;
