"use client";

import { useState } from "react";
import { SubtitleContainer } from "@components/common/SubtitleContainer";
import { CustomInput } from "@components/common/inputbox";
import { PasswordInput } from "@components/common/PasswordInput";
import { SubmitBtn } from "@components/common/SubmitBtn";
import { NavigateLinks } from "@components/common/NavigateLinks";
import { isEmailValid, isPasswordValid } from "@/lib/validators";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function SignupForm() {
  const [user, setUser] = useState("");
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

    setLoading(true);
    try {
      // await onSubmit({ username: user, email, password })
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div className="bg-white rounded-lg w-full max-w-md">
        <SubtitleContainer
          title="Let's get you started"
          tagline="Don't worry, we don't bite. We just chat."
        />

        <CustomInput
          id="username"
          label="Username"
          name="username"
          placeholder="peo"
          value={user}
          onChange={setUser}
        />

        <CustomInput
          id="email"
          label="Email"
          type="email"
          name="email"
          placeholder="xyz@example.com"
          value={email}
          onChange={(value: string) => {
            setEmail(value);
            setEmailError(isEmailValid(value) || "");
          }}
          error={emailError}
        />

        <PasswordInput
          id="password"
          name="password"
          label="Password"
          placeholder="At least 8 characters long"
          value={password}
          onChange={(value: string) => {
            setPassword(value);
            setPasswordError(isPasswordValid(value) || "");
          }}
          error={passwordError}
        />

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

        <NavigateLinks type="SignIn" />
      </div>
    </div>
  );
}
