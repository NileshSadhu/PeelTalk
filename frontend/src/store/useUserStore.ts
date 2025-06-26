import { create } from 'zustand';
import axios from 'axios';
import { generateGuestUsername } from '../utils/generateGuestUsername';
import { generateGuestId } from '../utils/generateGuestId';
import { getUserKeysFromIndexedDB } from '../utils/indexedDbUtils';

const backend_api = import.meta.env.VITE_BACKEND_URL;

export interface User {
    _id: string;
    firstname: string;
    lastname: string;
    username: string;
    age: string;
    gender: string;
    email: string;
    profilePhoto: string | null;
}

interface UserStore {
    user: User | null;
    loading: boolean;
    setUser: (user: User) => void;
    clearUser: () => void;
    fetchUser: () => Promise<{ redirectToSignIn: boolean }>; // ✅ Fix here
}


export const useUserStore = create<UserStore>((set) => ({
    user: null,
    loading: true,

    setUser: (user) => set({ user, loading: false }),
    clearUser: () => set({ user: null, loading: false }),


fetchUser: async (): Promise<{ redirectToSignIn: boolean }> => {
    try {
        const res = await axios.get<{ user: User }>(
            `${backend_api}/user/userDetails`,
            { withCredentials: true }
        );

        const user = res.data.user;
        const isGuest = user._id.startsWith("guest-");

        if (!isGuest) {
            const decryptedPrivateKey = localStorage.getItem("decryptedPrivateKey");
            const indexedDbKeys = await getUserKeysFromIndexedDB();

            if (!decryptedPrivateKey || !indexedDbKeys?.publicKey) {
                console.warn("Missing keys for authenticated user. Logging out...");
                await axios.post(`${backend_api}/user/logout`, {}, { withCredentials: true });
                set({ user: null, loading: false });
                return { redirectToSignIn: true }; // ✅ just return a flag
            }

        }

        set({ user, loading: false });
        return { redirectToSignIn: false };

    } catch (err: any) {
        const isUnauthorized = err?.response?.status === 401;

        if (isUnauthorized) {
            let guestUsername = localStorage.getItem("guestUsername") || generateGuestUsername();
            localStorage.setItem("guestUsername", guestUsername);

            let guestId = localStorage.getItem("guestId") || generateGuestId();
            localStorage.setItem("guestId", guestId);

            const guestUser: User = {
                _id: guestId,
                firstname: "Guest",
                lastname: "User",
                username: guestUsername,
                age: "",
                gender: "",
                email: "",
                profilePhoto: null,
            };

            set({ user: guestUser, loading: false });
            return { redirectToSignIn: false };
        } else {
            console.error("Unexpected error fetching user:", err);
            set({ user: null, loading: false });
            return { redirectToSignIn: true };
        }
    }
}


}));
