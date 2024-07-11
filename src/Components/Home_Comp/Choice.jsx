
const Choice = () => {
    const choice = [
        {
          "id": 1,
          "title": "Expert Instructors",
          "description": "Learn from industry professionals with years of experience in content creation, motion graphics, and video editing. Our instructors are passionate about teaching and dedicated to helping you achieve your goals."
        },
        {
          "id": 2,
          "title": "Flexible Learning",
          "description": "Our courses are designed to fit into your busy schedule. Learn at your own pace, from anywhere in the world, with our on-demand video lessons and downloadable resources."
        },
        {
          "id": 4,
          "title": "Practical Skills",
          "description": "Gain hands-on experience with real-world projects and assignments. Our courses are focused on practical applications, ensuring that you can immediately apply what you learn to your own creative projects."
        },
        {
          "id": 5,
          "title": "Cutting-Edge Curriculum",
          "description": "Stay ahead of the curve with our constantly updated courses. We ensure our content reflects the latest trends and technologies in content creation, motion graphics, and video editing."
        },
        {
          "id": 6,
          "title": "Affordable Pricing",
          "description": "We believe that quality education should be accessible to everyone. Our competitive pricing and flexible payment options make it easy for you to invest in your future without breaking the bank."
        },
        {
          "id": 7,
          "title": "Certification",
          "description": "Earn industry-recognized certificates upon course completion. Showcase your new skills to potential employers or clients and boost your professional credibility."
        }
       
      ]
    return (
        <div className="card lg:card-side   mx-auto mt-10">
        <div className="card-body ">
            <h2 className="font-semibold text-center py-3 hover:bg-prime hover:text-white text-2xl border-2 border-prime">Why choose <span className="text-prime hover:text-white">Secrets Of Learning</span> !!</h2>
            <div className="card-body grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                   {
                    choice.map(cho =>  
                    <div key={cho.id} className="card hover:bg-white hover:text-prime  bg-prime text-white">
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

export default Choice;