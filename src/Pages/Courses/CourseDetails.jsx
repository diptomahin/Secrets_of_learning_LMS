import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PiStudentBold } from "react-icons/pi";
import { AiOutlineLike } from "react-icons/ai";
import { MdOutlineRateReview } from "react-icons/md";
import { GoFileSubmodule } from "react-icons/go";
import { FaShoppingCart } from "react-icons/fa";
const CourseDetails = () => {

    const { _id } = useParams();


    const [course, setCourse] = useState();
    useEffect(() => {
        fetch('http://localhost:5000/all-courses')
            .then(res => res.json())
            .then(data => setCourse(data.find(course => course.id == _id)));
    }, [_id]);



    function discountCounter(price, disc) {
        const discount = parseFloat(disc) / 100;

        const takaSaved = price * discount;

        const takaNow = price - takaSaved;

        return takaNow;



    }

    if (course) {
        return (
            <div className="py-20 w-11/12 mx-auto  gap-3">
                <div className="w-full flex flex-col lg:flex-row gap-5">
                    <div className="w-full lg:w-3/5 flex flex-col gap-5">
                        <h1 className="text-2xl font-bold text-main">{course.title}</h1>
                        <p className="text-lg text-main">A course by <span className="text-xl font-semibold">{course.trainer}</span></p>
                        <iframe className="rounded-lg w-full h-[400px]" src="https://www.youtube.com/embed/SlYcqjhoGzM?si=FTaWxa7xKnr_5JyJ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" ></iframe>
                        <p className="text-lg flex flex-col gap-2 text-main"><span className="text-xl font-semibold">Description:</span>{course.description}</p>
                        <div className="flex border-main bg-base-200 p-7 text-2xl my-5 font-semibold rounded-lg justify-around w-3/5 lg:w-1/2 mx-auto">
                            <p className="flex items-center gap-2"><PiStudentBold /> {course.students}</p>
                            <p className="flex items-center gap-2"><MdOutlineRateReview /> {course.reviews}</p>
                            <p className="flex items-center gap-2"><AiOutlineLike /> {course.positive_ratings}</p>
                        </div>
                    </div>
                    <div className=" w-full lg:w-2/5">
                        <div className="card bg-main text-white mt-24">
                            <div className="card-body">
                                <p>
                                    Enjoy this course and {course.students} others unlimitedly.
                                </p>
                                <hr />
                                <h2 className="text-center text-2xl font-bold"> <span>{discountCounter(course.price, course.discount)} Tk</span></h2>
                                <p className="mb-1 text-lg mx-auto text-prime font-semibold">
                                    {course.discount} Disc <span style={{ "text-decoration": "line-through", }} className="">{course.price} Tk</span></p>
                                <div className="card-actions justify-end">
                                    <button className="btn text-center rounded-lg flex justify-center bg-white text-prime p-2 gap-2 w-11/12 mx-auto  items-center font-semibold text-xl"><FaShoppingCart className="font-bold text-2xl" />Buy</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto w-full lg:w-3/5 mt-7">
                    <table className="table">
                        <h1 className="text-xl font-semibold mb-2">Course Module :</h1>
                        <hr className="mb-3" />
                        <tbody>
                            {/* row 1 */}
                            {course.modules.map(topic =>
                                <tr key={topic} className="bg-base-200">
                                    <td className="border-main border-2 text-lg flex gap-5 items-center my-1"><GoFileSubmodule /> {topic}</td>
                                </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
    else {
        return (
            <div>
                <span className="loading loading-ring loading-lg"></span>
            </div>
        )
    }
};

export default CourseDetails;