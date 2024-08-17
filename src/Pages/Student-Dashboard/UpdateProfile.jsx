import { useState } from "react";
import UseLoggedUser from "../../Hooks/UseLoggedUser";
import axios from "axios";
import { toast } from "react-hot-toast";

const UpdateProfile = () => {
    const { userData, userDataLoading, refetchUserData } = UseLoggedUser();
    const [formData, setFormData] = useState({
        displayName: userData?.displayName || '',
        email: userData?.email || '',
        phone: userData?.phone || '',
        address: userData?.address || ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/all-users/${userData._id}`, formData);
            if (response.data.modifiedCount > 0) {
                toast.success("Profile updated successfully!");
                refetchUserData(); // Refresh user data
            } else {
                toast.error("No changes detected.");
            }
        } catch (error) {
            toast.error("An error occurred while updating the profile.");
            console.error(error);
        }
    };

    if (userDataLoading) {
        return <div className="pt-20 text-center text-gray-600">Loading...</div>;
    }

    return (
        <div className="pt-20">
            <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Update Profile</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Display Name</label>
                        <input
                            type="text"
                            name="displayName"
                            value={formData.displayName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="text-right">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Update Profile
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfile;
