"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/auth.store"

export const RequireAuth = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()
    const user = useAuthStore((s) => s.user)

    useEffect(() => {
        if (!user) {
        router.replace("/auth")
        }
    }, [user, router])

    if (!user) return null

    return <>{children}</>
}
