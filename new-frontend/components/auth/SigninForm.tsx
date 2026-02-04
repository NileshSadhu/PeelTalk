"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CustomInput } from "@components/common/inputbox";
import { SubmitBtn } from "@components/common/SubmitBtn";
import { NavigateLinks } from "@components/common/NavigateLinks";
import { isEmailValid, isPasswordValid } from "@lib/validators";
import { SubtitleContainer } from "../common/SubtitleContainer";
import { PasswordInput } from "@components/common/PasswordInput";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

export const SignInForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const emailValidation = isEmailValid(email);
    const passwordValidation = isPasswordValid(password);

    setEmailError(emailValidation || "");
    setPasswordError(passwordValidation || "");

    if (emailValidation || passwordValidation) return;

    try {
      setLoading(true);
      // 🔐 Call login API here
      console.log({ email, password });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div className="bg-white rounded-lg w-full">
        <SubtitleContainer
          title="Welcome Back!"
          tagline="Back for more Bananas? We got you"
        />

        <CustomInput
          id="email"
          label="Email:"
          type="email"
          name="email"
          placeholder="xyz@example.com"
          value={email}
          onChange={(value) => {
            setEmail(value);
            setEmailError(isEmailValid(value) || "");
          }}
          error={emailError}
        />

        <PasswordInput
          id="password"
          label="Password"
          name="password"
          placeholder="At least 8 characters long"
          value={password}
          onChange={(value: string) => {
            setPassword(value);
            setPasswordError(isPasswordValid(value) || "");
          }}
          error={passwordError}
        />

        <button
          onClick={() => router.push("/forgotpassword")}
          className="balsamiq-sans-regular text-xs text-amber-900 mb-2 float-right"
        >
          Forget Password
        </button>

        <SubmitBtn
          type="submit"
          text="Submit"
          onClick={handleSubmit}
          disabled={loading}
        />

        <GoogleLogin
          onSuccess={async (response) => {
            const token = response.credential;

            await axios.post("http://localhost:3000/auth/google", {
              token,
            });
          }}
          onError={() => console.log("Google Login Failed")}
        />

        <NavigateLinks type="SignUp" />
      </div>
    </div>
  );
};
