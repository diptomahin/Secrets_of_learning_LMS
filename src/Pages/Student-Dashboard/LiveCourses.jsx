import { Link } from 'react-router-dom';
import UseLiveCourses from '../../Hooks/UseLivecourses';
import UseLoggedUser from '../../Hooks/UseLoggedUser';
import { useEffect, useState } from 'react';


const LiveCourses = () => {
    const disableRightClick = (e) => {
        e.preventDefault();
      };


    const { liveCourses } = UseLiveCourses();
    const { userData } = UseLoggedUser();
    const [enrolledCourses, setEnrolledCourses] = useState([]);

    useEffect(() => {
        if (userData?.live_enroll && userData.live_enroll.length > 0) {
            const filteredCourses = liveCourses.filter(course =>
                userData.live_enroll.some(enrolledCourse => enrolledCourse.courseId === course._id)
            );
            setEnrolledCourses(filteredCourses);

        }
    }, [userData, liveCourses]);

    // console.log(enrolledCourses)

    return (
        <div className="py-20" onContextMenu={disableRightClick}>
            <div className='grid grid-cols-1 gap-5'>
                {
                    enrolledCourses.map(item =>
                        <div key={item._id} className="card grid grid-cols-1 lg:grid-cols-2  bg-base-100 shadow-xl">
                            <figure>
                                <video
                                    className=''
                                    controls
                                    controlsList="nodownload"
                                    src={`http://localhost:5000${item.trailer}`}
                                    type="video/mp4"
                                    alt="Album" />
                            </figure>
                            <div className="card-body">
                                <Link to={`/course/${item.url_id}`}><h2 className="card-title hover:text-prime">{item.title}</h2></Link>
                                <p>Mentor: {item.trainer.name}</p>
                                <p>{item.short_description}</p>
                                <div className="card-actions justify-end">
                                    <Link to={`/watch-live/${item._id}/${item.title}`}><button className='bg-success text-white btn'>Watch Course</button></Link>
                                </div>
                            </div>
                        </div>)
                }
            </div>
        </div>
    );
};

export default LiveCourses;