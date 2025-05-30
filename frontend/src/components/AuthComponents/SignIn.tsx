import { useState } from "react";
import { AuthContainer } from "../Common/AuthConatiner"
import { CustomInput } from "../Common/CustomInput"
import { Head } from "../Common/Head"
import { isEmailValid, isPasswordValid } from "../../utils/validation";
import PasswordInput from "../Common/PasswordInput";
import { SubmitBtn } from "../Common/SubmitBtn";
import { handleSignIn } from "../../api/auth";
import { NavigateLinks } from "../Common/NavigateLinks";
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleSubmit = async()=>{
        const result = await handleSignIn(email,password);

        if(result?.success){
            navigate(result.next!);
        }
    };


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
                            title={"Welcome Back!"}
                            tagline={"Back for more Bananas? We got you"}
                        />

                        <CustomInput
                            id="email" label="Email:" type="email"
                            name="Email" placeholder="xyz@example.com" value={email}
                            onChange={(value) => {
                                setEmail(value);
                                const validationMsg = isEmailValid(value);
                                setEmailError(validationMsg || "");
                            }}
                            error={emailError}
                        />

                        {/* Password Input */}
                        <PasswordInput
                            id="password" placeholder="At least 8 characters long"
                            name="password" label={"Password"} value={password}
                            onChange={(value) => {
                                setPassword(value);
                                const validationMsg = isPasswordValid(value);
                                setPasswordError(validationMsg || "");
                            }}
                            error={passwordError}
                        />

                        <button
                            onClick={() => navigate('/forgotpassword')}
                            className="balsamiq-sans-regular text-xs text-amber-900 mb-2 float-right"
                        >
                            Forget Password
                        </button>

                        <SubmitBtn
                            type="submit"
                            text="Submit"
                            onClick={handleSubmit}
                        />

                        {/* Link to Register */}
                        <NavigateLinks
                            type="SignUp"
                        />

                    </div>
                </div>

            </div>
        </div>
    )
}