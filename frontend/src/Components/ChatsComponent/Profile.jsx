import useUserStore from '../../store/useUserStore';
import profile from '../assets/Nilesh_logo.jpeg';
import { useEffect } from 'react';



function Profile() {
    const { user, loading, fetchUser } = useUserStore();

    useEffect(() => {
        fetchUser();
    }, []);

    if (loading) {
        return (
        <div className="flex items-center justify-center h-screen bg-yellow-100">
            <p>Loading profile...</p>
        </div>
        );
    }

    if (!user) {
        return (
        <div className="flex items-center justify-center h-screen bg-yellow-100">
            <p>User not found</p>
        </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-yellow-100">
            <div className="flex flex-col items-center justify-center bg-white rounded-lg p-4">
                <img src={user.profilePhoto || profile} alt="Profile" className="w-40 h-40 rounded-full m-2" />
                <h1 className="balsamiq-sans-regular my-2">{user.username}</h1>
                <p className="balsamiq-sans-regular my-2">Email: {user.email}</p>
                <p className="balsamiq-sans-regular my-2">Phone: {user.phone}</p>
            </div>
        </div>
    );
}

export default Profile;
