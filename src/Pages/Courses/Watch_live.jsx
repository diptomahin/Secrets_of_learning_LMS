import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UseLiveCourses from "../../Hooks/UseLivecourses";

import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import UseLoggedUser from "../../Hooks/UseLoggedUser";

const Watch_live = () => {
    const { id , title} = useParams();
    const {userData} = UseLoggedUser();
    const { liveCourses } = UseLiveCourses();
    const [course, setCourse] = useState({ title: "course" });
    const [modules, setModules] = useState({});
    const [isData, setIsData] = useState(false);
    const [videoTitle, setVideoTitle] = useState('Course Start');
    const [video, setVideo] = useState('');
    useEffect(() => {
        fetch(`https://api.ishaan.website/live-records`)
            .then(res => res.json())
            .then(data => {
                setModules(data.find(course => course.courseId == id));
                const findCourse = liveCourses.find(course => course._id == id);
                setCourse(findCourse);
                setVideo(modules?.modules[0]?.classes[0]?.video);
                setIsData(true);
            });
    }, [id, liveCourses, modules]);

    const handleVideoChange = (classItem) => {
        setVideoTitle(classItem.name);
        setVideo(classItem.video);
    };

    if (isData == true) {
        return (
            <div className="py-20">
                    <style>
                {`
                @keyframes bounce {
                    0%, 100% { transform: translate(0, 0); }
                    25% { transform: translate(20px, 20px); }
                    50% { transform: translate(0px, 40px); }
                    75% { transform: translate(-20px, 20px); }
                }
                .bouncing-overlay {
                    animation: bounce 5s infinite;
                    position: absolute;
                    color: red;
                    font-size: 1rem;
                    opacity: 0.7;
                }
                @media (max-width: 768px) {
                    .bouncing-overlay {
                        font-size: 0.8rem;
                        opacity: 0.6;
                    }
                }
            `}
            </style>

                {isData ? (
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mb-4">{title}</h1>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-11/12 mx-auto">
                            {/* Video Player */}
                            <div className="col-span-2 relative">
                                <h1 className="text-2xl font-semibold mb-2">{videoTitle}</h1>
                                <div className="relative">
                                    <video
                                        controls
                                        className="w-11/12 rounded-lg shadow-md"
                                        src={`https://api.ishaan.website${video}`}
                                        alt="Course Video"
                                    />
                                    <div className="bouncing-overlay " style={{ top: 30, left: 30 }}>
                                        {`User ID: ${userData._id} | Email: ${userData.email}`}
                                    </div>
                                </div>
                            </div>

                            {/* Modules and Classes */}
                            <div>
                                <h2 className="text-2xl font-semibold mb-3">Course Modules</h2>
                                <Accordion allowZeroExpanded>
                                    {modules.modules.map((item) => (
                                        <AccordionItem key={item.name}>
                                            <AccordionItemHeading>
                                                <AccordionItemButton>
                                                    {item.name}
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            {item.classes.map((classItem) => (
                                                <AccordionItemPanel
                                                    onClick={() => handleVideoChange(classItem)}
                                                    className="hover:bg-prime hover:text-white border-x-2 border-y-2 py-3 mb-2"
                                                    key={classItem.name}
                                                >
                                                    <span className="text-xl ml-3"> {classItem.name}</span>
                                                </AccordionItemPanel>
                                            ))}
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="py-20 text-center">
                        <h1>Loading ........</h1>
                    </div>
                )}
            </div>
        );
    }
    else {
        return (
            <div className="py-20 text-center">
                <h1>Loading ........</h1>
            </div>
        )
    }
};

export default Watch_live;
