import { useState } from "react";
import CustomButton from "../common/CustomButton";
import CustomInput from "../common/CustomInput";
import Head from "../common/head";
import { isEmailValid, isPasswordValid } from "./CheckList";
import Title from "../common/Title";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ForgotPass() {

    const navigate = useNavigate();

    const backend_api = import.meta.env.VITE_BACKEND_URL;
    const [error, setError] = useState("");

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");

    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [showEmailSuccess, setShowEmailSucccess] = useState(false);
    const [emailFeedback, setEmailFeedvack] = useState("");


    async function handleSubmit(email, password) {
        const emailValidationMessage = isEmailValid(email);
        const passwordValidationMessage = isPasswordValid(password);

        if (emailValidationMessage) {
            setEmailError(emailValidationMessage);
            return;
        }

        if (passwordValidationMessage) {
            setPasswordError(passwordValidationMessage);
            return;
        }

        if (!email) {
            setError("Email is required.");
            return;
        }

        try {
            const response = await axios.post(`${backend_api}/user/forgot-password`, {
                email,
                Newpassword: password
            },{
                withCredentials: true
            });

            const data = response.data;
            if (response.status === 200) {
                toast.info("Otp sent to your email for password reset.");
                setError("");
                setEmail("");
                setPassword("");
                setEmailError("");
                setPasswordError("");
                setShowEmailSucccess(false);
                setEmailFeedvack("");
                navigate(`/checkpin/${email}`);
            } else {
                setError(data.message || "Password reset failed.");
            }
        } catch (error) {
            console.error(error);
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

                {/* Right: Register Form Section */}
                <div className="flex justify-center items-center w-full md:w-1/2">
                    <div className="bg-white p-6 sm:p-10 rounded-lg w-full max-w-md shadow-md">

                        <Head
                            title={"Forget your passowrd ?"}
                            tagline={"Oops.. even banana slip sometimes."}
                        />

                        {/* email field */}
                        <CustomInput
                            id="email"
                            label="Email:"
                            type="email"
                            placeholder="xyz@example.com"
                            onChange={(value) => {
                                setEmail(value)
                                const validationMsg = isEmailValid(value);
                                setEmailError(validationMsg || "");

                                if (!validationMsg) {
                                    setShowEmailSucccess(true);
                                    setEmailFeedvack("✅ OTP will be send to this email.");
                                } else {
                                    setShowEmailSucccess(false);
                                    setEmailFeedvack("");
                                }

                            }}
                            error={emailError}
                            showIcon={showEmailSuccess}
                            iconMessage={emailFeedback}
                        />

                        {/* New Password field */}
                        <CustomInput
                            id="newpass"
                            label="New Password:"
                            placeholder="add special character"
                            onChange={(value) => {
                                setPassword(value);
                                const validationMsg = isPasswordValid(value);
                                setPasswordError(validationMsg || "");
                            }}
                            error={passwordError}
                        />

                        {/* btn */}
                        <CustomButton
                            type="button"
                            label="Submit"
                            onClick={() => handleSubmit(email, password)}
                        />

                        {error && (
                            <p className="text-red-600 text-sm mt-2">{error}</p>
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ForgotPass;