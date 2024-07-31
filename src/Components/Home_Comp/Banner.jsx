

const Banner = () => {
    return (
        <div className="bg-main pt-20  h-screen">
            <div className=" w-11/12 mx-auto  items-center h-full py-2 md:py-5 lg:py-5">
                <div className="text-white h-1/2 lg:h-1/4  text-center">
                    <div className="mb-7">
                    <h1 className="text-4xl font-bold">Start Your Journey Today!</h1>
                    <p className="text-2xl font-semibold">
                        Unlock your creative potential with  <span className="text-prime">Secrets of Learning</span>.
                    </p>
                    </div>
                </div>
                <div className="h-1/2 lg:h-3/4">
                <iframe className="rounded-lg w-full h-full "  src="https://www.youtube.com/embed/SlYcqjhoGzM?si=FTaWxa7xKnr_5JyJ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" ></iframe>
                </div>
            </div>
        </div>
    );
};

export default Banner;
