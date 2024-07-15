import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";

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
        <div className="my-10">
            <h1 className="w-11/12 mx-auto text-center text-2xl font-bold py-3 hover:bg-prime hover:text-white  border-2 border-prime">Explore Our Courses</h1>
            <div className="hero  min-h-screen my-10">
                <div className="grid grid-cols-1 mid:grid-cols-2 lg:grid-cols-4 gap-10 w-11/12 mx-auto">
                    {
                        courses.map(course =>
                            <div key={course.id} className="card rounded-lg  bg-base-100 shadow-xl ">
                            <div>
                            <iframe className="rounded-lg w-full"  height="315" src="https://www.youtube.com/embed/SlYcqjhoGzM?si=FTaWxa7xKnr_5JyJ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" ></iframe>
                            </div>
                                <div className="card-body my-3">
                                    <h2 className="text-main hover:text-prime text-xl font-semibold">{course.title}</h2>
                                    <h2 className="text-main text-lg font-semibold">{course.trainer}</h2>
                                    <p className="text-lg">{course.description.slice(0,70)}</p>
                                    <div className="card-actions w-full  my-3 text-center">
                                        <p className="mb-2 text-xl text-prime font-semibold">{course.discount} Disc <span style={{"text-decoration": "line-through",}} className="">{course.price} Tk</span></p>
                                        <button className="text-center rounded-lg flex justify-center bg-main text-white p-2 gap-2 w-full  items-center font-semibold text-xl"><FaShoppingCart className="font-bold text-2xl"/>Buy <span>{discountCounter(course.price, course.discount)} Tk</span></button>
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