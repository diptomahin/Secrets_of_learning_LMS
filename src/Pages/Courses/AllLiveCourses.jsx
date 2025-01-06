import { Link } from "react-router-dom";
import UseLiveCourses from "../../Hooks/UseLivecourses";

const AllLiveCourses = () => {

  const disableRightClick = (e) => {
    e.preventDefault();
  };

  const { liveCourses } = UseLiveCourses()
  
  if (liveCourses.length > 0) {
    return (
      <div className="py-20 " onContextMenu={disableRightClick}>
        <div className="w-11/12 mx-auto text-center">
          <h1 className="text-2xl font-bold mb-2">Explore to Our Live courses</h1>
          <p className="text-lg font-semibold">
            Discover a wide range of courses designed to help you achieve your personal and professional goals.
          </p>
        </div>
        <div className='w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5'>
          {
            liveCourses.map(item =>
              <div key={item._id} className="card w-72  bg-base-100 shadow-xl">
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
                    <Link to={`/course/${item.url_id}`}><button className='btn bg-prime text-white'>Enroll Now</button></Link>
                  </div>
                </div>
              </div>)
          }
        </div>
      </div>
    );
  }
  else {
    return (
      <div className="py-20 text-center">
        <div className="h-screen">
          <div className="card mx-auto bg-neutral text-neutral-content w-96">
            <div className="card-body items-center text-center">
              <h2 className="card-title">No Courses Available At the moment</h2>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

export default AllLiveCourses;