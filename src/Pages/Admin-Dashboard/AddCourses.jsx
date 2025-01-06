import { useState } from 'react';
import axios from 'axios'; // For making API requests to the server
import useAxios from '../../Hooks/UseAxios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddCourses = () => {

  const axiosPublic = useAxios();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [courseData, setCourseData] = useState({
    title: '',
    trainer: '',
    description: '',
    short_description: '',
    trailer: '',
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

  // Video Upload for Trailer to Backend
  const handleTrailerUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/upload-video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const { url } = response.data; // Assuming your backend returns the URL
      setCourseData({ ...courseData, trailer: url });
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
    axiosPublic.post('/all-courses', courseData)
      .then(res => {
        if (res.data.insertedId) {
          const classRecords = {
            courseId: res.data.insertedId,
            modules: [{ name: "", classes: [{ name: "", video: "" }] }]
          }
          axiosPublic.post('/class-records', classRecords)
            .then(res => {
              if (res.data.insertedId) {
                toast.success('Course added successfully');
                navigate('/admin-dashboard/manage-courses');
              }
            })
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

        {/* Dynamic "What You'll Learn" Section */}
        <div className='my-4 card card-compact bg-base-100 p-3 border-main border-x-2 border-y-2 shadow-xl'>
          <h3 className="text-xl font-bold mb-2">What You'll Learn</h3>
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
                className="mt-2 px-4 py-2 bg-main text-white font-semibold rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddWhatYouLearn}
            className="mt-2 px-3 py-2 bg-prime text-white font-semibold rounded"
          >
            Add Learning Item
          </button>
        </div>
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