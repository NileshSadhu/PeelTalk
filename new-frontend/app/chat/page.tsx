"use client"

import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/auth.store"

export default function ChatPage() {
    const router = useRouter()
    const user = useAuthStore((s) => s.user)

    return (
        <div>
        <h1>Chat Page</h1>

        {user && (
            <div>
            <button
                onClick={() => router.push("/profile")}
            >
                Go To Profile
            </button>
            </div>
        )}
        {!user && (
            <div className="flex justify-between">
            <button
                onClick={() => router.push("/signin")}
            >
                Signin
            </button>
            <button
                onClick={() => router.push("/signup")}
            >
                Signup
            </button>
            </div>
        )}
        </div>
    )
}
