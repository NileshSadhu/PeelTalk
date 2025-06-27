import { useState } from "react";
import { AuthContainer } from "../Common/AuthConatiner";
import { CustomInput } from "../Common/CustomInput";
import { Head } from "../Common/Head";
import { isEmailValid, isPasswordValid } from "../../utils/validation";
import PasswordInput from "../Common/PasswordInput";
import { SubmitBtn } from "../Common/SubmitBtn";
import { handleSignup } from "../../api/auth";
import { NavigateLinks } from "../Common/NavigateLinks";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        const result = await handleSignup(user, email, password);
        setLoading(false);

        if (result?.success) {
            sessionStorage.setItem("cachedPassword", password);
            navigate(result.next!);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-yellow-200 to-yellow-100 flex items-center justify-center p-4">
            <div className="flex flex-col md:flex-row items-center md:items-stretch w-full max-w-7xl min-w-0">
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
                            id="username"
                            label="Username"
                            name="username"
                            placeholder="peo"
                            value={user}
                            onChange={(value: string) => setUser(value)}
                        />

                        {/* Email input with real-time validation */}
                        <CustomInput
                            id="email"
                            label="Email:"
                            type="email"
                            name="Email"
                            placeholder="xyz@example.com"
                            value={email}
                            onChange={(value: string) => {
                                setEmail(value);
                                const validationMsg = isEmailValid(value);
                                setEmailError(validationMsg || "");
                            }}
                            error={emailError}
                        />

                        {/* Password Input with real-time validation */}
                        <PasswordInput
                            id="password"
                            placeholder="At least 8 characters long"
                            name="password"
                            label={"Password"}
                            value={password}
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
                            onClick={handleSubmit}
                            disabled={loading}
                        />

                        {/* Link to Sign In */}
                        <NavigateLinks type="SignIn" />
                    </div>
                </div>
            </div>
        </div>
    );
};