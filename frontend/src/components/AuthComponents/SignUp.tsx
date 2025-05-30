import { useState } from "react";
import { AuthContainer } from "../Common/AuthConatiner";
import { CustomInput } from "../Common/CustomInput";
import { Head } from "../Common/Head";
import { isEmailValid, isPasswordValid } from "./AuthFunctions";
import PasswordInput from "../Common/PasswordInput";
import { SubmitBtn } from "../Common/SubmitBtn";
import { handleSignIn } from "../../api/auth";
import { NavigateLinks } from "../Common/NavigateLinks";

export const SignUp = () => {

    const [user, setUser] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");

    return (
        <div className="min-h-screen bg-gradient-to-b from-yellow-200 to-yellow-100 flex items-center justify-center p-4" >
            <div className="flex flex-col md:flex-row items-center md:items-stretch w-full max-w-7xl min-w-0" >

                {/* Left: Title Section */}
                <div className="flex justify-center items-center w-full md:w-1/2">
                    <Head />
                </div>

                <div className="flex justify-center items-center w-full md:w-1/2">
                    <div className="bg-white p-6 sm:p-10 rounded-lg w-full max-w-md">

                        <AuthContainer
                            title={"Let's get you started"}
                            tagline={"Don't worry, we don't bite. We just chat."}
                        />

                        {/* Username Input */}
                        <CustomInput
                            id="username" label="username" name="username"
                            placeholder="peo" value={user}
                            onChange={(value: string) => setUser(value)}
                        />

                        {/* Email input with real-time validation */}
                        <CustomInput
                            id="email" label="Email:" type="email"
                            name="Email" placeholder="xyz@example.com" value={email}
                            onChange={(value: string) => {
                                setEmail(value);
                                const validationMsg = isEmailValid(value);
                                setEmailError(validationMsg || "");
                            }}
                            error={emailError}
                        />

                        {/* Password Input with real-time validation */}
                        <PasswordInput
                            id="password" placeholder="At least 8 characters long"
                            name="password" label={"Password"} value={password}
                            onChange={(value: string) => {
                                setPassword(value);
                                const validationMsg = isPasswordValid(value);
                                setPasswordError(validationMsg || "");
                            }}
                            error={passwordError}
                        />

                        <SubmitBtn
                            type="submit"
                            text="Submit"
                            onClick={() => {
                                if (emailError || passwordError || !user || !email || !password) {
                                    alert("Please correct the form errors.");
                                    return;
                                }
                                handleSignIn(email, password);
                            }}
                        />

                        {/* Link to Register */}
                        <NavigateLinks
                            type="SignIn"
                        />

                    </div>
                </div>

            </div>
        </div>
    );
};