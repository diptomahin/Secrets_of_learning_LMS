import { Worker, Viewer, SpecialZoomLevel } from "@react-pdf-viewer/core";
import PropTypes from "prop-types";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "./pdfViewer.css";
const PdfViewer = ({ pdfUrl }) => {
  // Initialize the default layout plugin
  const defaultLayout = defaultLayoutPlugin();

  return (
    <div
      style={{
        height: "100vh", // Ensure full height for one page
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5", // Light background
      }}
    >
      <div
        style={{
          width: "100%", // Full width
          maxWidth: "800px", // Limit the maximum width
          height: "100vh", // Take the full height of the viewport
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Add shadow
          borderRadius: "10px", // Smooth corners
          overflow: "hidden", // Prevent any overflow
        }}
      >
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <Viewer
            fileUrl={pdfUrl}
            plugins={[defaultLayout]} // Use the layout plugin for navigation
            defaultScale={SpecialZoomLevel.PageFit} // Ensure single page fits height
          />
        </Worker>
      </div>
    </div>
  );
};

// Prop validation
PdfViewer.propTypes = {
  pdfUrl: PropTypes.string.isRequired, // Ensure pdfUrl is passed and is a string
};

export default PdfViewer;
