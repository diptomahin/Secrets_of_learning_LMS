import { useEffect, useState } from "react";
import UseLoggedUser from "../../Hooks/UseLoggedUser";
import { toast } from "react-hot-toast";
import useAxios from "../../Hooks/UseAxios";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
    const axiosPublic = useAxios();
    const navigate = useNavigate();
    const { userData, userDataLoading, refetchUserData } = UseLoggedUser();
    const [formData, setFormData] = useState({
        displayName: userData?.displayName || '',
        phone: userData?.phone || '',
        address: userData?.address || '',
        photoURL: userData?.photoURL || '',
    });


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        axiosPublic.put(`http://localhost:5000/all-users/${userData._id}`, formData)
        .then(res => {
            if (res.data.modifiedCount>0) {
                console.log('user info updated to the database')
                toast.success("Profile updated successfully!")
                navigate('/student-dashboard/update-profile/:id');
            }
        })
        .catch((error) => {
            console.log(error.message)
        })
        // try {
        //     const response = await axiosPublic.put(`http://localhost:5000/all-users/${userData._id}`, formData);
        //     if (response.data.modifiedCount > 0) {
        //         toast.success("Profile updated successfully!");
        //         refetchUserData(); // Refresh user data
        //     } else {
        //         toast.error("No changes detected.");
        //     }
        // } catch (error) {
        //     toast.error("An error occurred while updating the profile.");
        //     console.error(error);
        // }
    };

    if (userDataLoading) {
        return <div className="pt-20 text-center text-gray-600">Loading...</div>;
    }

    return (
        <div className="pt-20">
            <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold text-prime mb-4">Update Profile</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            name="displayName"
                            value={formData.displayName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Phone</label>
                        <input
                            type="number"
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
                            className="px-6 py-2 bg-prime text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
