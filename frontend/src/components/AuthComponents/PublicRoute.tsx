import axios from "axios";
import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { Loading } from "../Common/Loading";

export const PublicRoute = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const backend_url = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const verify = async () => {
            try {
                const response = await axios.get(`${backend_url}/user/verify`, {
                    withCredentials: true,
                });

                setIsAuthenticated(response.status === 200);
            } catch (error) {
                setIsAuthenticated(false);
            } finally {
                setIsChecked(true);
            }
        };

        verify();
    }, [backend_url]);

    if (!isChecked) {
        return <Loading />;
    }

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};
