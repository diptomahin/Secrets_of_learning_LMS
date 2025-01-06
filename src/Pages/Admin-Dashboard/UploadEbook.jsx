import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const UploadEbook = () => {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    url: "",
    description: "",
    pdf: null, // Handle the file separately
    preview: null, // Preview file
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
  const handlePreviewChange = (e) => {
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

    // Append the PDF file
    if (formData.pdf) {
      data.append("pdf", formData.pdf);
    }

    // Append the preview file
    if (formData.preview) {
      data.append("preview", formData.preview);
    }

    try {
      // Step 1: Upload the PDF and preview file
      const uploadResponse = await axios.post(
        "http://localhost:5000/upload/ebook",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (uploadResponse.data.filePath) {
        toast.success("Ebook uploaded successfully!");
      }

      // Get the uploaded files' paths or URLs
      const uploadedPdfPath = uploadResponse.data.pdfPath; // Assume backend sends the file path for PDF
      const uploadedPreviewPath = uploadResponse.data.previewPath; // Assume backend sends the file path for preview

      // Step 2: Post the form data to the database with uploaded file paths
      const databasePayload = {
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

      const dbResponse = await axios.post(
        "http://localhost:5000/all-ebooks",
        databasePayload
      );

      console.log("Ebook saved to database:", dbResponse.data);
      toast.success("Ebook uploaded and saved successfully!");
    } catch (error) {
      console.error("Error during submission:", error);
      toast.error("Failed to upload and save ebook.");
    }
  };

  return (
    <div className="mt-10">
      <form
        onSubmit={handleSubmit}
        className="max-w-11/12 mx-auto p-6 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Upload Ebook</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Title:
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Subtitle:
          </label>
          <input
            type="text"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            required
            className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            URL:
          </label>
          <input
            type="text"
            name="url"
            value={formData.url}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Description:
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price (Actual):
            </label>
            <input
              type="text"
              value={formData.price.actualPrice}
              onChange={(e) => handleNestedChange(e, "price", "actualPrice")}
              className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price (Discounted):
            </label>
            <input
              type="text"
              value={formData.price.discountedPrice}
              onChange={(e) =>
                handleNestedChange(e, "price", "discountedPrice")
              }
              className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Currency:
          </label>
          <input
            type="text"
            value={formData.price.currency}
            onChange={(e) => handleNestedChange(e, "price", "currency")}
            className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Highlights:
          </label>
          {formData.highlights.map((highlight, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={highlight}
                onChange={(e) => handleHighlightChange(e, index)}
                className="flex-grow mt-1 px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addHighlight}
            className="mt-2 text-sm text-blue-600 hover:underline"
          >
            + Add Highlight
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            FAQ:
          </label>
          {formData.faq.map((item, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                placeholder="Question"
                value={item.question}
                onChange={(e) => handleFaqChange(e, index, "question")}
                className="w-full mb-2 px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="text"
                placeholder="Answer"
                value={item.answer}
                onChange={(e) => handleFaqChange(e, index, "answer")}
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addFaq}
            className="mt-2 text-sm text-blue-600 hover:underline"
          >
            + Add FAQ
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Total Pages:
          </label>
          <input
            type="text"
            value={formData.contentDetails.totalPages}
            onChange={(e) =>
              handleNestedChange(e, "contentDetails", "totalPages")
            }
            className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Disclaimer:
          </label>
          <textarea
            name="disclaimer"
            value={formData.disclaimer}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            PDF File:
          </label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="w-full mt-1"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Preview File:
          </label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handlePreviewChange}
            className="w-full mt-1"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-prime text-white rounded-md shadow hover:bg-success focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Upload Ebook
        </button>
      </form>
    </div>
  );
};

export default UploadEbook;
