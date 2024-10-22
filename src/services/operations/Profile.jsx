import { toast } from "react-hot-toast";
 
import { apiConnector } from "../apiconnector";
import { jobpost,settingsEndpoints } from "../api";

const { CHANGE_PASSWORD_API,  } =
settingsEndpoints;



export async function changePassword(formData,token) {
    const toastId = toast.loading("Loading...")
    try {
      formData.token=token
      formData.confirmNewPassword=formData.newPassword
      const response = await apiConnector("POST", CHANGE_PASSWORD_API, formData, {
        Authorization: `Bearer ${token}`,
      })
      console.log("CHANGE_PASSWORD_API API RESPONSE............", response)
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Password Changed Successfully")
    } catch (error) {
      console.log("CHANGE_PASSWORD_API API ERROR............", error)
      toast.error(error.response.data.error)
    }
    toast.dismiss(toastId)
  }