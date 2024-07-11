import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';


// import required modules
import { Navigation } from 'swiper/modules';

const HomeRiviews = () => {

    const reviews = [
        {
            "id": 1,
            "rating": 5,
            "review": "This platform is amazing! The courses are very comprehensive and the instructors are top-notch. I learned so much about content creation and my channel has grown significantly.",
            "username": "JaneDoe123",
            "image": "https://example.com/images/jane_doe.jpg"
        },
        {
            "id": 2,
            "rating": 4,
            "review": "Great courses with practical applications. The motion graphics training was especially helpful. Highly recommend to anyone looking to improve their skills.",
            "username": "JohnSmith456",
            "image": "https://example.com/images/john_smith.jpg"
        },
        {
            "id": 3,
            "rating": 5,
            "review": "Fantastic learning experience! The video editing mastery course helped me land my dream job. The community support and interactive projects are excellent.",
            "username": "EmilyR789",
            "image": "https://example.com/images/emily_r.jpg"
        },
        {
            "id": 4,
            "rating": 4,
            "review": "I loved the advanced cinematography course. The content is very well structured and easy to follow. Can't wait for more courses to be added!",
            "username": "MikeT987",
            "image": "https://example.com/images/mike_t.jpg"
        },
        {
            "id": 5,
            "rating": 5,
            "review": "Secrets of Learning has transformed my skills. The instructors are knowledgeable and the courses are packed with useful information. Highly recommended!",
            "username": "SarahK321",
            "image": "https://example.com/images/sarah_k.jpg"
        }
    ]


    return (
        <div className='w-8/12 mx-auto my-10'>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                {
                    reviews.map(review =>
                        <SwiperSlide key={review.id}>
                            <div className="card bg-base-100 w-96 mx-auto shadow-xl">
                                <figure>
                                    <img
                                    className='rounded-lg w-1/2'
                                        src="https://i.ibb.co/hVyVwKD/Untitled-design-1.png"
                                        alt="Images" />
                                </figure>
                                <div className="card-body">
                                <p className='font-semibold text-prime'>{review.username}</p>
                                    <h2 className="card-title">{review.review}</h2>
                                </div>
                            </div>
                        </SwiperSlide>)
                }

            </Swiper>
        </div>
    );
};

export default HomeRiviews;