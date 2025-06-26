import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../../store/useUserStore";

export const PublicRoute = () => {
    const { user, loading } = useUserStore();

    if (loading) return null; // Or <Loading />

    if (user && !user._id.startsWith("guest-")) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};
