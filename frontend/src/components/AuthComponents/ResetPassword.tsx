import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { validPin } from "../../utils/validation";
import { CustomInput } from "../Common/CustomInput";
import { Head } from "../Common/Head";
import { AuthContainer } from "../Common/AuthConatiner";
import { SubmitBtn } from "../Common/SubmitBtn";
import { resetPassword } from "../../api/auth";



export const ResetPassword = ()=>{
        const {email} = useParams();
        const [error, setError] = useState("");
        const [pin, setPin] = useState("");
        const [pinError, setPinError] = useState("");
        const [loading, setLoading] = useState(false);

        const navigate = useNavigate();
    
        async function handleSubmit(pin: string) {
            const pinValidationMessage = validPin(pin);

            if (pinValidationMessage) {
                setPinError(pinValidationMessage);
                return;
            }

            if (!email) {
                setError("Email is missing from the URL. Please go back and try again.");
                return;
            }

            const newCachedPassword = sessionStorage.getItem("newCachedPassword");

            if (!newCachedPassword) {
                setError("Verification expired or invalid. Please sign up again.");
                return;
            }

            setLoading(true); // start loading
            const result = await resetPassword(pin, email, newCachedPassword);
            setLoading(false); // stop loading

            if (result?.success) {
                navigate(result.next);
            }
        }
    
        return (
            <div className="min-h-screen bg-gradient-to-b from-yellow-200 to-yellow-100 flex items-center justify-center p-4">
                <div className="flex flex-col md:flex-row items-center md:items-stretch w-full max-w-7xl min-w-0">
                    {/* Left: Title Section */}
                    <div className="flex justify-center items-center w-full md:w-1/2">
                        <Head />
                    </div>
    
                    {/* Right: Register Form Section */}
                    <div className="flex justify-center items-center w-full md:w-1/2">
                        <div className="bg-white p-6 sm:p-10 rounded-lg w-full max-w-md shadow-md">
    
                            <AuthContainer
                                title={"Banana Protocol Activated"}
                                tagline={"Let’s verify before your new pass gets ripe!"}
                            />
    
    
                            {/* OTP field */}
                            <CustomInput
                                id="otp"
                                label="OTP:"
                                placeholder="Enter 4 digit pin."
                                value={pin} // ✅ correctly bound to state
                                onChange={(value) => {
                                    setPin(value);
                                    const validationMsg = validPin(value);
                                    setPinError(validationMsg || "");
                                }}
                                error={pinError}
                                name="otp"
                            />
                            {/* btn */}
                            <SubmitBtn
                                type="button"
                                text="Submit"
                                onClick={() => handleSubmit(pin)}
                                disabled={loading}
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