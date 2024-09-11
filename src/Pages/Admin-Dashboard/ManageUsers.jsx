import React, { useEffect, useState } from 'react';
import UseCourses from '../../Hooks/UseCourses';
import UseUsers from '../../Hooks/UseUsers';
import { Link } from 'react-router-dom';

const ManageUsers = () => {

    const { allCourses } = UseCourses();
    const { allUser } = UseUsers();
    const [students, setStudents] = useState([]);
    const [admin, setAdmin] = useState([]);
    const [Enrolled, setEnrolled] = useState([]);

    useEffect(() => {
        setStudents(allUser.filter(user => user.Enrolled.length > 0 && user.role == "student"))
        setAdmin(allUser.filter(user => user.role == "admin"))
    }, [allUser])

    const handleEnrolled = (enrolled) => {
        const Filter = (allCourses.filter(course => enrolled.some(enrolledCourse => enrolledCourse.courseId === course._id)))

        setEnrolled(Filter);

        return Filter;

    }

    return (
        <div className='mt-10'>
            <div className='my-3'>
                <h1 className='text-2xl font-bold text-prime'>Manage Users</h1>
                {/* <details className="dropdown">
                    <summary className="btn m-1">Sort</summary>
                    <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                        <li onClick={setDisplayUsers(allUser)}><a>All Users</a></li>
                        <li onClick={setDisplayUsers(students)}><a>Students</a></li>
                        <li onClick={setDisplayUsers(admin)}><a>Admin</a></li>
                    </ul>
                </details> */}
            </div>
            <hr style={{ border: 'none', height: '3px', backgroundColor: 'black' }} />
            <div className='grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-5 my-5'>
                {
                    allUser.map(user => <div key={user._id} className="card bg-base-100 w-60 shadow-xl border-2 border-main">
                        <div className="avatar mt-1">
                            <div className="w-24 rounded-xl mx-auto border-2 border-main">
                                <img src={user?.photoURL} />
                            </div>
                        </div>
                        <div className="card-body">
                            <h2 className="card-title">{user.displayName}</h2>
                            <p><strong>Role: </strong> <span>{user.role}</span></p>
                            <div className=" flex flex-row gap-2 ">
                                <button onClick={() => document.getElementById('my_modal_1').showModal()} className="btn bg-prime text-white">Details</button>
                                <dialog id="my_modal_1" className="modal">
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
                                                        <iframe className="rounded-lg w-2/5"  src="https://www.youtube.com/embed/SlYcqjhoGzM?si=FTaWxa7xKnr_5JyJ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" ></iframe>
                                                        <div className="card-body">
                                                            <Link to={`/courses/${course._id}`}>
                                                            <h2 className="card-title hover:text-prime">{course.title}</h2></Link>
                                                            <p>{course.short_description}</p>
                                                        </div>
                                                    </div>
                                                )
                                                :
                                                <div>
                                                    <span className="loading loading-spinner text-primary"></span>
                                                    <span className="loading loading-spinner text-secondary"></span>
                                                    <span className="loading loading-spinner text-accent"></span>
                                                    <span className="loading loading-spinner text-neutral"></span>
                                                    <span className="loading loading-spinner text-info"></span>
                                                    <span className="loading loading-spinner text-success"></span>
                                                    <span className="loading loading-spinner text-warning"></span>
                                                    <span className="loading loading-spinner text-error"></span>
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