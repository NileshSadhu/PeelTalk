import axios from "axios"
import toast from "react-hot-toast";

const backend_api = import.meta.env.VITE_BACKEND_URL;


export const handleSignup = async (username: string, email: string, password: string) => {

    if (!username || !email || !password) {
        toast.error("Please fill all input fields.");
        return { success: false, message: "Missing input fields" };
    }

    try {
        const response = await axios.post(`${backend_api}/user/signup`, {
            username,
            email,
            password
        }, {
            withCredentials: true
        })

        if (response.status === 200) {
            toast.success(response.data.message);
            return { success: true, next: `/verifySignup/${email}` };
        }
    } catch (error: any) {
        if (error.response) {
            toast.error(error.response.data.message);
        } else {
            toast.error("There was an error signing up. Please try again later.");
        }
    }
}


export const verifySignup = async (otp: string, email: string) => {
    try {
        const response = await axios.post(`${backend_api}/user/verifySignup`, {
            otp,
            email
        }, {
            withCredentials: true
        })

        if (response.status === 201) {
            toast.success(response.data.message);
            return { success: true, next: `/` };
        }
    } catch (error: any) {
        if (error.response) {
            toast.error(error.response.data.message);
        } else {
            toast.error("There was an error signing up. Please try again later.");
        }
    }
}


export const handleSignIn = async (email: string, password: string) => {
    
    if (!email || !password) {
        toast.error("Please fill all input fields.");
        return { success: false, message: "Missing input fields" };
    }
    
    try {
        const response = await axios.post(`${backend_api}/user/login`, {
            email,
            password
        }, {
            withCredentials: true
        })

        if (response.status === 201) {
            toast.success(response.data.message);
            return { success: true, next: `/` };
        }
    } catch (error: any) {
        if (error.response) {
            toast.error(error.response.data.message)
        }
        else {
            toast.error("There was an error while login. Please try again later.");
        }
    }
}


export const forgotPassword = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${backend_api}/user/forgot-password`, {
            email,
            Newpassword: password
        }, {
            withCredentials: true
        });

        if (response.status === 200) {
            toast.success(response.data.message);
            return { success: true, next: `/resetpassword/${email}` };;
        }
    } catch (error: any) {
        if (error.response) {
            toast.error(error.response.data.message)
        }
        else {
            toast.error("There was an error while login. Please try again later.");
        }
    }
}


export const resetPassword = async (otp: string, email: string) => {
    try {
        const response = await axios.put(`${backend_api}/user/reset-password`, {
            otp,
            email
        }, {
            withCredentials: true
        })

        if (response.status === 200) {
            toast.success(response.data.message);
            return { success: true, next: `/login` };
        }
    } catch (error: any) {
        if (error.response) {
            toast.error(error.response.data.message)
        }
        else {
            toast.error("There was an error while login. Please try again later.");
        }
    }
}


