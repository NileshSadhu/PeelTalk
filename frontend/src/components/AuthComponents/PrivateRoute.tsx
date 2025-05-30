import axios from "axios";
import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { Loading } from "../Common/Loading";

export const PrivateRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    const backend_url: string = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const verify = async () => {
            try {
                const response = await axios.get(`${backend_url}/user/verify`, {
                    withCredentials: true,
                });

                if (response.status === 200) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error("Authentication verification failed:", error);
                setIsAuthenticated(false);
            }
        };

        verify();
    }, [backend_url]);

    if (isAuthenticated === null) {
        return <Loading />;
    }

    if (!isAuthenticated) {
        return <Navigate to={"/signIn"} replace />;
    }

    return <Outlet />;
};