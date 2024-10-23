import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  FaRegChartBar,
  FaTable,
  FaUser,
  FaExclamationTriangle,
  FaTags,
  FaHandsHelping,
} from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { IoPerson, IoDocumentAttach } from "react-icons/io5";
import {
  IoDocumentTextSharp,
  IoPersonOutline,
  IoLogOutSharp,
} from "react-icons/io5";
import { MdDashboard, MdLocalActivity, MdAddAlert } from "react-icons/md";
import { HiAcademicCap } from "react-icons/hi";
import { AiTwotoneLike } from "react-icons/ai";
import { IoShareSocial, IoPrint, IoCloudUploadSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import {
  MdKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

const Sidebar = () => {
  const [openDropdown, setOpenDropdown] = useState(null); // State to manage dropdowns
  const [upDown, setUpDown] = useState(false);

  const { user } = useSelector((state) => state.profile); // Access user from Redux

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index); // Toggle the dropdown for the clicked item
  };

  return (
    <div className="w-1/5 bg-blue-950 text-white flex flex-col h-screen">
      <nav className="flex-1 px-6 py-4 fixed">
        <ul>
          {/* Render for Student */}
          {user.accountType === "Student" && (
            <>
              {/* Student Menu Items */}
              <Link to="dashboard/recentjob">
                <li className="mb-3">
                  <div
                    className="flex items-center cursor-pointer text-gray-400 hover:text-white transition-all"
                    onClick={() => {
                      toggleDropdown(0);
                      setUpDown(!upDown);
                    }}
                  >
                    <MdDashboard className="mr-3 text-xl" />
                    New Openings
                  </div>
                </li>
              </Link>

              <Link to="/dashboard/calender">
                <li className="mb-3">
                  <div
                    className="flex items-center cursor-pointer text-gray-400 hover:text-white"
                    onClick={() => {
                      toggleDropdown(1);
                      setUpDown(!upDown);
                    }}
                  >
                    <SlCalender className="mr-3 text-xl" />
                    Calendar
                  </div>
                </li>
              </Link>

              <Link to="/dashboard/appliedjob">
                <li className="mb-3">
                  <div
                    className="flex items-center cursor-pointer text-gray-400 hover:text-white"
                    onClick={() => toggleDropdown(2)}
                  >
                    <FaTable className="mr-3 text-xl" />
                    Applied Jobs
                  </div>
                </li>
              </Link>

              <li className="mb-3">
                <div
                  className="flex items-center cursor-pointer text-gray-400 hover:text-white"
                  onClick={() => {
                    toggleDropdown(3);
                    setUpDown(!upDown);
                  }}
                >
                  <IoDocumentTextSharp className="mr-3 text-xl" />
                  Build Your Resume
                  {upDown ? (
                    <MdKeyboardArrowDown className="text-2xl transition-all" />
                  ) : (
                    <MdOutlineKeyboardArrowRight className="text-2xl transition-all" />
                  )}
                </div>

                {/* Nested Dropdown for User Pages */}
                {openDropdown === 3 && (
                  <ul className="ml-5 mt-2 gap-2">
                    <li>
                      <a
                        href="/dashboard/personal"
                        className="text-gray-400 hover:text-white"
                      >
                        <div className="flex items-center">
                          {" "}
                          <IoPerson className="mr-3 text-md" />
                          <p>Personal Details</p>
                        </div>
                      </a>
                    </li>

                    <li>
                      <a href="#" className="text-gray-400 hover:text-white">
                        <div className="flex items-center">
                          {" "}
                          <HiAcademicCap className="mr-3 text-md" />
                          <p>Academics Details</p>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/dashboard/skill"
                        className="text-gray-400 hover:text-white"
                      >
                        <div className="flex items-center">
                          {" "}
                          <FaTags className="mr-3 text-md" />
                          <p>Skills</p>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-gray-400 hover:text-white">
                        <div className="flex items-center">
                          {" "}
                          <MdLocalActivity className="mr-3 text-md" />
                          <p>Curricular Activities</p>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-gray-400 hover:text-white">
                        <div className="flex items-center">
                          {" "}
                          <AiTwotoneLike className="mr-3 text-md" />
                          <p>Work Experience</p>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-gray-400 hover:text-white">
                        <div className="flex items-center">
                          {" "}
                          <IoShareSocial className="mr-3 text-md" />
                          <p>Social Links</p>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-gray-400 hover:text-white">
                        <div className="flex items-center">
                          {" "}
                          <MdAddAlert className="mr-3 text-md" />
                          <p>Career Objective</p>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/dashboard/AttachmentForm"
                        className="text-gray-400 hover:text-white"
                      >
                        <div className="flex items-center">
                          {" "}
                          <IoCloudUploadSharp className="mr-3 text-md" />
                          <p>Upload Document </p>
                        </div>
                      </a>
                    </li>

                    <li>
                      <a href="#" className="text-gray-400 hover:text-white">
                        <div className="flex items-center">
                          {" "}
                          <IoPrint className="mr-3 text-md" />
                          <p>Submit/Print Resume</p>
                        </div>
                      </a>
                    </li>
                  </ul>
                )}
              </li>
              <Link to="/dashboard/curracademics">
                <li className="mb-3">
                  <div className="flex items-center cursor-pointer text-gray-400 hover:text-white">
                    <HiAcademicCap className="mr-3 text-xl" />
                    Current Academics
                  </div>
                </li>
              </Link>

              <Link to="/dashboard/uploadresume">
                <li className="mb-3">
                  <div className="flex items-center cursor-pointer text-gray-400 hover:text-white">
                    <FaExclamationTriangle className="mr-3 text-xl" />
                    Upload Additional Resume
                  </div>
                </li>
              </Link>

              <Link to="/dashboard/uploadLetter">
                <li className="mb-3">
                  <div className="flex items-center cursor-pointer text-gray-400 hover:text-white">
                    <IoCloudUploadSharp className="mr-3 text-xl" />
                    Upload Offer Letter
                  </div>
                </li>
              </Link>
            </>
          )}

          {/* Render for Coordinator (TPR) */}
          {user.accountType === "Coordinator" && (
            <>
              <Link to="/dashboard/overview">
                <li className="mb-3">
                  <div className="flex items-center cursor-pointer text-gray-400 hover:text-white">
                    <MdDashboard className="mr-3 text-xl" />
                    Overview
                  </div>
                </li>
              </Link>

              <Link to="/dashboard/companymanagement">
                <li className="mb-3">
                  <div className="flex items-center cursor-pointer text-gray-400 hover:text-white">
                    <FaRegChartBar className="mr-3 text-xl" />
                    Company Management
                  </div>
                </li>
              </Link>

              <Link to="/dashboard/studentmanagement">
                <li className="mb-3">
                  <div className="flex items-center cursor-pointer text-gray-400 hover:text-white">
                    <FaUser className="mr-3 text-xl" />
                    Student Management
                  </div>
                </li>
              </Link>

              <Link to="/dashboard/placementdrives">
                <li className="mb-3">
                  <div className="flex items-center cursor-pointer text-gray-400 hover:text-white">
                    <MdLocalActivity className="mr-3 text-xl" />
                    Placement Drives
                  </div>
                </li>
              </Link>

              <Link to="/dashboard/trainingdevelopment">
                <li className="mb-3">
                  <div className="flex items-center cursor-pointer text-gray-400 hover:text-white">
                    <HiAcademicCap className="mr-3 text-xl" />
                    Training & Development
                  </div>
                </li>
              </Link>

              <Link to="/dashboard/notifications">
                <li className="mb-3">
                  <div className="flex items-center cursor-pointer text-gray-400 hover:text-white">
                    <MdAddAlert className="mr-3 text-xl" />
                    Notifications/Alerts
                  </div>
                </li>
              </Link>

              <Link to="/dashboard/reportsanalytics">
                <li className="mb-3">
                  <div className="flex items-center cursor-pointer text-gray-400 hover:text-white">
                    <FaRegChartBar className="mr-3 text-xl" />
                    Reports & Analytics
                  </div>
                </li>
              </Link>

              <Link to="/dashboard/settings">
                <li className="mb-3">
                  <div className="flex items-center cursor-pointer text-gray-400 hover:text-white">
                    <IoPersonOutline className="mr-3 text-xl" />
                    Settings
                  </div>
                </li>
              </Link>
            </>
          )}

          {/* Common to all users */}
          <Link to="dashboard/profile">
            <li className="mb-3">
              <div className="flex items-center cursor-pointer text-gray-400 hover:text-white">
                <IoPersonOutline className="mr-3 text-xl" />
                Manage Profile
              </div>
            </li>
          </Link>

          <Link to="/dashboard/help">
            <li className="mb-3">
              <div className="flex items-center cursor-pointer text-gray-400 hover:text-white">
                <FaHandsHelping className="mr-3 text-xl" />
                Help Desk
              </div>
            </li>
          </Link>

          <li className="mb-3">
            <div className="flex items-center cursor-pointer text-gray-400 hover:text-white">
              <IoLogOutSharp className="mr-3 text-xl" />
              Sign Out
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
