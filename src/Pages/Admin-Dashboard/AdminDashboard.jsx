import { useEffect, useState } from "react";
import UseUsers from "../../Hooks/UseUsers";
import UseLoggedUser from "../../Hooks/UseLoggedUser";
import { MdOutlineClass } from "react-icons/md";
import { Link } from "react-router-dom";
import UseCourses from './../../Hooks/UseCourses';
import { LuUsers2 } from "react-icons/lu";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaUsersRectangle } from "react-icons/fa6";

const AdminDashboard = () => {

    const {userData, userDataLoading, refetchUserData} = UseLoggedUser();
    const { allCourses } = UseCourses();
    const { allUser } = UseUsers();
    const [students, setStudents] = useState([]);
    const [admin, setAdmin] = useState([]);

    useEffect(() => {
        setStudents(allUser.filter(user => user.Enrolled.length > 0 && user.role == "student"))
        setAdmin(allUser.filter(user => user.role == "admin"))
    }, [allUser])

    console.log(allUser)
    console.log(students)
    console.log(admin)

    return (
        <div className="mt-10">
             <div className="flex flex-col mb-3 text-center   md:text-start md:flex-row items-center">
                <div className="w-28 ">
                    <img
                        className="rounded-full w-full"
                        alt="User Image"
                        src={userData?.photoURL} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-prime">{userData?.displayName} <span className="text-black text-sm">(admin)</span></h1>
                    <h1 className="text-lg font-semibold text-main">{userData?.email}</h1>
                </div>
            </div>
            <hr style={{ border: 'none', height: '3px', backgroundColor: 'black' }} />
            <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 w-11/12 mx-auto">
                <div className="card border-main  border-2 bg-base-100 lg:w-96 shadow-xl h-56 mt-3">
                    <div className="card-body flex-col items-center justify-around">
                        < MdOutlineClass  className="text-5xl text-prime"/>
                        <h2 className="text-2xl font-bold">{allCourses.length}</h2>
                        <h2 className="card-title hover:text-prime"><Link to={`/admin-dashboard/manage-courses`}>Available Courses</Link></h2>
                        <Link to={`/admin-dashboard/add-courses`}><button className="bg-prime text-white font-semibold flex items-center gap-2 p-2 rounded-lg mt-2"><IoIosAddCircleOutline className="text-xl"/>Add Courses</button></Link>
                    </div>
                </div>
                <div className="card border-main  border-2 bg-base-100 lg:w-96 shadow-xl h-56 mt-3">
                    <div className="card-body flex-col items-center justify-around">
                        <LuUsers2  className="text-5xl text-prime"/>
                        <h2 className="text-2xl font-bold">{students.length}</h2>
                        <h2 className="card-title hover:text-prime"><Link to={`/admin-dashboard/manage-users`}>Enrolled Students</Link></h2>
                    </div>
                </div>
                <div className="card border-main  border-2 bg-base-100 lg:w-96 shadow-xl h-56 mt-3">
                    <div className="card-body flex-col items-center justify-around">
                        <FaUsersRectangle  className="text-5xl text-prime"/>
                        <h2 className="text-2xl font-bold">{allUser.length}</h2>
                        <h2 className="card-title hover:text-prime"><Link to={`/admin-dashboard/manage-users`}>Registered Users</Link></h2>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;