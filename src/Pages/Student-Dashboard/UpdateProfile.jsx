import { useEffect, useState } from "react";
import UseLoggedUser from "../../Hooks/UseLoggedUser";
import { toast } from "react-hot-toast";
import useAxios from "../../Hooks/UseAxios";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

      // Imgbb API Key
    const imgbbAPIKey = "9b00e5928e6cb63a96541485f6f339eb";

    useEffect(() => {
        if (userData) {
            setFormData({
                displayName: userData.displayName || '',
                phone: userData.phone || '',
                address: userData.address || '',
                photoURL: userData.photoURL || 'https://i.ibb.co.com/QDfSLpn/7309681.jpg',
            });
        }
    }, [userData]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('image', file);

            try {
                const response = await axios.post(`https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`, formData);
                const imageUrl = response.data.data.url;
                setFormData((prevData) => ({
                    ...prevData,
                    photoURL: imageUrl
                }));
                toast.success("Image uploaded successfully!");
            } catch (error) {
                toast.error("Image upload failed.");
                console.error(error);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        axiosPublic.put(`http://82.112.227.89:5000/all-users/${userData._id}`, formData)
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
                    <div>
                        <label className="block text-gray-700">Profile Picture</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
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
