import axios from "axios"
import toast from "react-hot-toast";
import type { ProfileInputs } from "../components/ProfileComponents/Profile";
import { exportPublicKey, generateKeyPair } from "../utils/keyUtils";
import { decryptPrivateKeyWithPassword, encryptPrivateKeyWithPassword } from "../utils/aesUtils.ts";
import { KeyStorageService } from "../utils/keyStorage.ts";
import { clearUserKeysFromIndexedDB, storeUserKeysInIndexedDB } from "../utils/indexedDbUtils.ts";
import { useUserStore } from "../store/useUserStore.ts";

const backend_api = import.meta.env.VITE_BACKEND_URL;


export const handleSignup = async (username: string, email: string, password: string) => {

    if (!username || !email || !password) {
        toast.error("Please fill all input fields.");
        return { success: false, message: "Missing input fields" };
    }

    const { publicKey, privateKey } = await generateKeyPair();
    const exportedPublicKey = await exportPublicKey(publicKey);

    const encryptedPrivateKey = await encryptPrivateKeyWithPassword(privateKey, password);
    try {
        const response = await axios.post(`${backend_api}/user/signup`, {
            username,
            email,
            password,
            publicKey: exportedPublicKey,
            encryptedPrivateKey
        }, {
            withCredentials: true
        })

        if (response.status === 200) {
            toast.success(response.data.message);

            console.log(response.data)

            return { success: true, next: `/verification/${email}` };
        }
    } catch (error: any) {
        if (error.response) {
            toast.error(error.response.data.message);
        } else {
            toast.error("There was an error signing up. Please try again later.");
        }
    }
}


export const verifySignup = async (otp: string, email: string, password: string) => {
    try {
        const response = await axios.post(`${backend_api}/user/verifySignup`, {
            otp,
            email
        }, {
            withCredentials: true
        })

        if (response.status === 201) {
            toast.success(response.data.message);
            
            const { encryptedPrivateKey, publicKey } = response.data;

            const decryptedPrivateKey = await decryptPrivateKeyWithPassword(encryptedPrivateKey.cipher, password,  encryptedPrivateKey.iv, encryptedPrivateKey.salt)

            KeyStorageService.setInMemoryKey(decryptedPrivateKey);
            await KeyStorageService.setPrivateKeyToLocalStorage(decryptedPrivateKey);

            await storeUserKeysInIndexedDB({
                publicKey,
                encryptedPrivateKey
            })

            return { success: true, next: `/` };
        }
        return { success: false, error: "Unexpected response from server." };
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

            const {encryptedPrivateKey, publicKey } = response.data;

            const decryptedPrivateKey = await decryptPrivateKeyWithPassword(encryptedPrivateKey.cipher, password, encryptedPrivateKey.iv, encryptedPrivateKey.salt)

            await KeyStorageService.setPrivateKeyToLocalStorage(decryptedPrivateKey)

            await storeUserKeysInIndexedDB({
                publicKey,
                encryptedPrivateKey
            })

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
        const { publicKey, privateKey } = await generateKeyPair();
        const exportedPublicKey = await exportPublicKey(publicKey);
        
        const encryptedPrivateKey = await encryptPrivateKeyWithPassword(privateKey, password);

        const response = await axios.post(`${backend_api}/user/forgot-password`, {
            email,
            Newpassword: password,
            publicKey: exportedPublicKey,
            encryptedPrivateKey
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


export const resetPassword = async (otp: string, email: string, password: string) => {
    try {
        const response = await axios.put(`${backend_api}/user/reset-password`, {
            otp,
            email
        }, {
            withCredentials: true
        })

        if (response.status === 200) {
            toast.success(response.data.message);

            const { encryptedPrivateKey, publicKey } = response.data;

            const decryptedPrivateKey = await decryptPrivateKeyWithPassword(encryptedPrivateKey.cipher, password, encryptedPrivateKey.iv, encryptedPrivateKey.salt)

            KeyStorageService.setInMemoryKey(decryptedPrivateKey)
            await KeyStorageService.setPrivateKeyToLocalStorage(decryptedPrivateKey)

            await storeUserKeysInIndexedDB({
                publicKey,
                encryptedPrivateKey
            })

            return { success: true, next: `/signIn` };
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


export const logoutUser = async () => {
        try {
            const response = await axios.post(`${backend_api}/user/logout`, {}, {
                withCredentials: true
            });

            if (response.status === 200) {
                sessionStorage.clear();
                KeyStorageService.clearAll();
                await clearUserKeysFromIndexedDB();

                useUserStore.getState().clearUser();

                toast.success("Logged out successfully.");
                return { success: true, next: `/`}
            } else {
                toast.error("Logout failed. Please try again.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong. Please try again.");
        }
    };


export const updateUser = async (formData:ProfileInputs) => {
    try{
        const response = await axios.put(`${backend_api}/user/updateUserDetails`,formData,{
            withCredentials: true
        })

        if (response.status === 200) {
            toast.success("Profile updated successfully.");
            return { success: true }
        } else {
            toast.error("Profile update failed. Please try again.");
        }
    }catch(error){
        console.error(error);
        toast.error("Something went wrong. Please try again.");
    }
}


export const updateProfilePhoto = async (image: File) => {
    try{
        const formData = new FormData();
        formData.append("image", image);

        const response = await axios.put(`${backend_api}/user/updateProfilePhoto`,formData,{
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })

        if (response.status === 200) {
            toast.success("Profile Photo updated successfully.");
            return { success: true, imageUrl: response.data.imageUrl };
        } else {
            throw new Error("Upload failed");
        }
    }catch(error){
        console.error("Upload Error:", error);
        toast.error("Something went wrong. Please try again.");
    }
}