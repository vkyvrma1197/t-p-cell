import { toast } from "react-hot-toast";
import { setJobPosted, setLoading } from "../../slices/jobPostedSlice";
 
import { apiConnector } from "../apiconnector";
import { jobpost } from "../api";
import { useSelector } from "react-redux";