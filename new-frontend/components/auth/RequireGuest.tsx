"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/auth.store"

export const RequireGuest = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()
    const user = useAuthStore((s) => s.user)

    useEffect(() => {
        
        if (user) {
        router.replace("/chat")
        }
    }, [user, router])

    if (user) return null

    return <>{children}</>
}
