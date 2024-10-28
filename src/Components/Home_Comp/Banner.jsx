import { useEffect, useState } from "react";


const Banner = () => {

    const id = '671fbcfe3f87c2fa1a20d8b5'
    const [banner, setBanner] = useState({});
    useEffect(()=>{
        fetch(`http://82.112.227.89:5000/home-banner`)
        .then(res => res.json())
        .then(data => {
            setBanner(data.find(banner => banner._id == id))
        });
    },[])

    return (
        <div className="bg-main pt-20  h-screen">
            <div className=" w-11/12 mx-auto  items-center h-full py-2 md:py-5 lg:py-5">
                <div className="text-white h-1/2 lg:h-1/4  text-center">
                    <div className="mb-5">
                    <h1 className="text-4xl font-bold">{banner.title}</h1>
                    <p className="text-2xl font-semibold">
                        {banner.description}
                    </p>
                    </div>
                </div>
                <div className="h-1/2 lg:h-3/4">
                <video
                className="rounded-lg w-full h-full" 
                controls
                src={`http://82.112.227.89:5000${banner.video}`}>
                </video>
                </div>
            </div>
        </div>
    );
};

export default Banner;
