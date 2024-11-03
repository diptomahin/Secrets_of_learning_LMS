import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddLiveRecord = () => {
    const { id } = useParams(); // Get course id from URL
    const [modules, setModules] = useState([]); // Local state to manage modules
    const [videoFiles, setVideoFiles] = useState([]); // Array to store video files for each class
    const [uploadingIndex, setUploadingIndex] = useState(null); // Index of the class being uploaded
    const [courseData, setCourseData] = useState({});
    const [recordData, setRecordData] = useState({});
    //progress
    const [uploadProgress, setUploadProgress] = useState(0);
    const [showModal, setShowModal] = useState(false);

    // Fetch existing course records
    useEffect(() => {
        fetch('http://localhost:5000/live-records')
            .then(res => res.json())
            .then(data => {
                setRecordData(data.find(course => course.courseId === id));
                setModules(data.find(course => course.courseId === id)?.modules || []); // Initialize modules
            });
    }, [id]);

    // Fetch course data
    useEffect(() => {
        fetch('http://localhost:5000/live-courses')
            .then(res => res.json())
            .then(data => {
                setCourseData(data.find(course => course._id === id));
            });
    }, [id]);

    // Handle module change
    const handleModuleChange = (index, event) => {
        const { name, value } = event.target;
        const updatedModules = [...modules];
        updatedModules[index][name] = value;
        setModules(updatedModules);
    };

    // Handle class change within a module
    const handleClassChange = (moduleIndex, classIndex, event) => {
        const { name, value } = event.target;
        const updatedModules = [...modules];
        updatedModules[moduleIndex].classes[classIndex][name] = value;
        setModules(updatedModules);
    };

    // Add a new module
    const handleAddModule = () => {
        setModules([...modules, { name: "", classes: [{ name: "", video: "" }] }]);
    };



    // Add a new class to a module
    const handleAddClass = (moduleIndex) => {
        const updatedModules = [...modules];
        updatedModules[moduleIndex].classes.push({ name: "", video: "" });
        setModules(updatedModules);
    };

    // Remove a module and delete associated videos, then update the database
    const handleRemoveModule = async (index) => {
        const moduleToRemove = modules[index];
        if (moduleToRemove) {
            // Delete videos for all classes in this module
            await Promise.all(moduleToRemove.classes.map(async (classItem) => {
                if (classItem.video) {
                    await axios.delete('http://localhost:5000/delete-video', {
                        data: { url: classItem.video }
                    });
                    toast.success(`Deleted video for class: ${classItem.name}`);
                }
            }));
        }

        const updatedModules = modules.filter((_, i) => i !== index);
        setModules(updatedModules);

        // Update the database after removing the module
        await updateDatabase(updatedModules);
    };

    // Remove a class from a module, delete the associated video, then update the database
    const handleRemoveClass = async (moduleIndex, classIndex) => {
        const classToRemove = modules[moduleIndex].classes[classIndex];
        if (classToRemove && classToRemove.video) {
            // Delete the associated video
            await axios.delete('http://localhost:5000/delete-video', {
                data: { url: classToRemove.video }
            });
            toast.success(`Deleted video for class: ${classToRemove.name}`);
        }

        const updatedModules = [...modules];
        updatedModules[moduleIndex].classes = updatedModules[moduleIndex].classes.filter((_, i) => i !== classIndex);
        setModules(updatedModules);

        // Update the database after removing the class
        await updateDatabase(updatedModules);
    };

    // Function to update the database with the current modules structure
    const updateDatabase = async (updatedModules) => {
        const courseRecord = {
            courseId: id,
            modules: updatedModules.map(module => ({
                name: module.name,
                classes: module.classes.map(classItem => ({
                    name: classItem.name,
                    video: classItem.video
                }))
            }))
        };

        try {
            const response = await axios.put(`http://localhost:5000/live-records/${recordData._id}`, courseRecord, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                toast.success('Live record updated successfully!');
            } else {
                toast.error('Failed to update live record');
            }
        } catch (error) {
            console.error('Error updating live record:', error);
            alert('An error occurred while updating the live record.');
        }
    };


    // Handle video file selection for a specific class
    const handleVideoChange = (moduleIndex, classIndex, e) => {
        const file = e.target.files[0];
        setVideoFiles(prev => {
            const newVideoFiles = [...prev];
            newVideoFiles[moduleIndex] = newVideoFiles[moduleIndex] || [];
            newVideoFiles[moduleIndex][classIndex] = file; // Store file for the specific class
            return newVideoFiles;
        });
    };

    // Inside handleUploadVideo function

    const handleUploadVideo = async (moduleIndex, classIndex) => {
        const currentVideo = videoFiles[moduleIndex]?.[classIndex];
        if (!currentVideo) return;

        const existingVideoUrl = modules[moduleIndex].classes[classIndex].video;
        const formData = new FormData();
        formData.append('file', currentVideo);
        setShowModal(true); // Show modal on start
        setUploadingIndex(`${moduleIndex}-${classIndex}`);

        try {
            // Delete the existing video if it exists
            if (existingVideoUrl) {
                await axios.delete('http://localhost:5000/delete-video', {
                    data: { url: existingVideoUrl }
                });
                toast.success('Old video replaced');
            }

            // Upload the new video with progress tracking
            const response = await axios.post('http://localhost:5000/upload-video', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(percentCompleted);
                }
            });

            toast.success('Video uploaded');
            const { url } = response.data;

            // Update the module with the new video URL in the frontend state
            const updatedModules = [...modules];
            updatedModules[moduleIndex].classes[classIndex].video = url;
            setModules(updatedModules);

            // Automatically submit the updated modules to the backend
            await handleSubmit();

            setVideoFiles(prev => {
                const newVideoFiles = [...prev];
                newVideoFiles[moduleIndex][classIndex] = null;
                return newVideoFiles;
            });
        } catch (error) {
            console.error('Error with video upload or delete:', error);
            toast.error('Failed to upload video');
        } finally {
            setUploadingIndex(null);
            setShowModal(false); // Hide modal after completion
            setUploadProgress(0); // Reset progress
        }
    };

    // Modify handleSubmit to make it reusable by accepting an event argument that is optional
    const handleSubmit = async (event) => {
        if (event) event.preventDefault(); // Prevent default behavior if called from form submit
        const courseRecord = {
            courseId: id,
            modules: modules.map(module => ({
                name: module.name,
                classes: module.classes.map(classItem => ({
                    name: classItem.name,
                    video: classItem.video
                }))
            }))
        };

        try {
            const response = await axios.put(`http://localhost:5000/live-records/${recordData._id}`, courseRecord, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                toast.success('Live record updated successfully!');
            } else {
                toast.error('Failed to update live record');
            }
        } catch (error) {
            console.error('Error submitting live record:', error);
            toast.error('An error occurred while updating the live record.');
        }
    };


    if (recordData.courseId) {
        return (
            <div className="max-w-2xl mx-auto mt-10 p-5 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Add Live Record for Course: {courseData.title}</h2>

                {/* Upload Progress Modal */}
                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-75">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 text-center">
                            <h3 className="text-lg font-semibold mb-4">Uploading Video...</h3>
                            <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                                <div
                                    className="bg-blue-500 h-4 rounded-full"
                                    style={{ width: `${uploadProgress}%` }}
                                ></div>
                            </div>
                            <p>{uploadProgress}%</p>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <h2 className="text-xl font-semibold text-gray-700">Update Modules and Classes</h2>
                    {modules.map((module, moduleIndex) => (
                        <div key={moduleIndex} className="mb-4 border rounded-lg p-4 bg-gray-100">
                            <h3 className="text-lg font-semibold text-gray-600">Module {moduleIndex + 1}</h3>
                            <input
                                type="text"
                                name="name"
                                placeholder="Module Name"
                                value={module.name}
                                onChange={(e) => handleModuleChange(moduleIndex, e)}
                                className="mt-2 mb-2 p-2 border rounded w-full"
                            />
                            <button
                                type="button"
                                onClick={() => handleAddClass(moduleIndex)}
                                className="mr-2 px-4 py-2  bg-secondary text-white rounded hover:bg-main"
                            >
                                Add Class
                            </button>
                            <button
                                type="button"
                                onClick={() => handleRemoveModule(moduleIndex)}
                                className="px-4 py-2  bg-red text-white rounded hover:bg-success"
                            >
                                Remove Module
                            </button>
                            <div className="mt-4">
                                {module.classes.map((classItem, classIndex) => (
                                    <div key={classIndex} className="mb-2 border p-2 rounded bg-gray-50">
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Class Name"
                                            value={classItem.name}
                                            onChange={(e) => handleClassChange(moduleIndex, classIndex, e)}
                                            className="mb-2 p-2 border rounded w-full"
                                        />
                                        <div className='flex gap-2'>
                                            <input
                                                type="file"
                                                onChange={(e) => handleVideoChange(moduleIndex, classIndex, e)}
                                                className="mb-2 p-2 border rounded w-full"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleUploadVideo(moduleIndex, classIndex)}
                                                className="px-2 btn bg-success text-white rounded hover:bg-main"
                                            >
                                                Upload
                                            </button>
                                        </div>
                                        {classItem.video && (
                                            <div className="mb-2">
                                                <video
                                                    controls
                                                    
                                                    className='w-1/2'
                                                    src={`http://localhost:5000${classItem.video}`}></video>
                                            </div>
                                        )}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveClass(moduleIndex, classIndex)}
                                            className="px-4 py-2 bg-red-500 bg-red text-white rounded hover:bg-success"
                                        >
                                            Remove Class
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleAddModule}
                        className="mb-4 px-4 py-2 b bg-main text-white rounded hover:bg-success"
                    >
                        Add Module
                    </button>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-prime text-white rounded hover:bg-success"
                    >
                        Submit
                    </button>
                </form>
            </div>
        );
    } else {
        return (
            <div className='mt-10 text-center'>
                <h1>Loading..........</h1>
            </div>
        );
    }
};

export default AddLiveRecord;
