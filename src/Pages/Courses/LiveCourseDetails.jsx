import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxios from "../../Hooks/UseAxios";
import UseLoggedUser from "../../Hooks/UseLoggedUser";
import { AuthContext } from "../../Providers/AuthProvider";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

import Swal from "sweetalert2";
import axios from "axios";

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
    const [courseId, setCourseId] = useState();

    useEffect(() => {
        fetch('https://secrets-of-learning-server.onrender.com/live-courses')
            .then(res => res.json())
            .then(data => {
                setCourse(data.find(course => course.url_id == id))
                setCourseId(course._id)
                setPrice(course.price)
                setDiscount(course.discount)
            });
    }, [id, course]);

    const initialBillingDetails = {
        name: '',
        birth: '',
        phoneNumber: '',
        email: '',
        address: '',
        transactionNumber: '',
        transactionId: '',
        c_id: id,
        status: 'not contacted'
    };
    useEffect(() => {
        const disc = parseFloat(discount) / 100
        const takaSaved = price * disc;
        setTakaNow(price - takaSaved);
    }, [discount, price])

    const [billingDetails, setBillingDetails] = useState(initialBillingDetails);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBillingDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send form data to the backend
            const response = await axiosPublic.post('/live-enroll', billingDetails);

            if (response.data.result.insertedId) {
                Swal.fire({
                    title: "Form Submitted!",
                    text: "ধন্যবাদ! আপনার পেমেন্ট সফল হলে ২৪ ঘন্টার মধ্যে কনফার্মেশন মেসেজ দেওয়া হবে।",
                    icon: "success",
                });
                // Reset form after submission
                setBillingDetails(initialBillingDetails);
            }
        } catch (error) {
            console.error('Submission failed:', error);
            Swal.fire({
                title: "Submission Failed",
                text: "Please try again.",
                icon: "error",
            });
        }
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
                    <video className="rounded-lg mx-auto my-5 w-11/12 md:w-7/12" controls src={course.trailer}></video>
                    <p className="text-xl text-red font-semibold">**ভর্তির লাস্ট ডেট {course.deadline}**</p>
                    <button
                        onClick={handleClickScroll}
                        className="my-5 btn bg-prime text-white text-xl"
                    >
                        ভর্তি হতে ক্লিক করুন
                    </button>
                </div>

                {/* Description */}
                <div className="text-center my-5 card card-compact bg-base-100 w-full md:w-11/12 mx-auto shadow-xl p-5">
                    <h1 className="text-2xl font-bold my-2">
                        <span className="">
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
                    <h1 className="text-2xl font-bold">
                        এই কোর্সের{" "}
                        <span className="">
                            ফীচার
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
                    <h1 className="text-2xl font-bold">
                        কী কী{" "}
                        <span className="">
                            সফটওয়্যার
                        </span>{" "}
                        শেখানো হবে
                    </h1>
                    <div className="flex flex-col gap-3 py-5 text-center w-11/12 md:w-96 mx-auto">
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
                <div className="text-center py-10 my-10 card card-compact bg-base-100  shadow-xl w-11/12 mx-auto">
                    <h1 className="text-2xl font-bold mb-5">কোর্স <span className="">মডিউল</span> !!</h1>
                    <div className="w-11/12 mx-auto">
                        <Accordion allowZeroExpanded>
                            {course.whatYoullLearn.map((item) => (
                                <AccordionItem key={item.topic}>
                                    <AccordionItemHeading>
                                        <AccordionItemButton>
                                            {item.topic}
                                        </AccordionItemButton>
                                    </AccordionItemHeading>
                                    <AccordionItemPanel>
                                        <table className="table-auto w-full border-collapse border border-main mb-4 text-start">
                                            <tbody>
                                                {item.description.split('\n').map((classItem, idx) => (
                                                    <tr key={idx}>
                                                        <td className="border border-main p-2">{classItem}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </AccordionItemPanel>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>

                </div>
                {/* Mentor Section */}
                <div className="bg-base-100 shadow-xl p-10 my-10 w-full md:w-11/12 mx-auto">
                    <h1 className="text-2xl text-center font-bold mb-5">
                        কোর্স{" "}
                        <span className="">
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
                            <p className="font-semibold">{course.trainer.designation}</p>
                            <p>{course.trainer.info}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="md:w-11/12 md:mx-auto rounded-lg shadow-lg bg-white">
                        <div className="w-11/12 mx-auto px-1 rounded-lg text-center py-10 bg-prime text-white">
                            <h1 className="text-2xl font-semibold">ভর্তি হবার নিয়ম</h1>
                            <p className="text-lg">ভর্তি হতে নিচের দেওয়া <span className="font-semibold">বিকাশ/ নগদ</span> নাম্বারে কোর্স ফী <span className="font-bold">Send Money</span> করুন এবং নিচের ফর্মটি ফিলাপ করে দিন।
                            </p>
                            <p className="text-lg">টাকা পাঠানো ও ফর্ম ফিলাপ সাকসেস্ফুল হলে আপনার কাছে মেন্টর নিজে কল করে কনফার্মেশন জানাবেন।</p>
                        </div>
                        <form id="enroll" onSubmit={handleSubmit} className="w-11/12 mx-auto p-4 rounded-lg shadow-lg bg-white  mb-10">
                            <h2 className="text-2xl font-bold mb-4 text-center">ভর্তি ফর্ম</h2>
                            <div className="flex justify-evenly flex-col lg:flex-row gap-5 ">
                                <div>
                                    <div className="mb-4">
                                        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                                            আপনার নামঃ
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
                                        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                                            জন্মতারিখ ও সালঃ
                                        </label>
                                        <input
                                            type="date"
                                            id="birth"
                                            name="birth"
                                            value={billingDetails.birth}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                            required
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="phoneNumber" className="block text-gray-700 font-bold mb-2">
                                            WhatsApp নাম্বারঃ
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
                                            ই-মেইল এড্রেসঃ
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
                                            আপনার বাসার ডিটেইলস এড্রেসঃ
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
                                        <p className="text-xl my-3 text-main font-semibold"><span className="bg-prime p-1 text-white rounded-lg">Send money</span> with Bkash/Nagad and <br /> Submit the transaction id</p>
                                        <div className="flex flex-col  gap-2 items-center">
                                            <div className="flex">
                                                <img className="w-24" src="https://i.ibb.co.com/7QTW6Q4/Nagad-Logo-wine.png" alt="" />
                                                <img className="w-24" src="https://i.ibb.co.com/mc7kvDy/BKash-Logo-wine.png" alt="" />
                                            </div>
                                            <p className="font-bold text-xl text-white bg-prime p-1 rounded-lg">+8801850002467</p>
                                        </div>
                                    </div>
                                    <div className="text-lg  font-semibold my-5">
                                        <h1 className="flex justify-between">পূর্বের কোর্স ফী               : <span className="font-bold text-main">{course.price} Tk</span></h1>
                                        <h1 className="flex justify-between">ডিসকাউন্ট              : <span className="">- {course.discount} %</span></h1>
                                        <h1 className="flex justify-between text-[#e2136e] font-bold">বর্তমান কোর্স ফী    : <span className="font-bold text-white p-1 rounded-lg bg-[#e2136e]">{takaNow} Tk</span></h1>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="phoneNumber" className="block text-gray-700 font-bold mb-2">
                                            যেই নাম্বার থেকে টাকা পাঠিয়েছেন তা লিখুনঃ
                                        </label>
                                        <input
                                            type="tel"
                                            id="transactionNumber"
                                            name="transactionNumber"
                                            value={billingDetails.transactionNumber}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="transactionId" className="block text-gray-700 font-bold mb-2">
                                            ট্রাঞ্জেকশন আইডিঃ
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
                        href={`https://wa.me/+8801850002467?text=Hello! I'm interested in the ${course.title} course.`}
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