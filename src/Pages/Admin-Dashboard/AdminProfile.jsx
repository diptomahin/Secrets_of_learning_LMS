import React from 'react';
import { FaEdit } from "react-icons/fa";
import UseLoggedUser from "../../Hooks/UseLoggedUser";
import { Link } from "react-router-dom";

const AdminProfile = () => {
   
    const { userData, userDataLoading, refetchUserData } = UseLoggedUser();

    if (userDataLoading) {
        return <div className="pt-20 text-center text-gray-600">Loading...</div>;
    }

    if (!userData) {
        return <div className="pt-20 text-center text-gray-600">No user data available.</div>;
    }
    
    return (
        <div className="pt-20">
        <div className="flex flex-col  items-center p-2 md:p-6 border border-prime rounded-lg w-full md:w-11/12 mx-auto shadow-lg bg-white">
            <div className="mb-4 md:mb-0 md:mr-6">
                <img
                    src={userData.photoURL}
                    alt={userData.displayName}
                    className="w-24 h-24 md:w-40 md:h-40 rounded-full object-cover border-2 border-gray-100 shadow-md"
                />
            </div>
            <div className="space-y-2">
                <h2 className="text-2xl font-bold text-prime text-center my-3">{userData.displayName}</h2>
                <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
                    <div className="flex flex-col gap-2">
                        <p className="text-main border-2  border-prime p-2 rounded-lg"><strong>Email:</strong> {userData.email}</p>
                        <p className="text-main border-2 border-prime p-2 rounded-lg"><strong>Phone:</strong> {userData.phone || 'Not Provided'}</p>
                        <p className="text-main border-2 border-prime p-2 rounded-lg"><strong>Address:</strong> {userData.address || 'Not Provided'}</p>
                        <p className="text-main border-2 border-prime p-2 rounded-lg"><strong>Username:</strong> {userData.username}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-main border-2 border-prime p-2 rounded-lg"><strong>Role:</strong> {userData.role}</p>
                        <p className="text-main border-2 border-prime p-2 rounded-lg"><strong>User ID:</strong> <span className="text-xs">{userData.userID}</span></p>
                        <p className="text-main border-2 border-prime p-2 rounded-lg"><strong>ID:</strong> <span className="text-xs">{userData._id}</span></p>
                        <p className="text-main border-2 border-prime p-2 rounded-lg"><strong>Password:</strong> {userData.password}</p>
                    </div>
                </div>
                <div className="text-center ">
                    <Link to={`/admin-dashboard/admin-profile/${userData._id}`}>
                    <button className="btn mt-5 font-semibold text-xl bg-main text-white"><FaEdit  /> Edit Profile</button></Link>
                </div>
            </div>
        </div>
    </div>
    );
};

export default AdminProfile;