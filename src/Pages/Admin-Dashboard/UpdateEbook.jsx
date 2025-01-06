import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const UpdateEbook = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    url: "",
    description: "",
    pdf: null,
    preview: null,
    price: {
      actualPrice: "",
      discountedPrice: "",
      currency: "টাকা",
    },
    highlights: [""],
    contentDetails: {
      totalPages: "",
      fileFormat: "PDF",
      ebookLink: "",
    },
    faq: [{ question: "", answer: "" }],
    disclaimer: "",
  });

  // Fetch the existing ebook data when the component mounts
  useEffect(() => {
    const fetchEbookData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/all-ebooks/${id}`
        );
        const ebook = response.data;

        setFormData({
          title: ebook.title,
          subtitle: ebook.subtitle,
          url: ebook.url,
          description: ebook.description,
          pdf: ebook.pdf, // Assuming this is the file URL/path
          preview: ebook.preview, // Assuming this is the preview file URL/path
          price: ebook.price,
          highlights: ebook.highlights,
          contentDetails: ebook.contentDetails,
          faq: ebook.faq,
          disclaimer: ebook.disclaimer,
        });
      } catch (error) {
        console.error("Error fetching ebook data:", error);
        toast.error("Failed to fetch ebook data.");
      }
    };

    fetchEbookData();
  }, [id]);

  // Handle change for text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle nested fields like price or contentDetails
  const handleNestedChange = (e, groupName, fieldName) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [groupName]: {
        ...prev[groupName],
        [fieldName]: value,
      },
    }));
  };

  // Handle file input for PDF
  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      pdf: e.target.files[0],
    }));
  };

  // Handle file input for Preview
  const handlePreviewFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      preview: e.target.files[0],
    }));
  };

  // Add new highlight
  const addHighlight = () => {
    setFormData((prev) => ({
      ...prev,
      highlights: [...prev.highlights, ""],
    }));
  };

  // Update highlight
  const handleHighlightChange = (e, index) => {
    const newHighlights = [...formData.highlights];
    newHighlights[index] = e.target.value;
    setFormData((prev) => ({
      ...prev,
      highlights: newHighlights,
    }));
  };

  // Add new FAQ
  const addFaq = () => {
    setFormData((prev) => ({
      ...prev,
      faq: [...prev.faq, { question: "", answer: "" }],
    }));
  };

  // Update FAQ
  const handleFaqChange = (e, index, field) => {
    const newFaq = [...formData.faq];
    newFaq[index][field] = e.target.value;
    setFormData((prev) => ({
      ...prev,
      faq: newFaq,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    // Append all form data
    data.append("title", formData.title);
    data.append("subtitle", formData.subtitle);
    data.append("url", formData.url);
    data.append("description", formData.description);
    data.append("priceActual", formData.price.actualPrice);
    data.append("priceDiscounted", formData.price.discountedPrice);
    data.append("currency", formData.price.currency);
    data.append("totalPages", formData.contentDetails.totalPages);
    data.append("fileFormat", formData.contentDetails.fileFormat);
    data.append("disclaimer", formData.disclaimer);

    // Append highlights and FAQ as JSON
    data.append("highlights", JSON.stringify(formData.highlights));
    data.append("faq", JSON.stringify(formData.faq));

    // Append the new or existing PDF file
    if (formData.pdf && typeof formData.pdf !== "string") {
      data.append("pdf", formData.pdf);
    }

    // Append the new or existing preview file
    if (formData.preview && typeof formData.preview !== "string") {
      data.append("preview", formData.preview);
    }

    try {
      // Step 1: Upload the updated PDF and preview file (if any)
      const uploadResponse = await axios.post(
        `http://localhost:5000/upload/ebook/${id}`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (uploadResponse.data.filePath) {
        toast.success("Ebook updated successfully!");
      }

      // Get the uploaded files' paths or URLs
      const uploadedPdfPath = uploadResponse.data.pdfPath || formData.pdf; // Fallback to existing file path
      const uploadedPreviewPath =
        uploadResponse.data.previewPath || formData.preview; // Fallback to existing preview path

      // Step 2: Post the updated data to the database with new or unchanged file paths
      const updatedPayload = {
        title: formData.title,
        subtitle: formData.subtitle,
        url: formData.url,
        pdf: uploadedPdfPath,
        preview: uploadedPreviewPath,
        price: {
          actualPrice: formData.price.actualPrice,
          discountedPrice: formData.price.discountedPrice,
          currency: formData.price.currency,
        },
        highlights: formData.highlights,
        faq: formData.faq,
        contentDetails: {
          totalPages: formData.contentDetails.totalPages,
          fileFormat: formData.contentDetails.fileFormat,
          ebookLink: uploadedPdfPath, // Use the uploaded PDF's path
        },
        disclaimer: formData.disclaimer,
      };

      const dbResponse = await axios.put(
        `http://localhost:5000/all-ebooks/${id}`,
        updatedPayload
      );

      console.log("Ebook updated in database:", dbResponse.data);
      toast.success("Ebook updated and saved successfully!");
    } catch (error) {
      console.error("Error during update:", error);
      toast.error(error.massage);
    }
  };

  return (
    <div className="mt-10">
      <form
        onSubmit={handleSubmit}
        className="max-w-11/12 mx-auto p-6 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Update Ebook</h2>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-main">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full mt-1 border rounded p-2"
            required
          />
        </div>

        {/* Subtitle */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-main">
            Subtitle
          </label>
          <input
            type="text"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            className="w-full mt-1 border rounded p-2"
            required
          />
        </div>

        {/* URL */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-main">URL</label>
          <input
            type="text"
            name="url"
            value={formData.url}
            onChange={handleChange}
            className="w-full mt-1 border rounded p-2"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-main">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full mt-1 border rounded p-2"
            rows="4"
          />
        </div>

        {/* Price */}
        <div className="mb-4 flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-main">
              Actual Price
            </label>
            <input
              type="string"
              name="priceActual"
              value={formData.price.actualPrice}
              onChange={(e) => handleNestedChange(e, "price", "actualPrice")}
              className="w-full mt-1 border rounded p-2"
              required
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-main">
              Discounted Price
            </label>
            <input
              type="string"
              name="priceDiscounted"
              value={formData.price.discountedPrice}
              onChange={(e) =>
                handleNestedChange(e, "price", "discountedPrice")
              }
              className="w-full mt-1 border rounded p-2"
            />
          </div>
        </div>

        {/* File Uploads */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            PDF File:
          </label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="w-full mt-1 border rounded p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Preview File:
          </label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handlePreviewFileChange}
            className="w-full mt-1 border rounded p-2"
          />
        </div>

        {/* Highlights */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Highlights
          </label>
          {formData.highlights.map((highlight, index) => (
            <div key={index} className="flex gap-4 mb-2">
              <input
                type="text"
                value={highlight}
                onChange={(e) => handleHighlightChange(e, index)}
                className="w-full mt-1 border rounded p-2"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addHighlight}
            className="text-white text-sm bg-success p-3"
          >
            Add Highlight
          </button>
        </div>

        {/* FAQ */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">FAQ</label>
          {formData.faq.map((faq, index) => (
            <div key={index} className="flex gap-4 mb-2">
              <input
                type="text"
                value={faq.question}
                onChange={(e) => handleFaqChange(e, index, "question")}
                className="w-full mt-1 border rounded p-2"
                placeholder="Question"
              />
              <input
                type="text"
                value={faq.answer}
                onChange={(e) => handleFaqChange(e, index, "answer")}
                className="w-full mt-1 border rounded p-2"
                placeholder="Answer"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addFaq}
            className="text-white text-sm bg-success p-3"
          >
            Add FAQ
          </button>
        </div>

        {/* Disclaimer */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Disclaimer
          </label>
          <textarea
            name="disclaimer"
            value={formData.disclaimer}
            onChange={handleChange}
            className="w-full mt-1 border rounded p-2"
            rows="4"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-prime text-white rounded-md shadow hover:bg-success focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Update Ebook
        </button>
      </form>
    </div>
  );
};

export default UpdateEbook;
