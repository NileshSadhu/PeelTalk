import { useState } from "react";
import CustomButton from "../common/CustomButton";
import CustomInput from "../common/CustomInput";
import Head from "../common/head";
import Title from "../common/Title";

function VerifyEmail() {

    const backend_api = import.meta.env.VITE_BACKEND_URL;
    const [pin, setPin] = useState("");
    const [error, setError] = useState("");
    const [pinError, setPinError] = useState("");

    async function handleSubmit(pin) {
        const pinValidationMessage = validPin(pin);

        if (pinValidationMessage) {
            setPinError(pinValidationMessage);
            return;
        }

        try {
            const response = await axios.post(`${backend_api}/VerifyEmail`, {
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

                {/* Right: Login Box */}
                <div className="flex justify-center items-center w-full md:w-1/2">

                    <div className="bg-white p-6 sm:p-10 rounded-lg w-full max-w-md">

                        <Head
                            title={"Verify Email :"}
                            tagline={"4 digit code has been sent to your email."}
                        />

                        {/* Pin Field */}
                        <CustomInput
                            id="otp"
                            type="number"
                            placeholder="XXXX"
                            onChange={(value) => {
                                setPin(value);
                                const validationMsg = validPin(value);
                                setPinError(validationMsg || "");
                            }}
                            error={pinError}
                        />

                        {/* Btn */}
                        <CustomButton
                            type="Submit"
                            label="Submit"
                            onClick={() => handleSubmit(pin)}
                        />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default VerifyEmail;