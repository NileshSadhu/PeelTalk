import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useUserStore } from "../../store/useUserStore";

export const PublicRoute = () => {
    const { user, loading } = useUserStore();
    const location = useLocation();

    if (loading) return null;

    const isAuthRoute = ["/signIn", "/signUp", "/forgotpassword", "/resetpassword", "/verification"].includes(location.pathname);

    if (user && !user._id.startsWith("guest-") && isAuthRoute) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};
