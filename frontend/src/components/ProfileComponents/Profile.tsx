import { useState } from "react";
import profile from "../../assets/default_profile.png";

interface ProfileInputs {
    imageUrl: string;
    username: string;
    firstName: string;
    lastName: string;
    age: number;
    gender: string;
}

export const Profile = ({
    imageUrl,
    username,
    firstName,
    lastName,
    age,
    gender,
}: ProfileInputs) => {
    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState<ProfileInputs>({
        imageUrl,
        username,
        firstName,
        lastName,
        age,
        gender,
    });

    const handleChange = (field: keyof ProfileInputs, value: string | number) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsEditing(false);
        console.log("Updated profile:", formData);
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-yellow-200 to-yellow-100">
            <div className="p-6 max-w-md w-full bg-white rounded-xl shadow-xl shadow-black space-y-4">
                <div className="flex flex-col items-center">
                    <img
                        src={formData.imageUrl || profile}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover border border-gray-300"
                    />
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
                        { label: "First Name", key: "firstName" },
                        { label: "Last Name", key: "lastName" },
                        { label: "Age", key: "age" },
                        { label: "Gender", key: "gender" },
                    ].map(({ label, key }) => (
                        <div key={key}>
                            <label className="block text-sm font-medium text-gray-700">{label}:</label>
                            {isEditing ? (
                                key === "gender" ? (
                                    <select
                                        value={formData.gender}
                                        onChange={(e) => handleChange("gender", e.target.value)}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                ) : (
                                    <input
                                        type={key === "age" ? "number" : "text"}
                                        value={formData[key as keyof ProfileInputs]}
                                        onChange={(e) =>
                                            handleChange(
                                                key as keyof ProfileInputs,
                                                key === "age" ? parseInt(e.target.value) : e.target.value
                                            )
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
