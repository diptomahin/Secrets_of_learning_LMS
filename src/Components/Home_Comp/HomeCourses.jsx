import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const HomeCourses = () => {
    const [courses, setCourses] = useState([])
    useEffect(() => {
        fetch('/courses.json')
            .then(res => res.json())
            .then(data => setCourses(data));
    }, []);

    function discountCounter (price, disc){
      const discount= parseFloat(disc)/100;

      const takaSaved = price*discount;

      const takaNow = price-takaSaved;

      return takaNow;

   

    }

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
                            <div key={course.id} className="card rounded-lg  border-main border-2   bg-base-100 shadow-xl ">
                            <div>
                            <iframe className="rounded-lg w-full"  src="https://www.youtube.com/embed/SlYcqjhoGzM?si=FTaWxa7xKnr_5JyJ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" ></iframe>
                            </div>
                                <div className="flex flex-col flex-grow mt-3 justify-between">
                                    <div className="mx-1 flex flex-col gap-2">
                                    <Link to={`/courses/${course.id}`}>
                                    <h2 className="text-main hover:text-prime text-lg font-bold">{course.title}</h2></Link>
                                    <h2 className="text-main text-lg font-semibold">{course.trainer}</h2>
                                    <p className="">{course.description.slice(0,70)}</p>
                                    </div>
                                    <div className="card-actions w-full   my-3 text-center">
                                        <p className="mb-1 text-lg mx-auto text-prime font-semibold">
                                            {course.discount} Disc <span style={{"text-decoration": "line-through",}} className="">{course.price} Tk</span></p>
                                        <Link className="w-full" to={`/courses/${course.id}`}>
                                        <button className="text-center rounded-lg flex justify-center bg-main text-white p-2 gap-2 w-11/12 mx-auto  items-center font-semibold text-xl"><FaShoppingCart className="font-bold text-2xl"/>Buy <span>{discountCounter(course.price, course.discount)} Tk</span></button>
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
};

export default HomeCourses;