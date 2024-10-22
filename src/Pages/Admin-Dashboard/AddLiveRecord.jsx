import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';

const AddLiveRecord = () => {
    const { id } = useParams(); // Get course id from URL
    const [modules, setModules] = useState([]);
    const [currentModuleName, setCurrentModuleName] = useState('');
    const [currentClassName, setCurrentClassName] = useState('');
    const [videoFiles, setVideoFiles] = useState([]); // Array to store video files for each class
    const [uploadingIndex, setUploadingIndex] = useState(null); // Index of the class being uploaded
    const [courseData, setCourseData] = useState({});

    useEffect(() => {
        fetch('https://secrets-of-learning-server.onrender.com/live-courses')
            .then(res => res.json())
            .then(data => {
                setCourseData(data.find(course => course._id === id));
            });
    }, [id]);

    // Handle adding a new module
    const handleAddModule = () => {
        if (currentModuleName.trim()) {
            setModules([...modules, { name: currentModuleName, classes: [] }]);
            setCurrentModuleName(''); // Clear input after adding module
        }
    };

    // Handle adding a new class to a specific module
    const handleAddClass = (moduleIndex) => {
        if (currentClassName.trim()) {
            const updatedModules = [...modules];
            updatedModules[moduleIndex].classes.push({ name: currentClassName, video: null });
            setModules(updatedModules);
            setCurrentClassName(''); // Clear input after adding class
            setVideoFiles(prev => {
                const newVideoFiles = [...prev];
                newVideoFiles[moduleIndex] = newVideoFiles[moduleIndex] || [];
                newVideoFiles[moduleIndex].push(null); // Initialize for new class
                return newVideoFiles;
            });
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

    // Handle uploading video for a specific class
    const handleUploadVideo = async (moduleIndex, classIndex) => {
        const currentVideo = videoFiles[moduleIndex]?.[classIndex];
        if (!currentVideo) return;

        const formData = new FormData();
        formData.append('file', currentVideo);

        setUploadingIndex(`${moduleIndex}-${classIndex}`); // Set uploading index

        try {
            const response = await axios.post('http://localhost:5000/upload-video', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const { url } = response.data; // Adjust based on your backend response structure

            // Update the specific class with the uploaded video URL
            const updatedModules = [...modules];
            updatedModules[moduleIndex].classes[classIndex].video = url;
            setModules(updatedModules);

            // Reset file input after upload
            setVideoFiles(prev => {
                const newVideoFiles = [...prev];
                newVideoFiles[moduleIndex][classIndex] = null; // Clear uploaded file
                return newVideoFiles;
            });
        } catch (error) {
            console.error('Video upload failed', error);
        } finally {
            setUploadingIndex(null); // Reset uploading index
        }
    };

    // Handle submitting the full course data
    const handleSubmit = async () => {
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
            const response = await axios.post('http://localhost:5000/live-records', courseRecord, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                alert('Live record updated successfully!');
            } else {
                alert('Failed to update live record');
            }
        } catch (error) {
            console.error('Error submitting live record:', error);
            alert('An error occurred while updating the live record.');
        }
    };

    return (
        <div style={{ maxWidth: '800px', marginTop: '20px', padding: '20px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Add Live Record for Course ID: {courseData.title}</h2>

        {/* Add New Module */}
        <div style={{ marginBottom: '30px', textAlign: 'center' }}>
            <input
                type="text"
                placeholder="Enter Module Name"
                value={currentModuleName}
                onChange={(e) => setCurrentModuleName(e.target.value)}
                style={{
                    padding: '10px',
                    borderRadius: '8px',
                    border: '2px solid #ccc',
                    width: '60%',
                    marginRight: '10px',
                }}
            />
            <button
                onClick={handleAddModule}
                style={{
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    padding: '10px 15px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                }}
            >
                Add Module
            </button>
        </div>

        {/* List of Modules */}
        {modules.map((module, moduleIndex) => (
            <div
                key={moduleIndex}
                style={{
                    border: '2px solid #007BFF',
                    borderRadius: '10px',
                    padding: '20px',
                    marginBottom: '20px',
                }}
            >
                <h3 style={{ color: '#007BFF' }}>{module.name}</h3>

                {/* Add Class to the Module */}
                <div style={{ marginBottom: '20px' }}>
                    <input
                        type="text"
                        placeholder="Enter Class Name"
                        value={currentClassName}
                        onChange={(e) => setCurrentClassName(e.target.value)}
                        style={{
                            padding: '8px',
                            borderRadius: '6px',
                            border: '2px solid #ccc',
                            width: '60%',
                            marginRight: '10px',
                        }}
                    />
                    <button
                        onClick={() => handleAddClass(moduleIndex)}
                        style={{
                            backgroundColor: '#FF5722',
                            color: 'white',
                            padding: '8px 15px',
                            borderRadius: '6px',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                    >
                        Add Class
                    </button>
                </div>

                {/* List of Classes within the Module */}
                {module.classes.length > 0 && (
                    <div>
                        {module.classes.map((classItem, classIndex) => (
                            <div
                                key={classIndex}
                                style={{
                                    marginBottom: '20px',
                                    padding: '10px',
                                    border: '1px solid #ddd',
                                    borderRadius: '6px',
                                }}
                            >
                                <p><strong>Class:</strong> {classItem.name}</p>

                                {/* Video Upload for Each Class */}
                                <input
                                    type="file"
                                    accept="video/*"
                                    onChange={(e) => handleVideoChange(moduleIndex, classIndex, e)}
                                    style={{
                                        marginRight: '10px',
                                    }}
                                />
                                <button
                                    onClick={() => handleUploadVideo(moduleIndex, classIndex)}
                                    style={{
                                        backgroundColor: '#2196F3',
                                        color: 'white',
                                        padding: '8px 12px',
                                        borderRadius: '6px',
                                        border: 'none',
                                        cursor: 'pointer',
                                        marginRight: '10px',
                                    }}
                                    disabled={!videoFiles[moduleIndex]?.[classIndex] || uploadingIndex === `${moduleIndex}-${classIndex}`}
                                >
                                    {uploadingIndex === `${moduleIndex}-${classIndex}` ? 'Uploading...' : 'Upload Video'}
                                </button>

                                {/* Display the uploaded video link */}
                                {classItem.video && (
                                    <p>
                                        Video uploaded: <a href={classItem.video} target="_blank" rel="noopener noreferrer">View Video</a>
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        ))}

        {/* Submit Button */}
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <button
                onClick={handleSubmit}
                style={{
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                }}
            >
                Submit Live Record
            </button>
        </div>
    </div>
    );
};

export default AddLiveRecord;
