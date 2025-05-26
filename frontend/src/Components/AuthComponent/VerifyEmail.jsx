import { useState } from "react";
import { useParams } from "react-router-dom"
import CustomButton from "../common/CustomButton";
import axios from "axios";
import CustomInput from "../common/CustomInput";
import Head from "../common/head";
import Title from "../common/Title";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function VerifyEmail() {

    const backend_api = import.meta.env.VITE_BACKEND_URL;
    const {email} = useParams();
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();

    async function handleSubmit() {
        try {
            const response = await axios.post(`${backend_api}/user/verifySignup`, {
                otp: otp,
                email: email
            },{
                withCredentials: true
            })

            if (response.status === 201) {
                toast.success("Signup Successful !!!");
                navigate('/')
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-yellow-300 to-yellow-100 flex items-center justify-center p-4">
            <div className="flex flex-col md:flex-row items-center md:items-stretch w-full max-w-7xl min-w-0">

                {/* Left: Title Section */}
                <div className="flex justify-center items-center w-full md:w-1/2">
                    <Title />
                </div>

                {/* Right: Login Box */}
                <div className="flex justify-center items-center w-full md:w-1/2">

                    <div className="bg-white p-6 sm:p-10 rounded-lg w-full max-w-md">

                        <Head
                            title={"Verify Email :"}
                            tagline={"4 digit code has been sent to your email."}
                        />

                        {/* Pin Field */}
                        <CustomInput
                            id="otp"
                            type="number"
                            placeholder="XXXX"
                            onChange={(value) => {
                                setOtp(value);
                            }}
                        />

                        {/* Btn */}
                        <CustomButton
                            type="Submit"
                            label="Submit"
                            onClick={handleSubmit}
                        />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default VerifyEmail;