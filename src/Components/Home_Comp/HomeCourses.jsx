import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const HomeCourses = () => {
    const [courses, setCourses] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/all-courses')
            .then(res => res.json())
            .then(data => setCourses(data));
    }, []);

    function discountCounter(price, disc) {
        const discount = parseFloat(disc) / 100;

        const takaSaved = price * discount;

        const takaNow = price - takaSaved;

        return takaNow;



    }


    if (courses.length > 0) {
        return (
            <div className="my-16 ">
                <div className="w-11/12 mx-auto text-center">
                    <h1 className="text-2xl font-bold mb-2">Welcome to Our Course Platform</h1>
                    <p className="text-lg font-semibold">
                        Discover a wide range of courses designed to help you achieve your personal and professional goals.
                    </p>
                </div>
                <div className="hero my-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 w-11/12 mx-auto">
                        {
                            courses.map(course =>
                                <div key={course._id} className="card rounded-lg  border-main border-2   bg-base-100 shadow-xl ">
                                    <div>
                                        <figure>
                                            <video
                                                className=''
                                                controls
                                                controlsList="nodownload"
                                                src={`http://localhost:5000${course.trailer}`}
                                                type="video/mp4"
                                                alt="Album" />
                                        </figure>
                                    </div>
                                    <div className="flex flex-col flex-grow mt-3 justify-between">
                                        <div className="mx-1 flex flex-col gap-2">
                                            <Link to={`/courses/${course._id}`}>
                                                <h2 className="text-main hover:text-prime text-lg font-bold">{course.title}</h2></Link>
                                            <h2 className="text-main text-lg font-semibold">{course.trainer}</h2>
                                            <p className="">{course.short_description}</p>
                                        </div>
                                        <div className="card-actions w-full   my-3 text-center">
                                            <p className="mb-1 text-lg mx-auto text-prime font-semibold">
                                                {course.discount} Disc <span style={{ "textDecoration": "line-through", }} className="">{course.price} Tk</span></p>
                                            <Link className="w-full" to={`/courses/${course._id}`}>
                                                <button className="text-center rounded-lg flex justify-center bg-main text-white p-2 gap-2 w-11/12 mx-auto  items-center font-semibold text-xl"><FaShoppingCart className="font-bold text-2xl" />Buy <span>{discountCounter(course.price, course.discount)} Tk</span></button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className="my-16 text-center">
                <div className=" w-11/12  mx-auto text-center">
                    <h1 className="text-2xl font-bold mb-2">Welcome to Our Course Platform</h1>
                    <div className="card my-5 mx-auto bg-neutral text-neutral-content w-96">
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">No Courses Available At the moment</h2>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default HomeCourses;