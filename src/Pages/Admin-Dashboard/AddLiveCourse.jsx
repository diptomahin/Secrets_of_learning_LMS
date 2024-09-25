import { useState } from 'react';
import axios from 'axios'; // For making API requests to the server
import useAxios from '../../Hooks/UseAxios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddLiveCourses = () => {
  const axiosPublic = useAxios();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [courseData, setCourseData] = useState({
    title: '',
    trainer: '',
    description: '',
    short_description: '',
    trailer: '', // Updated field name for the trailer video URL
    offer: '',
    price: '',
    discount: '',
    status: 'Unavailable',
    students: '',
    reviews: '',
    positive_ratings: '',
    whatYoullLearn: [{ topic: '', description: '' }]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({
      ...courseData,
      [name]: value,
    });
  };

  // For "What You'll Learn"
  const handleWhatYouLearnChange = (e, index, field) => {
    const { value } = e.target;
    const updatedLearn = [...courseData.whatYoullLearn];
    updatedLearn[index][field] = value;
    setCourseData({ ...courseData, whatYoullLearn: updatedLearn });
  };

  const handleAddWhatYouLearn = () => {
    setCourseData({
      ...courseData,
      whatYoullLearn: [...courseData.whatYoullLearn, { topic: '', description: '' }],
    });
  };

  const handleRemoveWhatYouLearn = (index) => {
    const updatedLearn = courseData.whatYoullLearn.filter((_, i) => i !== index);
    setCourseData({
      ...courseData,
      whatYoullLearn: updatedLearn,
    });
  };

  // Cloudinary Video Upload for Trailer
  const handleTrailerUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'video_preset'); // Replace with your Cloudinary preset

    try {
      setLoading(true);
      const cloudName = import.meta.env.VITE_cloudinaryCloudeName;
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      const videoUrl = res.data.secure_url;
      
      // Update the trailer with the uploaded video URL
      setCourseData({ ...courseData, trailer: videoUrl });
      toast.success('Trailer Uploaded Successfully');
      setLoading(false);
    } catch (error) {
      console.error('Error uploading trailer:', error);
      setLoading(false);
      toast.error('Trailer upload failed');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Data: ', courseData);
    // Submit the courseData to your backend or API here
    axiosPublic.post('/live-courses', courseData)
      .then(res => {
        if (res.data.insertedId) {
          console.log('Course added to the database');
          toast.success('Course added to the database');
          navigate('/admin-dashboard/manage-courses');
        }
      });
  };

  return (
    <div className='mt-10'>
      <form className="p-6 bg-white shadow-md rounded-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Course Information</h2>

        {/* Other input fields like title, trainer, description, etc. */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={courseData.title}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Trainer</label>
          <input
            type="text"
            name="trainer"
            value={courseData.trainer}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={courseData.description}
            onChange={handleChange}
            className="mt-1 block w-full h-56 p-2 border border-gray-300 rounded"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Short Description</label>
          <textarea
            name="short_description"
            value={courseData.short_description}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          ></textarea>
        </div>

        {/* Trailer Upload */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Trailer</label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => handleTrailerUpload(e.target.files[0])}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
          {courseData.trailer && (
            <p className="mt-2">Uploaded Trailer Video URL: {courseData.trailer}</p>
          )}
          {loading && <p>Uploading Trailer...</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Offer</label>
          <input
            type="text"
            name="offer"
            value={courseData.offer}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={courseData.price}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Discount</label>
          <input
            type="text"
            name="discount"
            value={courseData.discount}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Status</label>
          <select
            name="status"
            value={courseData.status}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          >
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>
        </div>

        {/* What You'll Learn */}
        <h3 className="text-xl font-bold mb-2 mt-6">What You Will Learn</h3>
        {courseData.whatYoullLearn.map((item, index) => (
          <div key={index} className="mb-4">
            <label className="block text-sm font-medium">Learning Topic {index + 1}</label>
            <input
              type="text"
              value={item.topic}
              onChange={(e) => handleWhatYouLearnChange(e, index, 'topic')}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              placeholder="Topic"
            />
            <label className="block text-sm font-medium mt-2">Description</label>
            <textarea
              value={item.description}
              onChange={(e) => handleWhatYouLearnChange(e, index, 'description')}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              placeholder="Description"
            />
            <button
              type="button"
              onClick={() => handleRemoveWhatYouLearn(index)}
              className="mt-2 px-4 py-2 bg-prime text-white font-semibold rounded"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddWhatYouLearn}
          className="mt-3 px-3 py-2 bg-prime text-white font-semibold rounded"
        >
          Add Learning Item
        </button>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="mt-4 px-4 w-full py-2 bg-primary text-white font-semibold rounded"
            disabled={loading}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddLiveCourses;
