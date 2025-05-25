import { useState } from "react";
import CustomButton from "../common/CustomButton";
import CustomInput from "../common/CustomInput";
import Head from "../common/head";
import Title from "../common/Title";
import ViseVerse from "../common/ViseVerse";
import { isPasswordValid, isEmailValid } from "./CheckList";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";


function Login() {
    // Form states
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Error message states
    const [error, setError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    // Backend URL from .env
    const backend_api = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

    // Handles form submission
    async function handleSubmit(email, password) {
        // Validate inputs
        const emailValidationMessage = isEmailValid(email);
        const passwordValidationMessage = isPasswordValid(password);

        // Clear previous errors
        setEmailError("");
        setPasswordError("");
        setError("");

        // Show validation errors if any
        if (emailValidationMessage) {
            setEmailError(emailValidationMessage);
            return;
        }

        if (passwordValidationMessage) {
            setPasswordError(passwordValidationMessage);
            return;
        }

        try {
            // Make POST request to login API
            const response = await axios.post(`${backend_api}/user/login`, {
                email,
                password
            });

            const data = response.data;
            if (response.status === 200) {
                localStorage.setItem("token", data.token);
                alert("Login Successful");
                navigate('/Home')
                setError("");
            } else {
                setError(data.message || "Login Failed");
            }

        } catch (error) {
            console.error(error);
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

                {/* Right: Login Form Section */}
                <div className="flex justify-center items-center w-full md:w-1/2">
                    <div className="bg-white p-6 sm:p-10 rounded-lg w-full max-w-md">

                        <Head
                            title={"Welcome Back!"}
                            tagline={"Back for more Bananas? We got you"}
                        />

                        {/* Email Input */}
                        <CustomInput
                            id="email"
                            label="Email:"
                            type="email"
                            placeholder="xyz@example.com"
                            onChange={(value) => {
                                setEmail(value);
                                const validationMsg = isEmailValid(value);
                                setEmailError(validationMsg || "");
                            }}
                            error={emailError}
                        />

                        {/* Password Input */}
                        <CustomInput
                            id="password"
                            label="Password:"
                            type="password"
                            placeholder="At least 8 characters long"
                            onChange={(value) => {
                                setPassword(value);
                                const validationMsg = isPasswordValid(value);
                                setPasswordError(validationMsg || "");
                            }}
                            error={passwordError}
                        />

                        {/* Submit Button */}
                        <CustomButton
                            type="Submit"
                            label="Submit"
                            onClick={() => handleSubmit(email, password)}
                        />

                        {/* Error message (if any) */}
                        {error && (
                            <p className="text-red-600 text-sm mt-2">{error}</p>
                        )}

                        {/* Link to Register */}
                        <ViseVerse text="Don't have an account? Register" type="register" />

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
