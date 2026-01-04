"use client"

import { RequireGuest } from "@/components/auth/RequireGuest"

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <RequireGuest>{children}</RequireGuest>
}
