"use client"

import { LogoutButton } from "@/components/auth/LogoutButton"
import { useAuthStore } from "@/store/auth.store"

export default function ProfilePage() {
    const user = useAuthStore((s) => s.user)

    if (!user) {
        return <div>Loading profile...</div>
    }

    return (
        <div>
        <h1>Profile Page</h1>

        <div>
            <p>
            <strong>Username:</strong> {user.username}
            </p>

            <p>
            <strong>Email:</strong> {user.email}
            </p>

            <p>
            <strong>Auth Provider:</strong> {user.authProvider}
            </p>

            {user.profilePhoto && (
            <img
                src={user.profilePhoto}
                alt="Profile photo"
                width={120}
                height={120}
            />
            )}
        </div>
        <div>
            <LogoutButton/>
        </div>
        </div>
    )
}
