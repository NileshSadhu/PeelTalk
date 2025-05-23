import { useState } from "react";
import CustomButton from "../common/CustomButton";
import CustomInput from "../common/CustomInput";
import Head from "../common/head";
import Title from "../common/Title";
import ViseVerse from "../common/ViseVerse";
import { isEmailValid, isPasswordValid } from "./CheckList";
import axios from "axios";



function Register() {

    const [error, setError] = useState("");
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const backend_api = import.meta.env.VITE_BACKEND_URL;

    async function handleSubmit(user, email, password) {
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

        if (!user || !email || !password) {
            setError("All fields are required.");
            return;
        }

        try {
            const response = await axios.post(`${backend_api}/user/signup`,{
                email,
                username: user,
                password
            })

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

                {/* Right: Register Form Section */}
                <div className="flex justify-center items-center w-full md:w-1/2">
                    <div className="bg-white p-6 sm:p-10 rounded-lg w-full max-w-md shadow-md">

                        <Head
                            title={"Let's get you started"}
                            tagline={"Don't worry, we don't bite. We just chat."}
                        />

                        {/* User field */}
                        <CustomInput
                            id="username"
                            label="Username:"
                            placeholder="peo"
                            value={user}
                            onChange={(value) => setUser(value)}
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

                        {/* password field */}
                        <CustomInput
                            id="password"
                            label="Password:"
                            placeholder="At least 8 characters long"
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
                            onClick={() => handleSubmit(user, email, password)}
                        />

                        {error && (
                            <p className="text-red-600 text-sm mt-2">{error}</p>
                        )}

                        <ViseVerse text="Already have an account? Login" />
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Register;
