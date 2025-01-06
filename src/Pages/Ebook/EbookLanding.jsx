import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaRegHandPointRight } from "react-icons/fa6";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { CiSquareQuestion } from "react-icons/ci";
import PdfViewer from "../../Components/PdfViewer";

const EbookLanding = () => {
  const { id } = useParams();
  const [ebook, setEbook] = useState();
  // Initialize state to track the open/closed status of each FAQ item
  const [openIndex, setOpenIndex] = useState(null);

  // Toggle the accordion item
  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    fetch("http://localhost:5000/all-ebooks")
      .then((res) => res.json())
      .then((data) => {
        setEbook(data.find((course) => course.url == id));
      });
  }, [id, ebook]);

  const handleClickScroll = () => {
    const element = document.getElementById("order");
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (ebook) {
    return (
      <div className=" mx-auto  bg-white shadow-md rounded-md">
        <div className="bg-[#F7F0E0] flex flex-col gap-5 py-14">
          {/* Header */}
          <div className="text-center mb-6 w-full md:w-4/6 mx-auto">
            <h1 className="text-4xl font-bold text-prime">{ebook.title}</h1>

            <p className="text-xl font-semibold  text-main my-5">
              ( {ebook.disclaimer} )
            </p>
            <p className="text-xl font-semibold  text-main my-5">
              {ebook.subtitle}
            </p>
          </div>

          {/* Pricing */}
          <div className=" text-center mb-6">
            <p className="text-lg items-center">
              <span className="text-2xl font-semibold text-red">মূল্য </span>
              <span className="line-through text-2xl font-semibold text-red mr-2">
                {ebook.price.actualPrice} {ebook.price.currency}
              </span>
              <span className="text-2xl text-red"> | </span>
              <span className="text-2xl font-semibold text-red">
                {ebook.price.discountedPrice} {ebook.price.currency}
              </span>
            </p>
          </div>

          {/* Order button */}
          <div className="flex justify-center items-center ">
            <button
              onClick={handleClickScroll}
              className="p-3 rounded-lg flex items-center text-lg gap-2 bg-prime text-white font-bold hover:bg-white hover:text-prime"
            >
              <FaRegHandPointRight /> অর্ডার করতে চাই
            </button>
          </div>
        </div>

        <div className="my-10">
          <h1 className="text-3xl my-5 text-center font-bold text-prime">
            একটু পড়ে দেখুন
          </h1>
          <PdfViewer pdfUrl={`http://localhost:5000${ebook.preview}`} />
        </div>

        {/* Highlights */}
        <div className="bg-[#F7F0E0] flex flex-col gap-5 py-14">
          <h2 className="text-2xl text-center font-bold text-prime mb-4">
            বইটি পড়ে কি শিখতে পারবেন?
          </h2>
          <ul className=" list-inside space-y-2 text-gray-700">
            {ebook.highlights.map((highlight, index) => (
              <li className="" key={index}>
                <span className="flex items-center gap-3 my-4 text-main text-lg ml-2">
                  {" "}
                  <IoCheckmarkDoneCircle className="text-prime text-xl" />
                  {highlight}
                </span>
                <hr />
              </li>
            ))}
          </ul>

          {/* Order button */}
          <div className="flex justify-center items-center ">
            <button
              onClick={handleClickScroll}
              className="p-3 my-3 rounded-lg flex items-center text-lg gap-2 bg-prime text-white font-bold hover:bg-white hover:text-prime"
            >
              <FaRegHandPointRight /> অর্ডার করতে চাই
            </button>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-8 bg-main py-10">
          <h2 className="text-2xl font-bold text-center  text-white mb-4">
            আপনাদের প্রশ্ন, আমাদের উত্তর
          </h2>
          {ebook.faq.map((item, index) => (
            <div key={index} className="mb-4 border-b pb-2">
              <button
                onClick={() => toggleAccordion(index)}
                className="font-semibold text-white text-lg w-full text-left flex justify-between items-center"
              >
                <span className="flex items-center gap-2">
                  <CiSquareQuestion className="text-xl ml-2" /> {item.question}
                </span>
                <span
                  className={`mr-2 transform transition-transform ${
                    openIndex === index ? "rotate-180" : "rotate-0"
                  }`}
                >
                  ▼
                </span>
              </button>
              {openIndex === index && (
                <p className="mt-2 text-white text-lg ml-7">{item.answer}</p>
              )}
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="mb-8">
          <h2 className="text-2xl mx-2 px-2 py-2 font-bold text-white bg-main text-center mb-4">
            {ebook.description}
          </h2>
        </div>

        <div id="order" className="mx-2 grid grid-cols-1 md:grid-cols-2 gap-8 ">
          {/* Billing Details */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Billing details</h2>
            <form className="space-y-4">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name <span className="text-red">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="mt-1 block w-full p-2 border border-main rounded-md shadow-sm focus:outline-none focus:ring-prime focus:border-prime"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number <span className="text-red">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="mt-1 block w-full p-2 border border-main rounded-md shadow-sm focus:outline-none focus:ring-prime focus:border-prime"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address <span className="text-red">*</span>
                </label>
                <p className="text-sm text-gray-500">
                  (এই ই-মেইলের মাধ্যমে আপনাকে ই-বুকটি প্রেরিত হবে)
                </p>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="mt-1 block w-full p-2 border border-main rounded-md shadow-sm focus:outline-none focus:ring-prime focus:border-prime"
                />
              </div>

              {/* Additional Information */}
              <div>
                <label
                  htmlFor="additional-info"
                  className="block text-sm font-medium text-gray-700"
                >
                  Additional information (optional)
                </label>
                <textarea
                  id="additional-info"
                  name="additional-info"
                  rows="4"
                  className="mt-1 block w-full p-2 border border-main rounded-md shadow-sm focus:outline-none focus:ring-prime focus:border-prime"
                  placeholder="Optional notes about your order..."
                ></textarea>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">আপনার অর্ডার</h2>
            <div className="border border-gray-300 rounded-md p-4 space-y-4">
              <div className="flex justify-between text-main font-semibold">
                <span>Product</span>
                <span>Subtotal</span>
              </div>

              <hr />

              {/* Product */}
              <div className="flex items-center space-x-4">
                <div className="flex justify-between items-center">
                  <p className="font-bold text-main">{ebook.title} - Ebook</p>
                </div>
                <div className="flex gap-1 items-center">
                  <p className="text-xs">X</p>
                  <p>1</p>
                </div>
                <p className="font-medium text-gray-800">220.00৳</p>
              </div>

              <hr />

              {/* Subtotal */}
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>220.00৳</span>
              </div>

              <hr />

              {/* Total */}
              <div className="flex justify-between font-semibold text-gray-800">
                <span>Total</span>
                <span>220.00৳</span>
              </div>

              {/* Payment Method */}
              <div className="space-y-2">
                <div className="flex items-center gap-1">
                  <p className="text-xl font-semibold text-[#e2136e]">bKash </p>
                  <img
                    className="w-10"
                    src="https://i.ibb.co.com/CJDHZ7b/1701670291b-Kash-App-Logo-PNG.png"
                    alt=""
                  />
                </div>

                {/* Privacy Notice */}
                <p className="text-sm text-gray-500 mt-4">
                  Your personal data will be used to process your order, support
                  your experience throughout this website, and for other
                  purposes described in our privacy policy.
                </p>

                <button className="w-full font-bold bg-[#e2136e] text-white py-2 rounded-md hover:bg-white hover:text-[#e2136e]">
                  Pay with bKash
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-[#F7F0E0] px-4 pt-7 pb-10 mt-5 flex flex-col">
          <h2 className="text-2xl font-bold text-center p-5 text-prime mb-4">
            যেকোন প্রয়োজনে যোগাযোগ করুন - +8801850002467
          </h2>
          <button className="bg-prime rounded-lg w-40 mx-auto text-white p-3 text-lg font-semibold hover:text-prime hover:bg-white">
            <a href="https://wa.me/+8801850002467">+8801850002467</a>
          </button>
        </div>
      </div>
    );
  }
};

export default EbookLanding;
