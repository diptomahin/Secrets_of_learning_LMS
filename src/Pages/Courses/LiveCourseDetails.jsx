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
import toast from "react-hot-toast";

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
        fetch('http://localhost:5000/live-courses')
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
                    toast.success('Submitted successfully');
                    setBillingDetails(initialBillingDetails);
                }
            })
            .catch(error => {
                toast.error('Submission Failed');
                console.error(error);
            })
    };
    // console.log(course)

    if (course) {
        return (
            <div className="bg-[#f5f6ff]">
                <div className="text-center py-10  ">
                    <p className="my-5 text-prime text-2xl font-semibold w-3/5 mx-auto">{course.short_description}</p>
                    <h1 className="my-5 text-3xl font-bold text-main">{course.title}</h1>
                    <video
                        className="mx-auto w-8/12 my-5 bg-main p-3 rounded-lg"
                        controls
                        // width="700" // Set the desired width
                        src={course.trailer}
                        type="video/mp4"
                    ></video>
                    <button className="my-5 btn bg-prime text-white text-xl">Enroll Now</button>
                </div>
                <div className="text-center my-5 card card-compact bg-base-100 w-11/12 mx-auto shadow-xl p-5">
                    <h1 className="text-2xl font-semibold my-2">কেন এই <span className="bg-prime text-white rounded-lg p-1">কোর্স </span> ??? </h1>
                    <p className=" text-xl my-5 w-11/12 mx-auto text-black font-bold">{course.description}</p>
                </div>
                <div className="text-center py-10">
                    <h1 className="text-2xl font-semibold">আমাদের কোর্স এর <span className="bg-prime text-white rounded-lg p-1">ফিচার</span>!!!</h1>
                    <div className=" grid  grid-cols-3 w-11/12 mx-auto gap-3 py-5">
                        {
                            course.courseFeatures.map(item =>
                                <div key={item.feature} className="card card-compact bg-base-100 w-80 shadow-xl p-2">
                                    <div className="card-body">
                                        <h2 className="text-center text-2xl font-semibold">{item.feature}</h2>
                                        <p className="text-black text-lg">{item.description}</p>
                                    </div>
                                </div>)
                        }
                    </div>
                </div>
                <div className="text-center py-10 card card-compact bg-base-100  shadow-xl w-11/12 mx-auto">
                    <h1 className="text-2xl font-semibold">কি কি <span className="bg-prime text-white rounded-lg p-1">সফটওয়্যার</span> শিখবে ????</h1>
                    <div className="flex flex-col gap-3 py-5 text-center w-96 mx-auto ">
                        {
                            course.software.map(item =>
                                <div key={item.name} className="bg-base-200 full collapse">
                                    <input type="checkbox" className="peer" />
                                    <div
                                        className="collapse-title bg-prime text-white font-semibold text-xl peer-checked:bg-secondary peer-checked:text-secondary-content">
                                        {item.name}
                                    </div>
                                    <div
                                        className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
                                        <p>{item.description}</p>
                                    </div>
                                </div>)
                        }
                    </div>
                </div>
                <div className="text-center py-10 my-10 card card-compact bg-base-100  shadow-xl w-11/12 mx-auto">
                    <h1 className="text-2xl font-semibold mb-5">কোর্স <span className="bg-prime text-white rounded-lg p-1">কারিকুলাম</span> !!</h1>
                    <div className="w-11/12 mx-auto">
                        <Accordion allowZeroExpanded>
                            {
                                course.whatYoullLearn.map(item =>
                                    <AccordionItem key={item.topic}>
                                        <AccordionItemHeading>
                                            <AccordionItemButton>
                                                {item.topic}
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel>
                                            <p>
                                                {item.description}
                                            </p>
                                        </AccordionItemPanel>
                                    </AccordionItem>)
                            }
                        </Accordion>
                    </div>
                </div>
                <div className="bg-base-100 shadow-xl p-10  my-10 w-11/12 mx-auto">
                    <h1 className="text-2xl text-center font-semibold mb-5">কোর্স <span className="bg-prime text-white rounded-lg p-1">মেন্টর</span> #</h1>
                    <div className="card lg:card-side bg-base-100 shadow-xl w-11/12 mx-auto p-5">
                        <div className="avatar">
                            <div className="w-80 mx-auto rounded-full">
                                <img src={course.trainer.image} />
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
                    <div className="w-11/12 mx-auto">
                        <form onSubmit={handleSubmit} className="w-11/12 mx-auto p-4 rounded-lg shadow-lg bg-white  mb-10">
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
                                            Phone Number
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
                                        <p className="text-xl my-3 text-main font-semibold">Send money with Bkash and <br /> Submit the <span className="bg-prime p-1 text-white rounded-lg">transaction id</span></p>
                                        <div className="flex flex-col lg:flex-row gap-2 items-center">
                                            <img className="w-24" src="https://i.ibb.co.com/mc7kvDy/BKash-Logo-wine.png" alt="" />
                                            <p className="font-bold text-xl text-[#d12053]">+8801963895488</p>
                                        </div>
                                    </div>
                                    <div className="text-lg  font-semibold">
                                        <h1 className="flex justify-between">Price                : <span className="font-bold text-main">{course.price}</span></h1>
                                        <h1 className="flex justify-between">Discount             : <span className="">- {course.discount}</span></h1>
                                        <h1 className="flex justify-between text-[#e2136e] font-bold">Price with discount  : <span className="font-bold text-white p-1 rounded-lg bg-[#e2136e]">{takaNow}</span></h1>
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
                </div>
            </div>
        );
    }
};

export default LiveCourseDetails;