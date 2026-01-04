import { create } from "zustand"
import { persist } from "zustand/middleware"

type User = {
    id: string
    username: string
    email: string
    profilePhoto?: string | null,
    authProvider: "local" | "google"
}

type AuthState = {
    user: User | null
    isAuthenticated: boolean

    setAuth: (user: User) => void
    clearAuth: () => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
        user: null,
        isAuthenticated: false,

        setAuth: (user) =>
            set({
            user,
            isAuthenticated: true,
            }),

        clearAuth: () =>
            set({
            user: null,
            isAuthenticated: false,
            }),
        }),
        {
        name: "auth-storage",
        partialize: (state) => ({
            user: state.user,
        }),
        }
    )
)
