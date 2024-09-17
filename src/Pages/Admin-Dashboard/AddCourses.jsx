import { useState } from 'react';

const AddCourses = () => {

  const [courseData, setCourseData] = useState({
    title: '',
    trainer: '',
    description: '',
    short_description: '',
    thumbnail: '',
    offer: '',
    price: '',
    discount: '',
    status: 'Available',
    students: '',
    reviews: '',
    positive_ratings: '',
    modules: [

    ],
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Data: ', courseData);
    // Submit the courseData to your backend or API here
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
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
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

      {/* Module Section */}
      <h3 className="text-xl font-bold mb-2">Modules</h3>
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
            <label className="block text-sm font-medium">Video URL</label>
            <input
              type="text"
              name="video"
              value={module.video}
              onChange={(e) => handleModuleChange(e, index)}
              className="mt-1 block w-full p-2 border border-main rounded"
            />
          </div>

          {/* Button to remove a module */}
          <button
            type="button"
            onClick={() => handleRemoveModule(index)}
            className="mt-2 px-4 py-2 bg-prime text-white font-semibold rounded"
          >
            Remove Module
          </button>
        </div>
      ))}

      {/* Button to add a new module */}
      <button
        type="button"
        onClick={handleAddModule}
        className="mt-4 px-4 py-2 bg-prime text-white font-semibold rounded"
      >
        Add Module
      </button>

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-primary text-white font-semibold rounded"
      >
        Submit
      </button>
    </form> 
        </div>
    );
};

export default AddCourses;