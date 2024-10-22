import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./component/common/Navbar";
import "./App.css";
import Header from "./component/common/Header";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import InterviewTips from "./component/core/Homepage/InterviewTips";
import JobBoard from "./pages/JobBoard";
import Dashboard from "./component/core/Dashboard/Dashboard";
import VerifyEmail from "./pages/VerifyEmail";
import OpenRoute from "./component/core/Auth/OpenRoute";
import PrivateRoute from "./component/core/Auth/PrivateRoute";
 import Calender from "./pages/Calender";
 import RecentJob from "./pages/RecentJob";
//  import {Notification} from "./component/core/Auth/Notification"
import JobAppliedList from "./component/common/JobAppliedList";
import Profile from "./pages/Profile";
import AcademicDashboard from "./pages/AcademicDashboard ";
import OfferLetterUpload from "./pages/OfferLetterUpload";
import ResumeUpload from "./pages/ResumeUpload";
import HelpDeskComponent from "./pages/HelpDeskComponent";
import StudentDetailsForm from "./pages/StudentDetailsForm";
import AttachmentForm from "./pages/AttachmentForm";
import SkillsForm from "./pages/SkillsForm";
 function App() {
  return (
    <div className="min-h-screen flex flex-col font-inter w-full">
      <div className="  bg-slate-300 flex flex-col font-inter">
       
        <NavBar />
        {/* Routes are defined using the Routes component */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/resume-tips" element={<InterviewTips />} />
            <Route path="/Jobboard" element={<JobBoard />} />
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            <Route path="/verify-email" element={<VerifyEmail />} />

            <Route
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            >
              <Route path="dashboard/recentjob" element={<RecentJob />} />
              <Route path="dashboard/calender" element={<Calender />} />
              <Route path="dashboard/appliedjob" element={<JobAppliedList />} />
              <Route path="dashboard/profile" element={<Profile />} />
              <Route path="dashboard/curracademics" element={<AcademicDashboard />} />
              <Route path="dashboard/uploadLetter" element={<OfferLetterUpload />} />
              <Route path="dashboard/uploadresume" element={<ResumeUpload />} />
              <Route path="dashboard/help" element={<HelpDeskComponent />} />
              <Route path="dashboard/personal" element={<StudentDetailsForm />} />
              <Route path="dashboard/AttachmentForm" element={<AttachmentForm />} />
              <Route path="dashboard/skill" element={<SkillsForm />} />
             
            </Route>

            {/* Add more routes as needed */}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
