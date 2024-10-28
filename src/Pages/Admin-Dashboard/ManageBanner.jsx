import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { GiConsoleController } from 'react-icons/gi';

const ManageBanner = () => {
    const id = '671fbcfe3f87c2fa1a20d8b5';
    const [banner, setBanner] = useState({
        title: '',
        description: '',
        video: '',
    });
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false); // Separate loading for video upload

    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const response = await fetch(`http://82.112.227.89:5000/home-banner`);
                const data = await response.json();
                const foundBanner = data.find(b => b._id === id);
                setBanner(foundBanner || { title: '', description: '', video: '' });
            } catch (error) {
                console.error('Error fetching banner:', error);
                toast.error('Failed to fetch banner');
            } finally {
                setLoading(false);
            }
        };

        fetchBanner();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBanner(prevBanner => ({ ...prevBanner, [name]: value }));
    };

    // Video Upload for Trailer to Backend
    const handleTrailerUpload = async (file) => {
        if (!file) return; // Early return if no file is selected

        const existingVideoUrl = banner.video;
        const formData = new FormData();
        formData.append('file', file);

        try {
            setUploading(true); // Set uploading state

            // Delete the existing video if it exists
            // if (existingVideoUrl) {
            //     await axios.delete('http://82.112.227.89:5000/delete-video', {
            //         data: { url: existingVideoUrl },
            //     });
            //     toast.success('Old video replaced');
            // }

            const response = await axios.post('http://82.112.227.89:5000/upload-video', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const { url } = response.data; // Assuming your backend returns the URL
            setBanner(prevBanner => ({ ...prevBanner, video: url })); // Update banner state
            toast.success('Video Uploaded Successfully');
        } catch (error) {
            console.error('Error uploading video:', error);
            toast.error('Video upload failed');
        } finally {
            setUploading(false); // Reset uploading state
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `http://82.112.227.89:5000/home-banner/${id}`,
                banner,
                {
                    headers: {
                        'Content-Type': 'application/json', // Ensure JSON content type
                    },
                }
            );
            if (response.data.result.acknowledged) {
                console.log('Banner updated successfully');
                toast.success('Banner updated successfully');
            } else {
                console.error('Failed to update banner');
            }
        } catch (error) {
            console.error('Error updating banner:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='py-20'>
            <h1>Manage Banner</h1>
            <form onSubmit={handleSubmit} className='mt-5'>
                {/* Title */}
                <div className="mb-4">
                    <label className="block text-sm font-medium">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={banner.title}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                {/* Description */}
                <div className="mb-4">
                    <label className="block text-sm font-medium">Description</label>
                    <textarea
                        name="description"
                        value={banner.description}
                        onChange={handleChange}
                        className="mt-1 block w-full h-32 p-2 border border-gray-300 rounded"
                        required
                    ></textarea>
                </div>
                {/* Video */}
                <div className="mb-4">
                    <label className="block text-sm font-medium">Video</label>
                    <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => handleTrailerUpload(e.target.files[0])}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    />
                    {banner.video && (
                        <p className="mt-2">Uploaded Trailer Video URL: {banner.video}</p>
                    )}
                    {uploading && <p>Uploading Trailer...</p>}
                </div>
                <button type='submit' className='btn bg-prime text-white'>Update Banner</button>
            </form>
        </div>
    );
};

export default ManageBanner;
