"use client"

import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { SubtitleContainer } from "@components/common/SubtitleContainer"
import { NavigateLinks } from "@components/common/NavigateLinks"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/auth.store"


declare global {
    interface Window {
        google: any
    }
}

export const SignInForm = () => {
    const [loading, setLoading] = useState(false)
    const googleBtnRef = useRef<HTMLDivElement>(null)
    const setAuth = useAuthStore((s) => s.setAuth)
    const router = useRouter()
    

    useEffect(() => {
        const script = document.createElement("script")
        script.src = "https://accounts.google.com/gsi/client"
        script.async = true
        script.defer = true
        document.body.appendChild(script)

        script.onload = () => {
        window.google.accounts.id.initialize({
            client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
            callback: handleGoogleResponse,
            use_fedcm_for_prompt: false,
        })

        window.google.accounts.id.renderButton(googleBtnRef.current, {
            theme: "outline",
            size: "large",
            width: 260,
            text: "signin_with",
        })
        }
    }, [])

    const handleGoogleResponse = async (response: any) => {
        try {
        setLoading(true)

        const idToken = response.credential
        if (!idToken) throw new Error("No Google ID token")

        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`,
            {
            id_token: idToken,
            mode: "signin",
            },
            { withCredentials: true }
        )
        
        setAuth(res.data.user)
        toast.success("Signed in successfully!")
        router.replace("/chat")
        } catch (err: any) {
        if (axios.isAxiosError(err)) {
            const { code, message } = err.response?.data || {}

            switch (code) {
            case "GOOGLE_ACCOUNT_NOT_FOUND":
                toast.error("No account exists with this Google email. Please sign up.")
                return

            case "GOOGLE_ACCOUNT_MISMATCH":
                toast.error("Google account mismatch. Try again.")
                return

            default:
                toast.error(message || "Google sign-in failed.")
                return
            }
        }

        console.error("Unexpected error:", err)
        toast.error("Something went wrong. Please try again.")
        } finally {
        setLoading(false)
        }
    }

    return (
        <div className="flex justify-center items-center w-full">
        <div className="bg-white rounded-lg w-full max-w-md p-6 sm:p-10 text-center">
            <SubtitleContainer
            title="Welcome Back"
            tagline="Sign in securely with Google"
            />

            <div ref={googleBtnRef} className="mt-6 flex justify-center" />

            {loading && (
            <p className="mt-4 text-sm text-gray-500">
                Signing you in…
            </p>
            )}

            <NavigateLinks type="SignUp" />
        </div>
        </div>
    )
}
