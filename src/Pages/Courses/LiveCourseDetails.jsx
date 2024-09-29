import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxios from "../../Hooks/UseAxios";
import UseLoggedUser from "../../Hooks/UseLoggedUser";
import { AuthContext } from "../../Providers/AuthProvider";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';



// import required modules
import { Navigation } from 'swiper/modules';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const LiveCourseDetails = () => {

    const { id } = useParams();

    // console.log(id)

    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    const axiosPublic = useAxios();

    const { userData } = UseLoggedUser();

    const [course, setCourse] = useState();
    const [price, setPrice] = useState();
    const [discount, setDiscount] = useState();
    const [takaNow, setTakaNow] = useState(0);

    useEffect(() => {
        fetch('https://secrets-of-learning-server.onrender.com/live-courses')
            .then(res => res.json())
            .then(data => {
                setCourse(data.find(course => course._id == id))
                setPrice(course.price)
                setDiscount(course.discount)
            });
    }, [id, course]);


    useEffect(() => {
        const disc = parseFloat(discount) / 100
        const takaSaved = price * disc;
        setTakaNow(price - takaSaved);
    }, [discount, price])

    const initialBillingDetails = {
        name: '',
        phoneNumber: '',
        email: '',
        address: '',
        transactionId: '',
        c_id: id,
    };

    const [billingDetails, setBillingDetails] = useState(initialBillingDetails);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBillingDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log('Billing Details:', billingDetails);
        axiosPublic.post('/live-enroll', billingDetails)
            .then(res => {
                console.log(res)
                if (res.data.result.
                    insertedId) {
                    Swal.fire({
                        title: "Form Is Submitted!",
                        text: "You Will be contacted by our team in 24 hours",
                        icon: "success"
                    });
                    setBillingDetails(initialBillingDetails);
                }
            })
            .catch(error => {
                toast.error('Submission Failed');
                console.error(error);
            })
    };
    // console.log(course)
    const handleClickScroll = () => {
        const element = document.getElementById('enroll');
        if (element) {
            // 👇 Will scroll smoothly to the top of the next section
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    if (course) {
        return (
            <div className="bg-[#f5f6ff]">
                <div className="text-center py-10 px-5">
                    <p className="my-5 text-prime text-2xl font-semibold w-full md:w-3/5 mx-auto">
                        {course.short_description}
                    </p>
                    <h1 className="my-5 text-3xl font-bold text-main">{course.title}</h1>
                    <video
                        className="mx-auto w-full md:w-8/12 my-5 bg-main p-3 rounded-lg"
                        controls
                        src={course.trailer}
                        type="video/mp4"
                    ></video>
                    <button
                        onClick={handleClickScroll}
                        className="my-5 btn bg-prime text-white text-xl"
                    >
                        Enroll Now
                    </button>
                </div>

                {/* Description */}
                <div className="text-center my-5 card card-compact bg-base-100 w-full md:w-11/12 mx-auto shadow-xl p-5">
                    <h1 className="text-2xl font-semibold my-2">
                        <span className="bg-prime text-white rounded-lg p-1">
                            কোর্সটি
                        </span>{" "}
                        কেন করতেই হবে?
                    </h1>
                    <p className="text-xl my-5 w-full md:w-11/12 mx-auto text-black font-bold">
                        {course.description}
                    </p>
                </div>

                {/* Course Features */}
                <div className="text-center py-10">
                    <h1 className="text-2xl font-semibold">
                        আমাদের কোর্স এর{" "}
                        <span className="bg-prime text-white rounded-lg p-1">
                            ফিচার
                        </span>
                        !!!
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full md:w-11/12 mx-auto gap-3 py-5">
                        {course.courseFeatures.map((item) => (
                            <div
                                key={item.feature}
                                className="card card-compact bg-base-100 w-full lg:w-80 shadow-xl p-2"
                            >
                                <div className="card-body">
                                    <h2 className="text-center text-2xl font-semibold">
                                        {item.feature}
                                    </h2>
                                    <p className="text-black text-lg">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Software Learning */}
                <div className="text-center py-10 card card-compact bg-base-100 shadow-xl w-full md:w-11/12 mx-auto">
                    <h1 className="text-2xl font-semibold">
                        কী কী{" "}
                        <span className="bg-prime text-white rounded-lg p-1">
                            সফটওয়্যার
                        </span>{" "}
                        শেখানো হবে
                    </h1>
                    <div className="flex flex-col gap-3 py-5 text-center w-full md:w-96 mx-auto">
                        {course.software.map((item) => (
                            <div key={item.name} className="collapse collapse-arrow bg-base-200 w-full">
                                <input type="checkbox" className="peer" /> {/* Toggle input */}
                                <div className="collapse-title bg-prime text-white font-semibold text-xl peer-checked:bg-secondary peer-checked:text-white">
                                    {item.name}
                                </div>
                                <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-white">
                                    <p>{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mentor Section */}
                <div className="bg-base-100 shadow-xl p-10 my-10 w-full md:w-11/12 mx-auto">
                    <h1 className="text-2xl text-center font-semibold mb-5">
                        কোর্স{" "}
                        <span className="bg-prime text-white rounded-lg p-1">
                            মেন্টর
                        </span>{" "}
                        #
                    </h1>
                    <div className="card lg:card-side bg-base-100 shadow-xl w-full md:w-11/12 mx-auto p-5">
                        <div className="avatar">
                            <div className="w-80 mx-auto rounded-full">
                                <img src={course.trainer.image} alt="trainer" />
                            </div>
                        </div>
                        <div className="card-body">
                            <h2 className="card-title">{course.trainer.name}</h2>
                            <p>{course.trainer.designation}</p>
                            <p>{course.trainer.info}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="md:w-11/12 md:mx-auto">
                        <form id="enroll" onSubmit={handleSubmit} className="w-11/12 mx-auto p-4 rounded-lg shadow-lg bg-white  mb-10">
                            <h2 className="text-2xl font-bold mb-4 text-center">Billing Details</h2>
                            <div className="flex justify-evenly flex-col lg:flex-row gap-5 ">
                                <div>
                                    <div className="mb-4">
                                        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={billingDetails.name}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                            required
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="phoneNumber" className="block text-gray-700 font-bold mb-2">
                                            Whatsapp Number
                                        </label>
                                        <input
                                            type="tel"
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            value={billingDetails.phoneNumber}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                            required
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={billingDetails.email}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                            required
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="address" className="block text-gray-700 font-bold mb-2">
                                            Address
                                        </label>
                                        <textarea
                                            id="address"
                                            name="address"
                                            value={billingDetails.address}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="my-5">
                                        <p className="text-xl my-3 text-main font-semibold"><span className="bg-prime p-1 text-white rounded-lg">Send money </span>with Bkash/Nagad and <br /> Submit the transaction id</p>
                                        <div className="flex flex-col  gap-2 items-center">
                                            <div className="flex">
                                                <img className="w-24" src="https://i.ibb.co.com/7QTW6Q4/Nagad-Logo-wine.png" alt="" />
                                                <img className="w-24" src="https://i.ibb.co.com/mc7kvDy/BKash-Logo-wine.png" alt="" />
                                            </div>
                                            <p className="font-bold text-xl text-white bg-prime p-1 rounded-lg">+8801850002467</p>
                                        </div>
                                    </div>
                                    <div className="text-lg  font-semibold">
                                        <h1 className="flex justify-between">Price                : <span className="font-bold text-main">{course.price} Tk</span></h1>
                                        <h1 className="flex justify-between">Discount             : <span className="">- {course.discount} Tk</span></h1>
                                        <h1 className="flex justify-between text-[#e2136e] font-bold">Price with discount  : <span className="font-bold text-white p-1 rounded-lg bg-[#e2136e]">{takaNow} Tk</span></h1>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="transactionId" className="block text-gray-700 font-bold mb-2">
                                            Transaction ID
                                        </label>
                                        <input
                                            type="text"
                                            id="transactionId"
                                            name="transactionId"
                                            value={billingDetails.transactionId}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full btn  bg-prime text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                    {/* WhatsApp Button */}
                    <a
                        href={`https://wa.me/+8801963895488?text=Hello! I'm interested in the ${course.title} course.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="fixed bottom-5 right-5 bg-main hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all duration-300"
                        title="Chat on WhatsApp"
                    >
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                            alt="WhatsApp"
                            className="w-8 h-8"
                        />
                    </a>
                </div>
            </div>
        );
    }
};

export default LiveCourseDetails;