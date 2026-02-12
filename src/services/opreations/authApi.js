import { toast } from "react-hot-toast";
import axios from "axios";
import { apiConnector } from "../apiConnector";

export const registrationForm = async (formData) => {
    console.log("Form Data 1", formData);
    const toastId = toast.loading("Loading..");
    let result = null;
    try {
        const response = await axios.post("/v2/addmission", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        console.log(response);

        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("Register Successfully");
        result = response.data;
    } catch (error) {
        console.log("Create Api error", error);
        toast.error(error.response?.data?.message || "An error occurred");
    }
    toast.dismiss(toastId);
    return result;
}

export const uploadDuments = async (formData)=>{
    console.log("Form Data 1", formData);
    const toastId = toast.loading("Loading..");

    let result = null;
    try {
        const response = await axios.post("/uploaddocuments", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        console.log(response);

        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("Documents Successfully Upload's!");
        result = response.data;
    } catch (error) {
        console.log("Create Api error", error);
        toast.error(error.response?.data?.message || "An error occurred");
    }
    toast.dismiss(toastId);
    return result;
}

