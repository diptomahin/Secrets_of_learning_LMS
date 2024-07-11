const About = () => {

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
        <div className="bg-base-100  py-10">
            {/* section-1 */}
            <div className="card lg:card-side  w-11/12 mx-auto">
                <figure className="w-1/2 mx-auto">
                    <img
                        className=""
                        src="https://i.ibb.co/BzWTz9M/Untitled-design-2.png"
                        alt="About" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title text-2xl">About <span className="text-prime">Secrets of Learning</span></h2>
                    <hr />
                    <p>Welcome to Secrets of Learning, your premier destination for mastering the art of digital creation. Whether you're an aspiring content creator, a budding motion graphics artist, or an enthusiastic video editor, our platform is designed to unlock your creative potential and equip you with the skills needed to thrive in today's digital landscape.</p>
                </div>
            </div>
            {/* section-2 */}
            <div className="card lg:card-side  w-11/12 mx-auto">
                <div className="card-body">
                    <h2 className="card-title text-2xl">Our Mission</h2>
                    <hr />
                    <p>At Secrets of Learning, our mission is to empower individuals with the knowledge and skills required to create captivating digital content. We believe that learning should be accessible, engaging, and practical. That's why we've curated a diverse range of courses that cater to different learning styles and skill levels, ensuring that you have the resources you need to succeed.</p>
                </div>
                <figure className="w-1/2 mx-auto">
                    <img
                        className=""
                        src="https://i.ibb.co/rGvvwq9/Untitled-design-3.png "
                        alt="About" />
                </figure>
            </div>
            {/* section-2 */}
            <div className="card w-11/12 mx-auto">
                <h2 className="text-center font-semibold text-2xl">What We Offer</h2>
                <div className="card-body grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                   {
                    choice.map(cho =>  
                    <div key={cho.title} className="card bg-prime text-white hover:bg-white hover:text-prime">
                        <div className="card-body">
                            <h2 className="card-title">{cho.title}</h2>
                            <p>{cho.description}</p>
                        </div>
                    </div>)
                   }
                </div>
            </div>
        </div>
    );
};

export default About;