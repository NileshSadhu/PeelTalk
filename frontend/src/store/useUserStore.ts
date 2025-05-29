import { create } from 'zustand';
import axios from 'axios';



interface User {
    name: string | null,
    email: string,
    username: string,
    password: string
}

const backend_api = import.meta.env.VITE_BACKEND_URL;

const useUserStore = create((set) => ({
    user: null,
    loading: true,

    setUser: (user:User) => set({ user, loading: false }),
    clearUser: () => set({ user: null, loading: false }),

    fetchUser: async () => {
        try{
            const res = await axios.get(`${backend_api}/user/userDetails`,{
                withCredentials: true
            })
            set({ user: res.data.user, loading: false })
        }catch(error){
            console.error('Error fetching user:', error);
            set({ user: null, loading: false });
        }
    }
}));

export default useUserStore;
