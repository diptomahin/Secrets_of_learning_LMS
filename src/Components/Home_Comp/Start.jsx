import { Link } from "react-router-dom";

const Start = () => {

    const choice = [
        {
          "id": 1,
          "title": "Content Creation Courses",
          "description": "Dive into the world of content creation with our comprehensive courses. Learn how to craft compelling stories, engage your audience, and build a personal brand that stands out in a crowded digital space."
        },
        {
          "id": 2,
          "title": "Motion Graphics Training",
          "description": "Discover the magic of motion graphics. Our courses cover everything from the basics of animation to advanced techniques in After Effects and other industry-standard software. Bring your ideas to life with stunning visuals that captivate and inform."
        },
        {
          "id": 3,
          "title": "Video Editing Mastery",
          "description": "Master the art of video editing with our expert-led courses. Whether you're a beginner looking to learn the fundamentals or an experienced editor seeking to hone your skills, we provide the tools and techniques to create professional-grade videos."
        }
      ]
      
    return (
        <div className="hero my-20 w-11/12 mx-auto">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src="https://i.ibb.co/9NnP9K1/Untitled-design-2-removebg-preview.png"
            className="max-w-sm rounded-lg " />
          <div>
            <h1 className="text-4xl text-prime font-bold">Start Your Journey Today</h1>
            <p className="py-6 text-lg">
            Unlock your creative potential with Secrets of Learning. Explore our course catalog, enroll in your favorite classes, and start creating content that inspires, engages, and resonates. Your journey to becoming a digital creator starts here.
            </p>
            <div className="card w-11/12 mx-auto">
                <h2 className="text-center font-semibold text-2xl">What We Offer</h2>
                <div className="card-body grid grid-cols-1  gap-3">
                   {
                    choice.map(cho =>  
                    <div key={cho.title} className="card bg-prime text-white hover:bg-white hover:text-prime">
                        <div className="card-body">
                            <h2 className="card-title">{cho.title}</h2>
                        </div>
                    </div>)
                   }
                </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Start;