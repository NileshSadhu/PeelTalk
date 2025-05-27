import profile from '../assets/Nilesh_logo.jpeg';

function ProfilePage({ username, email, phone, address, city, state, zip }) {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-yellow-100">
            <div className="flex flex-col items-center justify-center bg-white rounded-lg p-4">
                <img src={profile} alt="Profile" className="w-40 h-40 rounded-full m-2" />
                <h1 className="balsamiq-sans-regular my-2">{username}</h1>
                <p className="balsamiq-sans-regular my-2">Email: {email}</p>
                <p className="balsamiq-sans-regular my-2">Phone: {phone}</p>
                <p className="balsamiq-sans-regular my-2">Address: {address}</p>
                <p className="balsamiq-sans-regular my-2">City: {city}</p>
                <p className="balsamiq-sans-regular my-2">State: {state}</p>
                <p className="balsamiq-sans-regular my-2">Zip: {zip}</p>
            </div>
        </div>
    );
}

export default ProfilePage;
