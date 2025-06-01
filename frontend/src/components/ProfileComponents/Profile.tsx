import { useEffect, useState } from "react";
import profile from "../../assets/default_profile.png";
import { useUserStore } from "../../store/useUserStore";
import { Loading } from "../Common/Loading";
import { updateProfilePhoto, updateUser } from "../../api/auth";

export interface ProfileInputs {
    username?: string;
    firstname?: string;
    lastname?: string;
    age?: string;
    gender?: string;
}

export const Profile = () => {
    const { user, fetchUser, loading } = useUserStore();
    const [isEditing, setIsEditing] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>("");
    const [originalData, setOriginalData] = useState<ProfileInputs | null>(null);
    const [formData, setFormData] = useState<ProfileInputs>({
        username: "",
        firstname: "",
        lastname: "",
        age: "",
        gender: "",
    });
    

    useEffect(()=> {
        fetchUser();
    },[])

    useEffect(() => {
        if (user) {
        const form = {
            username: user.username || "",
            firstname: user.firstname || "",
            lastname: user.lastname || "",
            age: user.age || "",
            gender: user.gender || "",
        }
        setFormData(form);
        setOriginalData(form);
        setImageUrl(user.profilePhoto || "");
    }
    },[user])


    const handleChange = (field: keyof ProfileInputs, value: string | number) => {
        setFormData({ ...formData, [field]: value });
    };

    // handle update 
    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        setIsEditing(false);

        const hasChanges =
        JSON.stringify(formData) !== JSON.stringify(originalData);

        if (!hasChanges) {
            console.log("No changes detected. Skipping update.");
            return;
        }

        const cleanedData = Object.fromEntries(
            Object.entries(formData).filter(([_, value]) => value !== "")
        );

        await updateUser(cleanedData);
        setOriginalData(formData);
    };

    
    // image handling function
    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const result = await updateProfilePhoto(file);

        if (result?.success && result.imageUrl) {
            setImageUrl(result.imageUrl); // Only update image state
        }
    };


    // loading animation state
    if(loading){
        return (
        <div>
            <Loading/>
        </div>
        )
    }

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-yellow-200 to-yellow-100">
            <div className="p-6 max-w-md w-full bg-white rounded-xl shadow-xl shadow-black space-y-4">
                <div className="flex flex-col items-center">
                    <div className="relative">
                    {!isEditing &&(<img
                        src={imageUrl || profile}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover border border-gray-300"
                    />)}
                    {isEditing && (
                        <label htmlFor="profilePhotoUpload" className="relative cursor-pointer group">
                        <img
                            src={imageUrl || profile}
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover border border-gray-300 group-hover:opacity-70 transition"
                        />
                        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition">
                            <span className="text-white text-xs">Change Photo</span>
                        </div>
                        <input
                            type="file"
                            id="profilePhotoUpload"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                        </label>
                    )}
                    </div>
                    {!isEditing && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="mt-2 text-sm text-blue-600 hover:underline"
                        >
                            Edit Profile
                        </button>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {[
                        { label: "Username", key: "username" },
                        { label: "First Name", key: "firstname" },
                        { label: "Last Name", key: "lastname" },
                        { label: "Age", key: "age" },
                        { label: "Gender", key: "gender" },
                    ].map(({ label, key }) => (
                        <div key={key}>
                            <label className="block text-sm font-medium text-gray-700">{label}:</label>
                            {isEditing ? (
                                key === "gender" ? (
                                    <select
                                        value={formData.gender || ""}
                                        onChange={(e) => handleChange("gender", e.target.value)}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    >   
                                        <option value="" disabled>Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                ) : (
                                    <input
                                        type={key === "age" ? "number" : "text"}
                                        value={formData[key as keyof ProfileInputs]}
                                        onChange={(e) =>
                                            handleChange(key as keyof ProfileInputs, e.target.value)
                                        }
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    />
                                )
                            ) : (
                                <p className="text-gray-800">{formData[key as keyof ProfileInputs]}</p>
                            )}
                        </div>
                    ))}

                    {isEditing && (
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="text-gray-600 hover:underline"
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};
