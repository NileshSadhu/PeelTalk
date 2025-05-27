import axios from 'axios';
import profile from '../assets/Nilesh_logo.jpeg';
import { useEffect, useState } from 'react';



function Profile() {

    const [user,setUser] = useState();

    const backend_api = import.meta.env.VITE_BACKEND_URL; 

    useEffect(()=>{
        const fetchUserDetails = async()=>{
            try{
            const response = await axios.get(`${backend_api}/user/userDetails`,{
                withCredentials: true
            })
            
            if(response.status === 200){
                console.log(response.data.user)
                setUser(response.data.user)
            }
        }catch(error){
            toast.error("Something went wrong. Please try again.");
        }
    }

    fetchUserDetails();
    },[])

    if (!user) {
        return (
            <div className="flex items-center justify-center h-screen bg-yellow-100">
                <p>Loading profile...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-yellow-100">
            <div className="flex flex-col items-center justify-center bg-white rounded-lg p-4">
                <img src={profile} alt="Profile" className="w-40 h-40 rounded-full m-2" />
                <h1 className="balsamiq-sans-regular my-2">{user.username}</h1>
                <p className="balsamiq-sans-regular my-2">Email: {user.email}</p>
                <p className="balsamiq-sans-regular my-2">Phone: {user.phone}</p>
            </div>
        </div>
    );
}

export default Profile;
