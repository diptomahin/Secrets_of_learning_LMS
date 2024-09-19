import { useState } from 'react';
import axios from 'axios'; // For making API requests to the server
import useAxios from '../../Hooks/UseAxios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddCourses = () => {

  const axiosPublic = useAxios();
  const navigate = useNavigate();

  const [courseData, setCourseData] = useState({
    title: '',
    trainer: '',
    description: '',
    short_description: '',
    offer: '',
    price: '',
    discount: '',
    status: 'Unavailable',
    students: '',
    reviews: '',
    positive_ratings: '',
    modules: [],
    whatYoullLearn: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({
      ...courseData,
      [name]: value,
    });
  };

  const handleModuleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedModules = [...courseData.modules];
    updatedModules[index][name] = value;
    setCourseData({ ...courseData, modules: updatedModules });
  };

  const handleAddModule = () => {
    const newModule = {
      id: courseData.modules.length + 1,
      title: '',
      video: ''
    };
    setCourseData({
      ...courseData,
      modules: [...courseData.modules, newModule],
    });
  };

  const handleRemoveModule = (index) => {
    const updatedModules = courseData.modules.filter((_, i) => i !== index);
    setCourseData({
      ...courseData,
      modules: updatedModules,
    });
  };

  // For "What You'll Learn"
  const handleWhatYouLearnChange = (e, index) => {
    const { value } = e.target;
    const updatedLearn = [...courseData.whatYoullLearn];
    updatedLearn[index] = value;
    setCourseData({ ...courseData, whatYoullLearn: updatedLearn });
  };

  const handleAddWhatYouLearn = () => {
    setCourseData({
      ...courseData,
      whatYoullLearn: [...courseData.whatYoullLearn, ''],
    });
  };

  const handleRemoveWhatYouLearn = (index) => {
    const updatedLearn = courseData.whatYoullLearn.filter((_, i) => i !== index);
    setCourseData({
      ...courseData,
      whatYoullLearn: updatedLearn,
    });
  };
 
  // Cloudinary Video Upload for Modules using Axios
  const handleVideoUpload = async (index, file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'video_preset'); // Replace with your Cloudinary preset

    try {
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

      // Update the module with the uploaded video URL
      const updatedModules = [...courseData.modules];
      updatedModules[index].video = videoUrl;
      setCourseData({ ...courseData, modules: updatedModules });
      toast.success('Video Uploaded')
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Data: ', courseData);
    // Submit the courseData to your backend or API here
    axiosPublic.post('/all-courses', courseData)
          .then(res => {
            if (res.data.insertedId) {
              console.log('Course added to the database')
              toast.success('Course added to the database')
              navigate('/admin-dashboard/manage-courses');
            }
          })
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

        <div className="mb-4">
          <label className="block text-sm font-medium">Thumbnail URL</label>
          <input
            type="text"
            name="thumbnail"
            value={courseData.thumbnail}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
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

        <h3 className="text-xl font-bold mb-2 mt-6">What You will Learn</h3>

        {courseData.whatYoullLearn.map((item, index) => (
          <div key={index} className="mb-4">
            <label className="block text-sm font-medium">Learning Item {index + 1}</label>
            <input
              type="text"
              value={item}
              onChange={(e) => handleWhatYouLearnChange(e, index)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
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


        {/* Module Section */}
        {/* Modules */}

        {/* Modules */}
        <h3 className="text-xl font-bold mt-5 mb-2">Modules</h3>
        {courseData.modules.map((module, index) => (
          <div key={module.id} className="mb-4 border-t pt-4">
            <h4 className="text-lg font-semibold mb-2">Module {module.id}</h4>

            <div className="mb-2">
              <label className="block text-sm font-medium">Title</label>
              <input
                type="text"
                name="title"
                value={module.title}
                onChange={(e) => handleModuleChange(e, index)}
                className="mt-1 block w-full p-2 border border-main rounded"
              />
            </div>

            <div className="mb-2">
              <label className="block text-sm font-medium">Upload Video</label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => handleVideoUpload(index, e.target.files[0])}
                className="mt-1 block w-full p-2 border border-main rounded"
              />
              {module.video && <p className="mt-2">Uploaded Video URL: {module.video}</p>}
            </div>

            <button
              type="button"
              onClick={() => handleRemoveModule(index)}
              className="mt-2 px-4 py-2 bg-prime text-white font-semibold rounded"
            >
              Remove Module
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddModule}
          className="mt-4 px-3 py-2 bg-prime text-white font-semibold rounded"
        >
          Add Module
        </button>


        <div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 px-4 w-full py-2 bg-primary text-white font-semibold rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCourses;