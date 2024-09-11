import React from 'react';
import UseCourses from '../../Hooks/UseCourses';
import UseUsers from '../../Hooks/UseUsers';
import { Link } from 'react-router-dom';
import { FaRegEdit, FaShoppingCart } from 'react-icons/fa';

const ManageCourses = () => {

    const { allCourses } = UseCourses();
    const { allUser } = UseUsers();

    function discountCounter (price, disc){
        const discount= parseFloat(disc)/100;
  
        const takaSaved = price*discount;
  
        const takaNow = price-takaSaved;
  
        return takaNow;
  
     
  
      }

    return (
        <div className='mt-10'>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 w-11/12 mx-auto">
                {
                    allCourses.map(course =>
                        <div key={course._id} className="card rounded-lg  border-main border-2   bg-base-100 shadow-xl ">
                        <div>
                        <iframe className="rounded-lg w-full"  src="https://www.youtube.com/embed/SlYcqjhoGzM?si=FTaWxa7xKnr_5JyJ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" ></iframe>
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
                                        {course.discount} Disc <span style={{"text-decoration": "line-through",}} className="">{course.price} Tk</span></p>
                                    <p className="mb-1 text-lg mx-auto text-prime font-semibold">
                                        Buying Price {discountCounter(course.price, course.discount)} Tk
                                       </p>
                                    <Link className="w-full" to={`/admin-dashboard/update-courses/${course._id}`}>
                                    <button className="text-center rounded-lg flex justify-center bg-main text-white p-2 gap-2 w-11/12 mx-auto  items-center font-semibold text-xl"><FaRegEdit className="font-bold text-2xl"/>Edit Course</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default ManageCourses;