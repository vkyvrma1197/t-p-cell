import React, { useState } from "react";
import { set } from "react-hook-form";
import {
  FaRegChartBar,
  FaTable,
  FaUser,
  FaExclamationTriangle,
  FaTags,
  FaHandsHelping 
} from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { IoPerson, IoDocumentAttach } from "react-icons/io5";
import { IoDocumentTextSharp,IoPersonOutline,IoLogOutSharp   } from "react-icons/io5";
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
    const toggleDropdown = (index) => {
      setOpenDropdown(openDropdown === index ? null : index); // Toggle the dropdown for the clicked item
    };
  
    return (
      <div className=" w-1/5 bg-blue-950 text-white flex flex-col h-screen">
        <nav className="flex-1 px-6 py-4 fixed ">
          <ul>
            {/* Dashboard */}
           <Link to="dashboard/recentjob">
           <li className="mb-3">
              <div
                className="flex items-center  cursor-pointer text-gray-400 hover:text-white transition-all"
                onClick={() => {
                  toggleDropdown(0);
                  setUpDown(!upDown);
                }} // Toggle dropdown on click
              >
                <MdDashboard className="mr-3 text-xl" />
                New Openings
              </div>
              {/* Nested Dropdown for Dashboard */}
            </li>
           </Link>
  
            {/* Charts */}
            <Link to="/dashboard/calender">
            <li className="mb-3">
              <div
                className="flex items-center cursor-pointer text-gray-400 hover:text-white"
                onClick={() => {
                  toggleDropdown(1);
                  setUpDown(!upDown);
                }} // Toggle dropdown on click
              >
                <SlCalender className="mr-3 text-xl" />
                Calender
              </div>
            </li>
            </Link>
  
            {/* Tables */}
            <Link to={'/dashboard/appliedjob'}>
            <li className="mb-3">
              <div
                className="flex items-center cursor-pointer text-gray-400 hover:text-white"
                onClick={() => toggleDropdown(2)} // Toggle dropdown on click
              >
                <FaTable className="mr-3 text-xl" />
                Applied Jobs
              </div>
            </li>
            </Link>
            {/* User Pages */}
            <li className="mb-3">
              <div
                className="flex items-center cursor-pointer text-gray-400 hover:text-white"
                onClick={() => {
                  toggleDropdown(3);
                  setUpDown(!upDown);
                }} // Toggle dropdown on click
              >
                <IoDocumentTextSharp className="mr-3 text-xl" />
                Build Your Resume
                {upDown ? (
                  <MdKeyboardArrowDown className=" text-2xl transition-all " />
                ) : (
                  <MdOutlineKeyboardArrowRight className=" text-2xl transition-all" />
                )}
              </div>
              {/* Nested Dropdown for User Pages */}
              {openDropdown === 3 && (
                <ul className="ml-5 mt-2 gap-2">
                  <li>
                    <a href="/dashboard/personal" className="text-gray-400 hover:text-white">
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
                    <a href="/dashboard/skill" className="text-gray-400 hover:text-white">
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
                    <a href="/dashboard/AttachmentForm" className="text-gray-400 hover:text-white">
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
  
            {/* Error Pages */}
            <Link to="/dashboard/curracademics">
            <li className="mb-3">
              <div
                className="flex items-center cursor-pointer text-gray-400 hover:text-white"
                onClick={() => toggleDropdown(4)} // Toggle dropdown on click
              >
                <HiAcademicCap className="mr-3 text-xl" />
                Current Academics
              </div>
            </li>
            </Link>
            <Link to="/dashboard/uploadresume">
            <li className="mb-3">
              <div
                className="flex items-center cursor-pointer text-gray-400 hover:text-white"
                onClick={() => toggleDropdown(4)} // Toggle dropdown on click
              >
                <FaExclamationTriangle className="mr-3 text-xl" />
                Upload Additional Resume
              </div>
            </li>
            </Link>
            <Link to="/dashboard/uploadLetter">
            <li className="mb-3">
              <div
                className="flex items-center cursor-pointer text-gray-400 hover:text-white"
                onClick={() => toggleDropdown(4)} // Toggle dropdown on click
              >
                <IoCloudUploadSharp className="mr-3 text-xl" />
                Upload Offer Letter
              </div>
            </li>
            </Link>
            <Link to="dashboard/profile"> 
            <li className="mb-3">
              <div
                className="flex items-center cursor-pointer text-gray-400 hover:text-white"
                onClick={() => toggleDropdown(4)} // Toggle dropdown on click
              >
                <IoPersonOutline  className="mr-3 text-xl" />
                Manage Profile
              </div>
            </li>
            </Link>
            <Link to="/dashboard/help">
            <li className="mb-3">
              <div
                className="flex items-center cursor-pointer text-gray-400 hover:text-white"
                onClick={() => toggleDropdown(4)} // Toggle dropdown on click
              >
                <FaHandsHelping  className="mr-3 text-xl" />
                Help Desk
              </div>
            </li>
            </Link>
            <li className="mb-3">
              <div
                className="flex items-center cursor-pointer text-gray-400 hover:text-white"
                  // Toggle dropdown on click
              >
                <IoLogOutSharp  className="mr-3 text-xl" />
                Sign Out
              </div>
            </li>
            
  
          </ul>
        </nav>
      </div>
    );
  };

  export default Sidebar;