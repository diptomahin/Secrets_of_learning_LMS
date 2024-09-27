import React, { useState } from 'react';
import UseCourses from '../../Hooks/UseCourses';
import UseUsers from '../../Hooks/UseUsers';
import { Link } from 'react-router-dom';
import { FaRegEdit, FaShoppingCart } from 'react-icons/fa';
import UseLiveCourses from '../../Hooks/UseLivecourses';

const ManageCourses = () => {

    const [filter, setFilter] = useState('recorded');
    const { allCourses } = UseCourses()
    const { liveCourses } = UseLiveCourses()
    const [displayCourses, setDisplayCourses] = useState(allCourses)


    function discountCounter(price, disc) {
        const discount = parseFloat(disc) / 100;

        const takaSaved = price * discount;

        const takaNow = price - takaSaved;

        return takaNow;



    }

    const handleChange = (e) => {
        const { value } = e.target;
        setFilter(value); // Update the filter value in state
        if (value === 'recorded') {
            setDisplayCourses(allCourses);
        } else if (value === 'live') {
            setDisplayCourses(liveCourses);
        }
    };

    if (displayCourses) {
        return (
            <div className='mt-10'>
                <div className="my-3 flex gap-3 items-center mx-auto w-11/12">
                    <label className="block text-lg font-bold">Show Courses: </label>
                    <select
                        name="filter"
                        value={filter} // Bind the select value to the filter state
                        onChange={handleChange}
                        className="mt-1 block  p-2 border border-gray-300 rounded"
                    >
                        <option value="recorded">Recorded Courses</option>
                        <option value="live">Live Courses</option>
                    </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 w-11/12 mx-auto">
                    {
                        displayCourses.map(course =>
                            <div key={course._id} className="card rounded-lg  border-main border-2   bg-base-100 shadow-xl ">
                                <div>
                                    <iframe className="rounded-lg w-full" src="https://www.youtube.com/embed/SlYcqjhoGzM?si=FTaWxa7xKnr_5JyJ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" ></iframe>
                                </div>
                                <div className="flex flex-col flex-grow mt-3 justify-between">
                                    <div className="mx-1 flex flex-col gap-2">
                                        {
                                            course.course_type ? <Link to={`/course/${course._id}`}>
                                                <h2 className="text-main hover:text-prime text-lg font-bold">{course.title}</h2></Link> : <Link to={`/courses/${course._id}`}>
                                                <h2 className="text-main hover:text-prime text-lg font-bold">{course.title}</h2></Link>
                                        }
                                        {
                                            course.course_type ? <h2 className="text-main text-lg font-semibold">{course.trainer.name}</h2>
                                                : <h2 className="text-main text-lg font-semibold">{course.trainer}</h2>
                                        }
                                        <p className="">{course.short_description}</p>
                                    </div>
                                    <div className="card-actions w-full   my-3 text-center">
                                        {
                                            course.course_type ? <div className='flex flex-col gap-2 items-center'>
                                                <Link className='w-full' to={`/admin-dashboard/live-courses/${course._id}`}>
                                                    <button className='p-2 rounded-lg bg-prime font-semibold text-xl ml-4 w-full text-white'>Enrollment</button>
                                                </Link>
                                                <Link className="w-full" to={`/admin-dashboard/update-live-courses/${course._id}`}>
                                                    <button className="w-full ml-3 text-center rounded-lg flex justify-center bg-main text-white p-2 gap-2   items-center font-semibold text-xl"><FaRegEdit className="font-bold text-2xl" />Edit Course</button>
                                                </Link>
                                            </div>
                                                : <div>                                        <p className="mb-1 text-lg mx-auto text-prime font-semibold">
                                                    {course.discount} Disc <span style={{ "text-decoration": "line-through", }} className="">{course.price} Tk</span></p>
                                                    <p className="mb-1 text-lg mx-auto text-prime font-semibold">
                                                        Buying Price {discountCounter(course.price, course.discount)} Tk
                                                    </p>
                                                    <Link className="w-full" to={`/admin-dashboard/update-courses/${course._id}`}>
                                                        <button className="text-center rounded-lg flex justify-center bg-main text-white p-2 gap-2 w-11/12 mx-auto  items-center font-semibold text-xl"><FaRegEdit className="font-bold text-2xl" />Edit Course</button>
                                                    </Link>
                                                </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
    else {
        return (
            <div className='mt-10'>
                <span className="loading loading-ball loading-lg"></span>
                <span className="loading loading-ball loading-lg"></span>
                <span className="loading loading-ball loading-lg"></span>
                <span className="loading loading-ball loading-lg"></span>
                <span className="loading loading-ball loading-lg"></span>
                <span className="loading loading-ball loading-lg"></span>
            </div>
        )
    }
};

export default ManageCourses;