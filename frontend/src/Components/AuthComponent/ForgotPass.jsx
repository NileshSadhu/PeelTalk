import { useState } from "react";
import CustomButton from "../common/CustomButton";
import CustomInput from "../common/CustomInput";
import Head from "../common/head";
import { isEmailValid, validPin } from "./CheckList";
import Title from "../common/Title";
import axios from "axios";

function ForgotPass() {

    const backend_api = import.meta.env.VITE_BACKEND_URL;
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [pin, setPin] = useState("");
    const [emailError, setEmailError] = useState("");
    const [pinError, setPinError] = useState("");

    async function handleSubmit(email, pin) {
        const emailValidationMessage = isEmailValid(email);
        const pinValidationMessage = validPin(pin);

        if (emailValidationMessage) {
            setEmailError(emailValidationMessage);
            return;
        }

        if (pinValidationMessage) {
            setPinError(pinValidationMessage);
            return;
        }

        if (!email) {
            setError("Email is required.");
            return;
        }

        try {

            const response = await axios.post(`${backend_api}/forgetpass`, {
                email,
                pin
            })

            const data = await response.data;
            if (response.ok) {
                localStorage.setItem("token", data.token);
                alert("Login Successful");
                setError("");
            } else {
                setError(data.message || "Login Failed");
            }

        } catch (error) {
            console.log(error);
            setError("Something went wrong. Please try again.");
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
                            }}
                            error={emailError}
                        />

                        {/* OTP field */}
                        <CustomInput
                            id="otp"
                            label="OTP:"
                            placeholder="Enter 4 digit pin."
                            onChange={(value) => {
                                setPin(value);
                                const validationMsg = validPin(value);
                                setPinError(validationMsg || "");
                            }}
                            error={pinError}
                        />

                        {/* btn */}
                        <CustomButton
                            type="button"
                            label="Submit"
                            onClick={() => handleSubmit(email, pin)}
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