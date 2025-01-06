import UseCourses from '../../Hooks/UseCourses';
import { Link } from 'react-router-dom';
import { FaRegEdit } from 'react-icons/fa';


const ManageCourses = () => {

    const { allCourses } = UseCourses()


    // function discountCounter(price, disc) {
    //     const discount = parseFloat(disc) / 100;

    //     const takaSaved = price * discount;

    //     const takaNow = price - takaSaved;

    //     return takaNow;



    // }




    return (
        <div className='mt-10'>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 w-11/12 mx-auto">
                {
                    allCourses.map(course =>
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
                                            <Link className="w-full" to={`/admin-dashboard/manage-courses/${course._id}`}>
                                                <button className="text-center rounded-lg flex justify-center bg-success text-white p-2 gap-2 w-11/12 mx-auto  items-center font-semibold text-xl">Add Videos</button>
                                            </Link>
                                            <Link className="w-full" to={`/watch-course/${course._id}/${course.title}`}>
                                                <button className="text-center rounded-lg flex justify-center bg-prime text-white p-2 gap-2 w-11/12 mx-auto  items-center font-semibold text-xl">Watch Videos</button>
                                            </Link>
                                        </div>
                                        <Link className="w-full" to={`/admin-dashboard/update-courses/${course._id}`}>
                                            <button className="text-center rounded-lg flex justify-center bg-main text-white p-2 gap-2 w-11/12 mx-auto  items-center font-semibold text-xl"><FaRegEdit className="font-bold text-2xl" />Edit Course</button>
                                        </Link>
                                    </div>

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