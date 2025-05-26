import { useState } from "react";
import Title from "../common/Title";
import Head from "../common/head";
import CustomInput from "../common/CustomInput";
import CustomButton from "../common/CustomButton";
import axios from "axios";
import { validPin } from "./CheckList";

function CheckPin() {
    const backend_api = import.meta.env.VITE_BACKEND_URL;
    const [error, setError] = useState("");
    const [pin, setPin] = useState("");
    const [pinError, setPinError] = useState("");

    async function handleSubmit(pin) {
        const pinValidationMessage = validPin(pin);

        if (pinValidationMessage) {
            setPinError(pinValidationMessage);
            return;
        }

        try {
            const response = await axios.post(`${backend_api}/CheckPin`, {
                pin
            })

            const data = await response.data;
            if (response.status === 200) {
                localStorage.setItem("token", data.token);
                alert("OTP Verified!");
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
                            title={"Banana Protocol Activated"}
                            tagline={"Let’s verify before your new pass gets ripe!"}
                        />


                        {/* OTP field */}
                        <CustomInput
                            id="otp"
                            label="OTP:"
                            placeholder="Enter 4 digit pin."
                            onChange={(value) => {
                                setPin(value);
                                const validationMsg = validPin(value);
                                setPinError(validationMsg || "");
                            }}
                            error={pinError}
                        />

                        {/* btn */}
                        <CustomButton
                            type="button"
                            label="Submit"
                            onClick={() => handleSubmit(pin)}
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

export default CheckPin;