import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { jobpost, settingsEndpoints } from "../api";
import { setLoading } from "../../slices/profileSlice";

const { CHANGE_PASSWORD_API, UPDATE_DISPLAY_PICTURE_API } = settingsEndpoints;

export async function changePassword(formData, token) {
  const toastId = toast.loading("Loading...");
  try {
    formData.token = token;
    formData.confirmNewPassword = formData.newPassword;

    const response = await apiConnector("POST", CHANGE_PASSWORD_API, formData, {
      Authorization: `Bearer ${token}`,
    });
    console.log("CHANGE_PASSWORD_API API RESPONSE:", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Password Changed Successfully");
  } catch (error) {
    console.log("CHANGE_PASSWORD_API API ERROR:", error);
    toast.error(error.response?.data?.error || "Failed to change password");
  } finally {
    toast.dismiss(toastId);
  }
}

export function uploadProfileImage(selectedImage, token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        selectedImage,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      );
      console.log("Upload Success RESPONSE:", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Profile Uploaded Successfully");
    } catch (error) {
      console.log("Profile Upload ERROR:", error);
      toast.error("Failed to upload profile image");
    } finally {
      toast.dismiss(toastId);
      dispatch(setLoading(false));
    }
  };
}
