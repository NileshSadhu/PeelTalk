"use client"

import { useEffect, useRef, useState } from "react"
import { SubtitleContainer } from "@components/common/SubtitleContainer"
import { NavigateLinks } from "@components/common/NavigateLinks"
import axios from "axios"
import toast from "react-hot-toast"
import { useAuthStore } from "@/store/auth.store"
import { useRouter } from "next/navigation"


declare global {
    interface Window {
        google: any
    }
}

export default function SignupForm() {
    const [loading, setLoading] = useState(false)
    const googleBtnRef = useRef<HTMLDivElement>(null)

    const router = useRouter()

    const setAuth = useAuthStore((s) => s.setAuth)

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

        // THIS is the correct way
        window.google.accounts.id.renderButton(googleBtnRef.current, {
            theme: "outline",
            size: "large",
            width: 260,
            text: "signup_with",
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
                mode: "signup",
            },
            { withCredentials: true }
            )


            setAuth(res.data.user)
            toast.success("Signed up successfully!")
            router.replace("/chat")
        } catch (err: any) {
            if (!axios.isAxiosError(err)) {
            toast.error("Unexpected error occurred.")
            return
            }

            const { code, message } = err.response?.data || {}

            if (code === "GOOGLE_ACCOUNT_EXISTS") {
            toast.error("Account already exists. Please sign in.")
            return
            }

            toast.error(message || "Google signup failed.")
        } finally {
            setLoading(false)
        }
        }


    return (
        <div className="flex justify-center items-center w-full">
        <div className="bg-white rounded-lg w-full max-w-md p-6 sm:p-10 text-center">

            <SubtitleContainer
            title="Create your account"
            tagline="Fast, secure, no passwords to remember"
            />

            {/* Google controls this button — no surprise popups */}
            <div ref={googleBtnRef} className="mt-6 flex justify-center" />

            {loading && (
            <p className="mt-4 text-sm text-gray-500">
                Signing you up…
            </p>
            )}

            <NavigateLinks type="SignIn" />
        </div>
        </div>
    )
}
