import './Banner.css'; // Import the CSS file for styling

const Banner = () => {
    return (
        <div className="bg-main pt-20">
            <div className="flex w-11/12 mx-auto  items-center h-screen">
                <div className="text-white w-3/5">
                    <h1 className="text-4xl font-bold">Start Your Journey Today!</h1>
                    <p className="py-6 text-2xl font-semibold">
                        Unlock your creative potential with <br /> <span className="text-prime">Secrets of Learning</span>. <br /> Explore our course catalog, enroll in your favorite classes,
                    </p>
                </div>
                <div className="flex w-2/5 gap-10 marquee-container">
                    <div className="marquee-up">
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
                            className="my-3 rounded-lg"
                        />
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
                            className="my-3 rounded-lg"
                        />
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
                            className="my-3 rounded-lg"
                        />
                    </div>
                    <div className="marquee-down">
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
                            className="my-3 rounded-lg"
                        />
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
                            className="my-3 rounded-lg"
                        />
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
                            className="my-3 rounded-lg"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
