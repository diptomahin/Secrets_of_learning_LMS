import { useEffect, useState } from "react";

const HomeCourses = () => {
    const [courses, setCourses] = useState([])
    useEffect(() => {
        fetch('/courses.json')
            .then(res => res.json())
            .then(data => setCourses(data));
    }, []);


    return (
        <div className="my-10">
            <h1 className="w-11/12 mx-auto text-center text-2xl font-bold py-3 hover:bg-prime hover:text-white  border-2 border-prime">Explore Our Courses</h1>
            <div className="hero  min-h-screen my-10">
                <div className="grid grid-cols-1 mid:grid-cols-2 lg:grid-cols-4 gap-10 w-11/12 mx-auto">
                    {
                        courses.map(course =>
                            <div key={course.id} className="card  bg-base-100 shadow-xl ">
                            <iframe width="full" height="315" src="https://www.youtube.com/embed/SlYcqjhoGzM?si=FTaWxa7xKnr_5JyJ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" ></iframe>
                                <div className="card-body my-3">
                                    <h2 className="card-title">{course.title}
                                        <div className="badge badge-secondary">NEW</div>
                                    </h2>
                                    <p className="text-lg">{course.description}</p>
                                    <div className="card-actions justify-end my-3">
                                        <button className="btn border-2 border-prime text-lg  font-semibold hover:bg-gradient-to-t from-second to-main hover:text-white">Details</button>
                                        <button className="btn border-2 border-prime text-lg  font-semibold hover:bg-gradient-to-t from-second to-main hover:text-white">Enroll</button>
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