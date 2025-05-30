import axios from "axios";
import { Navigate, Outlet } from "react-router-dom";
import { useState,useEffect } from "react";


export const PublicRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const backend_url = import.meta.env.VITE_BACKEND_URL;


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
                setIsAuthenticated(false);
            }
        };

        verify();
    }, [backend_url]);


    if(isAuthenticated === null){
        return <div>Loading....</div>
    }

    if(isAuthenticated){
        return <Navigate to={'/'} replace/>
    }

    return <Outlet />;
}