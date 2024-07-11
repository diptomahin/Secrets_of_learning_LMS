
const Banner = () => {
    const images = [
        'https://i.ibb.co/bbHMfVs/Secrets-1.png',
        'https://i.ibb.co/b1M10C7/Nazmul-Amin-Ihsan-1.png',
        'https://i.ibb.co/XtCd4Ws/Nazmul-Amin-Ihsan-2.png',
        'https://i.ibb.co/BwBP9Qv/Nazmul-Amin-Ihsan.png',
    ]
    return (
        <div className=" mx-auto  " >
            <div className="carousel   ">
                <div id="item1" className="carousel-item w-full">
                    <img src={images[0]} className="h-4/5 w-full mx-auto" />
                </div>
                <div id="item2" className="carousel-item w-full">
                    <img src={images[1]}  className="h-4/5 w-full mx-auto"/>
                </div>
                <div id="item3" className="carousel-item w-full">
                    <img src={images[2]} className="h-4/5 w-full mx-auto" />
                </div>
                <div id="item3" className="carousel-item w-full">
                    <img src={images[3]} className="h-4/5 w-full mx-auto" />
                </div>
            </div>
            <div className="flex justify-center mx-auto gap-2 md:mt-[-80px] lg:mt-[-120px]">
                <a href="#item1" className="btn btn-xs"> <img src={images[0]} className="w-20" /></a>
                <a href="#item1" className="btn btn-xs"> <img src={images[1]} className="w-20" /></a>
                <a href="#item2" className="btn btn-xs"><img src={images[2]} className="w-20" /></a>
                <a href="#item3" className="btn btn-xs"><img src={images[3]} className="w-20" /></a>
            </div>
        </div>
    );
};


export default Banner;