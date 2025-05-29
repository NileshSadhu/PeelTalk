// Importing necessary hooks and components
import { useState } from "react";
import CustomButton from "../common/CustomButton";
import CustomInput from "../common/CustomInput";
import Head from "../common/head";
import Title from "../common/Title";
import ViseVerse from "../common/ViseVerse";
import { isEmailValid, isPasswordValid } from "./CheckList";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PasswordInput from "../common/PasswordInput";

function Register() {
    const [error, setError] = useState("");
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const navigate = useNavigate();
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
            const response = await axios.post(`${backend_api}/user/signup`, {
                email,
                username: user,
                password,
            }, {
                withCredentials: true
            });

            if (response.status === 200) {
                toast.success("Verify Your Email To Complete registration!!!");
                navigate(`/verifyemail/${email}`);
                setError("");
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-yellow-200 to-yellow-100 flex items-center justify-center p-4">
            <div className="flex flex-col md:flex-row items-center md:items-stretch w-full max-w-7xl min-w-0">

                {/* Left side: Title component */}
                <div className="flex justify-center items-center w-full md:w-1/2">
                    <Title />
                </div>

                {/* Right side: Registration form */}
                <div className="flex justify-center items-center w-full md:w-1/2">
                    <div className="bg-white p-6 sm:p-10 rounded-lg w-full max-w-md shadow-md">

                        <Head
                            title={"Let's get you started"}
                            tagline={"Don't worry, we don't bite. We just chat."}
                        />

                        {/* Username input */}
                        <CustomInput
                            id="username"
                            label="Username:"
                            placeholder="peo"
                            value={user}
                            onChange={(value) => setUser(value)}
                        />

                        {/* Email input with real-time validation */}
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

                        {/* Password input with real-time validation */}
                        <PasswordInput
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


                        {/* Submit button */}
                        <CustomButton
                            type="button"
                            label="Submit"
                            onClick={() => handleSubmit(user, email, password)}
                        />

                        {/* Display error messages */}
                        {error && (
                            <p className="text-red-600 text-sm mt-2">{error}</p>
                        )}

                        {/* Link to Login page */}
                        <ViseVerse text="Already have an account? Login" type="login" />

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
