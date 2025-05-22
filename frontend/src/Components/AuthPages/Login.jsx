import { useState } from "react";
import CustomButton from "../common/CustomButton";
import CustomInput from "../common/CustomInput";
import Head from "../common/head";
import Title from "../common/Title";
import ViseVerse from "../common/ViseVerse";
import { isPasswordValid, isEmailValid } from "./CheckList";


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");


    async function handleSubmit(email, password) {
        const emailValidationMessage = isEmailValid(email);
        const passwordValidationMessage = isPasswordValid(password);

        setEmailError("");
        setPasswordError("");
        setError("");

        if (emailValidationMessage) {
            setEmailError(emailValidationMessage);
            return;
        }

        if (passwordValidationMessage) {
            setPasswordError(passwordValidationMessage);
            return;
        }

        try {
            const response = await fetch("https://backend/login", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
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

                {/* Right: Login Box */}
                <div className="flex justify-center items-center w-full md:w-1/2">

                    <div className="bg-white p-6 sm:p-10 rounded-lg w-full max-w-md">

                        <Head
                            title={"Welcome Back!"}
                            tagline={"Back for more Bananas? We got you"}
                        />

                        {/* email Field */}
                        <CustomInput
                            id="email"
                            label="Email:"
                            type="email"
                            placeholder="xyz@example.com"
                            onChange={(value) => {
                                setEmail(value)
                                const validatinnMsg = isEmailValid(value);
                                setEmailError(validatinnMsg || "");
                            }}
                            error={emailError}
                        />

                        {/* password Field */}
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

                        {/* Btn */}
                        <CustomButton
                            type="Submit"
                            label="Submit"
                            onClick={() => handleSubmit(email, password)}
                        />
                        <ViseVerse text="Don't have an account? Register" />
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Login;
