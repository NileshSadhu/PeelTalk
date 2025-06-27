import { AuthContainer } from "../Common/AuthConatiner";
import { CustomInput } from "../Common/CustomInput";
import { Head } from "../Common/Head";
import { isEmailValid, isPasswordValid } from "../../utils/validation";
import { useState } from "react";
import PasswordInput from "../Common/PasswordInput";
import { forgotPassword } from "../../api/auth";
import { SubmitBtn } from "../Common/SubmitBtn";
import { useNavigate } from "react-router-dom";

export const ForgetPassword = () => {
    const navigate = useNavigate();

    const [error, setError] = useState<string>("");

    const [email, setEmail] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");

    const [password, setPassword] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");

    const [showEmailSuccess, setShowEmailSuccess] = useState<boolean>(false);
    const [emailFeedback, setEmailFeedback] = useState<string>("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (emailError || passwordError || !email || !password) {
            setError("Please correct the form errors and fill all fields.");
            return;
        }

        setLoading(true); // start loading

        const result = await forgotPassword(email, password);

        setLoading(false); // stop loading

        if (result?.success) {
            sessionStorage.setItem("newCachedPassword", password);
            navigate(result.next);
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-b from-yellow-200 to-yellow-100 flex items-center justify-center p-4">
            <div className="flex flex-col md:flex-row items-center md:items-stretch w-full max-w-7xl min-w-0">
                <div className="flex justify-center items-center w-full md:w-1/2">
                    <Head />
                </div>

                <div className="flex justify-center items-center w-full md:w-1/2">
                    <div className="bg-white p-6 sm:p-10 rounded-lg w-full max-w-md shadow-md">
                        <AuthContainer
                            title={"Forgot your password?"}
                            tagline={"Oops.. even banana slip sometimes."}
                        />

                        <CustomInput
                            id="email"
                            label="Email:"
                            type="email"
                            name="email"
                            placeholder="xyz@example.com"
                            value={email}
                            onChange={(value: string) => {
                                setEmail(value);
                                const validationMsg = isEmailValid(value);
                                setEmailError(validationMsg || "");

                                if (!validationMsg) {
                                    setShowEmailSuccess(true);
                                    setEmailFeedback("✅ OTP will be sent to this email.");
                                } else {
                                    setShowEmailSuccess(false);
                                    setEmailFeedback("");
                                }
                            }}
                            error={emailError}
                            showIcon={showEmailSuccess}
                            iconMessage={emailFeedback}
                        />

                        <PasswordInput
                            id="newpass"
                            name="password"
                            label="New Password:"
                            placeholder="At least 8 characters long."
                            value={password}
                            onChange={(value: string) => {
                                setPassword(value);
                                const validationMsg = isPasswordValid(value);
                                setPasswordError(validationMsg || "");
                            }}
                            error={passwordError}
                        />

                        <SubmitBtn
                            type="button"
                            text="Submit"
                            onClick={handleSubmit}
                            disabled={loading}
                        />

                        {error && (
                            <p className="text-red-600 text-sm mt-2">{error}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};