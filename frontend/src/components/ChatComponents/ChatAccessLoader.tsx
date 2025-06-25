import { useEffect } from "react";
import { useUserStore } from "../../store/useUserStore";
import { Loading } from "../Common/Loading";

export const ChatAccessLoader = ({ children }: { children: React.ReactNode }) => {
    const { fetchUser, loading } = useUserStore();

    useEffect(() => {
        fetchUser(); 
    }, [fetchUser]);

    if (loading) return <Loading />;
    return <>{children}</>;
};
