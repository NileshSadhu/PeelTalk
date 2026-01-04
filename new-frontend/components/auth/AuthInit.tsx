"use client"

import { useEffect } from "react"
import axios from "axios"
import { useAuthStore } from "@/store/auth.store"

export function AuthInit() {
    const setAuth = useAuthStore((s) => s.setAuth)
    const clearAuth = useAuthStore((s) => s.clearAuth)

    useEffect(() => {
        const initAuth = async () => {
        try {
            const res = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/verify`,
            { withCredentials: true }
            )

            setAuth(res.data.user)
        } catch {
            clearAuth()
        }
        }

        initAuth()
    }, [])

    return null
}
