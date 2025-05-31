import { create } from 'zustand';
import axios from 'axios';

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
    fetchUser: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    loading: true,

    setUser: (user) => set({ user, loading: false }),
    clearUser: () => set({ user: null, loading: false }),

    fetchUser: async () => {
        try {
        const res = await axios.get<{ user: User }>(`${backend_api}/user/userDetails`, {
            withCredentials: true,
        });
        set({ user: res.data.user, loading: false });
        } catch (err) {
        console.error('Error fetching user:', err);
        set({ user: null, loading: false });
        }
    },
}));


