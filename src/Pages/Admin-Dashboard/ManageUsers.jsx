import React, { useEffect, useState } from 'react';
import UseCourses from '../../Hooks/UseCourses';
import UseUsers from '../../Hooks/UseUsers';
import { Link, useNavigate } from 'react-router-dom';
import UseLiveCourses from '../../Hooks/UseLivecourses';
import toast from 'react-hot-toast';
import axios from 'axios'; // Ensure axios is imported
const ManageUsers = () => {
    const navigate = useNavigate();
    const { allCourses } = UseCourses();
    const { liveCourses } = UseLiveCourses();
    const { allUser, refetchAllUserData } = UseUsers();
    const [students, setStudents] = useState([]);
    const [admin, setAdmin] = useState([]);
    const [Enrolled, setEnrolled] = useState([]);
    const [live, setLive] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState(allUser); // State to hold filtered users


    useEffect(() => {
        setStudents(allUser.filter(user => user.Enrolled.length > 0 && user.role == "student"))
        setAdmin(allUser.filter(user => user.role == "admin"))
    }, [allUser])

    useEffect(() => {
        // Filter users by email based on searchTerm
        if (searchTerm) {
            setFilteredUsers(allUser.filter(user => user.email.toLowerCase().includes(searchTerm.toLowerCase())));
        } else {
            setFilteredUsers(allUser); // Show all users if searchTerm is empty
        }
    }, [searchTerm, allUser]); // Rerun the filter when searchTerm or allUser changes

    const handleEnrolled = (enrolled) => {
        const Filter = (allCourses.filter(course => enrolled.some(enrolledCourse => enrolledCourse.courseId === course._id)))      
        setEnrolled(Filter);
        return Filter;

    }

    const handleLive = (live) => {
        const filter = (liveCourses.filter(course => live.some(enrolledCourse => enrolledCourse.courseId === course._id)))
        setLive(filter);  

    }

    //handle manual enroolment
    const handleAddCourse = (course, userId) => {

        const courseId = course._id;
        console.log(course, userId)
        axios.put(`http://82.112.227.89:5000/all-users/${userId}/live_enroll`, { courseId })
            .then(res => {
                if (res.data.result.acknowledged == true) {
                    console.log('User enrolled in the course successfully');
                    toast.success('Successfully added');
                    refetchAllUserData();
                    navigate()
                }
            })
            .catch((error) => {
                console.log(error.message)
            })

    }
    return (
        <div className='mt-10'>
            <div className='my-3'>
                <h1 className='text-2xl font-bold text-prime'>Manage Users</h1>
                 {/* Search Input */}
                 <input
                    type="text"
                    placeholder="Search by email..."
                    className="input input-bordered w-full mb-4"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <hr style={{ border: 'none', height: '3px', backgroundColor: 'black' }} />
            <div className='grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-5 my-5'>
                {
                    filteredUsers.map(user => <div key={user._id} className="card bg-base-100 w-60 shadow-xl border-2 border-main">
                        <div className="avatar mt-1">
                            <div className="w-24 rounded-xl mx-auto border-2 border-main">
                                <img src={user?.photoURL} />
                            </div>
                        </div>
                        <div className="card-body">
                            <h2 className="card-title">{user.displayName}</h2>
                            <p><strong>Role: </strong> <span>{user.role}</span></p>
                            <div className=" flex flex-row gap-2 ">
                                <button onClick={() => document.getElementById(`my_modal_${user._id}`).showModal()} className="btn bg-prime text-white">Details</button>
                                <dialog id={`my_modal_${user._id}`} className="modal">
                                    <div className="modal-box">
                                        <div className="avatar mt-1">
                                            <div className="w-24 rounded-xl mx-auto border-2 border-main">
                                                <img src={user?.photoURL} />
                                            </div>
                                        </div>
                                        <h3 className="font-bold text-lg">{user.displayName}</h3>
                                        <div className='flex flex-col gap-1'>
                                            <p className="text-main border-2  border-prime p-2 rounded-lg"><strong>Email:</strong> {user.email}</p>
                                            <p className="text-main border-2 border-prime p-2 rounded-lg"><strong>Phone:</strong> {user.phone || 'Not Provided'}</p>
                                            <p className="text-main border-2 border-prime p-2 rounded-lg"><strong>Address:</strong> {user.address || 'Not Provided'}</p>
                                            <p className="text-main border-2 border-prime p-2 rounded-lg"><strong>Username:</strong> {user.username}</p>
                                            <p className="text-main border-2 border-prime p-2 rounded-lg"><strong>Role:</strong> {user.role}</p>
                                            <p className="text-main border-2 border-prime p-2 rounded-lg"><strong>User ID:</strong> <span className="text-xs">{user.userID}</span></p>
                                            <p className="text-main border-2 border-prime p-2 rounded-lg"><strong>ID:</strong> <span className="text-xs">{user._id}</span></p>
                                            <p className="text-main border-2 border-prime p-2 rounded-lg"><strong>Password:</strong> {user.password}</p>
                                        </div>
                                        <div className="modal-action">
                                            <form method="dialog">
                                                {/* if there is a button in form, it will close the modal */}
                                                <button className="btn">Close</button>
                                            </form>
                                        </div>
                                    </div>
                                </dialog>
                                <button onClick={() => {
                                    handleEnrolled(user.Enrolled);  // First function call
                                    document.getElementById('my_modal_2').showModal();  // Second function call
                                }} className="btn btn-primary">Enrolled ({user.Enrolled.length})</button>
                                <dialog id="my_modal_2" className="modal">
                                    <div className="modal-box">
                                        <h1 className='text-lg font-semibold text-center'>Enrolled Courses</h1>
                                        <hr style={{ border: 'none', height: '2px', backgroundColor: 'black' }} />
                                        {
                                            Enrolled.length > 0 ?
                                                Enrolled.map(course =>
                                                    <div key={course._id} className="card card-side bg-base-100 shadow-xl my-3">
                                                        
                                                        <div className="card-body">
                                                            <Link to={`/courses/${course._id}`}>
                                                            <h2 className="card-title hover:text-prime">{course.title}</h2></Link>
                                                            <p>{course.short_description}</p>
                                                        </div>
                                                    </div>
                                                )
                                                :
                                                <div>
                                                    <h1>No Courses Enrolled</h1>
                                                </div>
                                        }
                                        <div className="modal-action">
                                            <form method="dialog">
                                                {/* if there is a button in form, it will close the modal */}
                                                <button className="btn">Close</button>
                                            </form>
                                        </div>
                                    </div>
                                </dialog>
                            </div>
                            <div className='flex flex-row gap-2'>
                            <button 
                            onClick={() => {
                                handleLive(user.live_enroll);  // First function call
                                document.getElementById('my_modal_3').showModal();  // Second function call
                            }}
                            className='bg-success btn'>live({user.live_enroll.length})</button>
                            <dialog id="my_modal_3" className="modal">
                                    <div className="modal-box">
                                        <h1 className='text-lg font-semibold text-center'>Enrolled Courses</h1>
                                        <hr style={{ border: 'none', height: '2px', backgroundColor: 'black' }} />
                                        {
                                            live.length > 0 ?
                                                live.map(course =>
                                                    <div key={course._id} className="card card-side bg-base-100 shadow-xl my-3">
                                                        
                                                        <div className="card-body">
                                                            <Link to={`/courses/${course._id}`}>
                                                            <h2 className="card-title hover:text-prime">{course.title}</h2></Link>
                                                            <p>{course.short_description}</p>
                                                        </div>
                                                    </div>
                                                )
                                                :
                                                <div>
                                                    <h1>No Courses Enrolled</h1>
                                                </div>
                                        }
                                        <div className="modal-action">
                                            <form method="dialog">
                                                {/* if there is a button in form, it will close the modal */}
                                                <button className="btn">Close</button>
                                            </form>
                                        </div>
                                    </div>
                                </dialog>
                            
                            <button onClick={() => {
                                    document.getElementById(`my_modal_${user.email}`).showModal();}} className='bg-main p-2 rounded text-white'>Add Live</button>

                            <dialog id={`my_modal_${user.email}`} className="modal">
                                    <div className="modal-box">
                                        <h1 className='text-lg font-semibold text-center'>Enroll To Courses</h1>
                                        <hr style={{ border: 'none', height: '2px', backgroundColor: 'black' }} />
                                        {
                                            liveCourses.length > 0 ?
                                            liveCourses.map(course =>
                                                    <div key={course._id} className="card card-side bg-base-100 shadow-xl my-3">
                                                        
                                                        <div className="card-body">
                                                            <h2 className="card-title hover:text-prime">{course.title}</h2>
                                                            <p>{course.short_description}</p>
                                                            <button onClick={() => handleAddCourse(course , user._id)} className='btn bg-success'>Add Course</button>
                                                        </div>
                                                    </div>
                                                )
                                                :
                                                <div>
                                                    <h1>No Courses Enrolled</h1>
                                                </div>
                                        }
                                        <div className="modal-action">
                                            <form method="dialog">
                                                {/* if there is a button in form, it will close the modal */}
                                                <button className="btn">Close</button>
                                            </form>
                                        </div>
                                    </div>
                                </dialog>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default ManageUsers;