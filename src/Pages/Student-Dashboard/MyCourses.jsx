import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UseLoggedUser from "../../Hooks/UseLoggedUser";
import {  MdOutlineClass } from "react-icons/md";

const MyCourses = () => {

  const { userData, userDataLoading } = UseLoggedUser();

  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    if (userData?.Enrolled && userData.Enrolled.length > 0) {
      fetch('http://localhost:5000/all-courses')
        .then(res => res.json())
        .then(data => {
          const filteredCourses = data.filter(course =>
            userData.Enrolled.some(enrolledCourse => enrolledCourse.courseId === course._id)
          );
          setEnrolledCourses(filteredCourses);
        });
    }
  }, [userData]);
  // console.log(enrolledCourses)

  if (userDataLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pt-20">
      <h1 className="text-2xl font-bold my-2 text-prime">My Courses ({enrolledCourses.length})</h1>
      <hr style={{ border: 'none', height: '3px', backgroundColor: 'black' }} />
      <div className="grid gap-7 grid-cols-1  md:grid-cols-2 lg:grid-cols-3 my-5">
        {enrolledCourses.length > 0 ? (
          enrolledCourses.map(course => (
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
                                    <div className='text-center w-full mx-auto'>
                                        <div className='flex my-3'>
                                            
                                            <Link className="w-full" to={`/watch-course/${course._id}/${course.title}`}>
                                                <button className="text-center rounded-lg flex justify-center bg-success text-white p-2 gap-2 w-11/12 mx-auto  items-center font-semibold text-xl">Watch Videos</button>
                                            </Link>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
          ))
        ) : (
          <div className="card border-main mt-5 text-center  border-2 bg-base-100 w-96 shadow-xl h-56">
            <div className="card-body flex-col items-center justify-around">
              < MdOutlineClass className="text-5xl text-prime" />
              <h2 className="card-title">No Courses Enrolled</h2>
              <h2 className="text-2xl font-bold hover:text-prime"><Link to={`/courses`}>Available Courses</Link></h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


export default MyCourses;