import { useState } from "react";
import { FileUpload } from "../components/FileUpload";
import { Layout } from "../components/Layout";
import axios from "axios";
import XMLViewer from "react-xml-viewer";
import { useNavigate } from "react-router-dom";
import PdfPreview from "../components/PdfPreview";

export function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [conversionResult, setConversionResult] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [uploadedPdfUrl, setUploadedPdfUrl] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleFileSelect = (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage("File size exceeds 10MB limit!");
      return;
    }
    setSelectedFile(file);
    setConversionResult(null);
    setUploadedPdfUrl(URL.createObjectURL(file));
    setErrorMessage(null);
  };

  const handleConvert = async () => {
    if (!selectedFile) {
      setErrorMessage("Please select a file first!");
      return;
    }

    try {
      setIsConverting(true);
      setErrorMessage(null);
      const formData = new FormData();
      formData.append("pdfFile", selectedFile);
      const token = localStorage.getItem("token");
      if (!token) {
        navigate('/')
      }
      const response = await axios.post(
        "https://parsepdf.onrender.com/api/conversion/convert",
        formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
      );
      setConversionResult(response.data.newConversion.xmlContent);
      setShowPreview(false)
    } catch (err: any) {
      console.error("Error uploading file:", err);
      if (err.response?.status === 401) {
        setErrorMessage("Unauthorized! Please log in first.");
        navigate("/");
      } else {
        setErrorMessage("Conversion failed. Please try again.");
      }
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">
          Convert PDF to XML
        </h1>

        <FileUpload onFileSelect={handleFileSelect} />

        {selectedFile && (
          <div className="mt-6 flex items-center justify-between bg-blue-50 rounded-lg p-4">
            <div>
              <p className="text-sm text-blue-700 font-medium">{selectedFile.name}</p>
              <p className="text-xs text-gray-500">{(selectedFile.size / 1024).toFixed(2)} KB</p>
            </div>
            <button
              onClick={() => setSelectedFile(null)}
              className="text-red-600 hover:underline text-sm"
            >
              Remove
            </button>
          </div>
        )}

        {errorMessage && (
          <div className="mt-4 bg-red-50 text-red-700 p-3 rounded-lg text-sm">
            {errorMessage}
          </div>
        )}

        {!(conversionResult) && (
          <button
            className={`mt-4 w-full flex items-center justify-center bg-blue-600 text-white py-2 px-4 rounded-lg 
                        ${isConverting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"}`}
            onClick={handleConvert}
            disabled={isConverting}
          >
            {isConverting ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-2 border-t-2 border-white rounded-full" viewBox="0 0 24 24"></svg>
                Converting...
              </>
            ) : "Convert to XML"}
          </button>
        )}


        {uploadedPdfUrl && (selectedFile) && (
          <div className="mt-6 gap-6">
            {uploadedPdfUrl && (
              <div className="mt-4">

                <button
                  className="text-blue-600 text-sm hover:underline"
                  onClick={() => setShowPreview(!showPreview)}
                >
                  {showPreview ? "Hide Preview" : "Show Preview"}
                </button>


                {showPreview && <PdfPreview fileUrl={uploadedPdfUrl} />}
              </div>
            )}

            {conversionResult && (
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-700 font-medium">Conversion successful!</p>

                <div className="overflow-auto max-h-96 border p-2 bg-white rounded relative">
                  <XMLViewer xml={conversionResult} />


                  <button
                    className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 text-sm px-2 py-1 rounded"
                    onClick={() => navigator.clipboard.writeText(conversionResult)}
                  >
                    Copy
                  </button>
                </div>


                <button
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={() => {
                    const blob = new Blob([conversionResult], { type: "text/xml" });
                    const link = document.createElement("a");
                    link.href = URL.createObjectURL(blob);
                    link.download = "converted.xml";
                    link.click();
                  }}
                >
                  Download XML
                </button>
              </div>
            )}</div>
        )}
      </div>
    </Layout>
  );
}
