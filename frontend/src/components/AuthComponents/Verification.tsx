import { useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContainer } from "../Common/AuthConatiner";
import { CustomInput } from "../Common/CustomInput";
import { Head } from "../Common/Head";
import { resetPassword } from "../../api/auth";
import { SubmitBtn } from "../Common/SubmitBtn";

export const Verification = () => {
    const [otp, setOtp] = useState<string>("");
    const [error, setError] = useState<string>("");

    const { email } = useParams<{ email?: string }>();

    return (
        <div className="min-h-screen bg-gradient-to-b from-yellow-200 to-yellow-100 flex items-center justify-center p-4">
            <div className="flex flex-col md:flex-row items-center md:items-stretch w-full max-w-7xl min-w-0">
                <div className="flex justify-center items-center w-full md:w-1/2">
                    <Head />
                </div>

                <div className="flex justify-center items-center w-full md:w-1/2">
                    <div className="bg-white p-6 sm:p-10 rounded-lg w-full max-w-md">
                        <AuthContainer
                            title={"Verify Email :"}
                            tagline={"4-digit code has been sent to your email."}
                        />

                        <CustomInput
                            id="otp"
                            label=""
                            name="otp"
                            type="number"
                            placeholder="XXXX"
                            value={otp}
                            onChange={(value: string) => {
                                setOtp(value);
                            }}
                        />

                        <SubmitBtn
                            type="button"
                            text="Submit"
                            onClick={async () => {
                                setError("");

                                if (!otp || otp.length !== 4) {
                                    setError("Please enter a valid 4-digit OTP.");
                                    return;
                                }

                                if (!email) {
                                    setError("Email is missing from the URL. Please go back and try again.");
                                    return;
                                }

                                try {
                                    await resetPassword(email, otp);
                                    console.log("OTP verification successful for:", email);
                                } catch (err: any) {
                                    console.error("Verification failed:", err);
                                    setError(err.message || "Failed to verify OTP. Please try again.");
                                }
                            }}
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