export interface User {
    _id: string;
    email?: string;
    username?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface UserStoreState {
    user: User | null;
    loading: boolean;
    fetchUser: () => Promise<void>;
    setUser?: (user: User) => void;
    clearUser?: () => void;
} 