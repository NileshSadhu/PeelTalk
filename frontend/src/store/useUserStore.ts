import { create } from 'zustand';
import axios from 'axios';
import type { user, UserStoreState } from '../types/user';

const backend_api = import.meta.env.VITE_BACKEND_URL;

export const useUserStore = create<UserStoreState>((set) => ({
    user: null,
    loading: true,
    fetchUser: async () => {
        try {
            const res = await axios.get(`${backend_api}/user/userDetails`, {
                withCredentials: true
            });
            set({ user: res.data.user, loading: false });
        } catch (error) {
            console.error('Error fetching user:', error);
            set({ user: null, loading: false });
        }
    }
}));


