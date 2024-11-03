import {  useEffect, useState } from "react";
import { GiClassicalKnowledge } from "react-icons/gi";
import { MdOutlineClass } from "react-icons/md";
import { Link } from "react-router-dom";
import UseLoggedUser from "../../Hooks/UseLoggedUser";
const StudentDashboard = () => {

    const {userData, userDataLoading, refetchUserData} = UseLoggedUser();
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        fetch('https://api.ishaan.website/all-courses')
            .then(res => res.json())
            .then(data => setCourses(data));
    }, []);

    return (
        <div className="mt-20">
            <div className="flex flex-col mb-3 text-center   md:text-start md:flex-row items-center">
                <div className="w-32 ">
                    <img
                        className="rounded-full w-full"
                        alt="User Image"
                        src={userData?.photoURL} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-prime">{userData?.displayName}</h1>
                    <h1 className="text-lg font-semibold text-main">{userData?.email}</h1>
                </div>
            </div>
            <hr style={{ border: 'none', height: '3px', backgroundColor: 'black' }} />
            <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 w-11/12 mx-auto">
                <div className="card border-main  border-2 bg-base-100 lg:w-96 shadow-xl h-56 mt-3">
                    <div className="card-body flex-col items-center justify-around">
                        <GiClassicalKnowledge  className="text-5xl text-prime"/>
                        <h2 className="text-2xl font-bold">{userData?.Enrolled?.length}</h2>
                        <h2 className="card-title hover:text-prime"><Link to={`/student-dashboard/my-courses`}>Enrolled Courses</Link></h2>
                    </div>
                </div>
                <div className="card border-main  border-2 bg-base-100 lg:w-96 shadow-xl h-56 mt-3">
                    <div className="card-body flex-col items-center justify-around">
                        < MdOutlineClass  className="text-5xl text-prime"/>
                        <h2 className="text-2xl font-bold">{courses.length}</h2>
                        <h2 className="card-title hover:text-prime"><Link to={`/courses`}>Available Courses</Link></h2>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default StudentDashboard;