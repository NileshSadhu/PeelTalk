"use client"

import { FaSignOutAlt } from "react-icons/fa"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/auth.store"

export const LogoutButton = () => {
    const router = useRouter()
    const clearAuth = useAuthStore((s) => s.clearAuth)

    const handleLogout = async () => {
        try {
        await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/logout`,
            {},
            { withCredentials: true }
        )
        } catch {
        // Even if backend fails, nuke local state
        } finally {
        clearAuth()

        router.replace("/signin")
        }
    }

    return (
        <button
        onClick={handleLogout}
        className="flex flex-row items-center justify-center gap-1 bg-white rounded-lg p-2 shadow-md hover:shadow-black hover:bg-yellow-100 transition-all w-full"
        >
        <FaSignOutAlt className="text-black-300 text-xl" />
        <span className="text-[#4B2E1E] text-xs italic hidden md:block ml-2">
            Logout
        </span>
        </button>
    )
}

