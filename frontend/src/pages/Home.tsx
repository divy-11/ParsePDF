import { useState } from 'react';
import { FileUpload } from '../components/FileUpload';
import { Layout } from '../components/Layout';
import axios from 'axios';

export function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [conversionResult, setConversionResult] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState<boolean>(false);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setConversionResult(null);
  };

  const handleConvert = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    try {
      setIsConverting(true);
      const formData = new FormData();
      formData.append("pdfFile", selectedFile);

      const response = await axios.post(
        "http://localhost:6060/api/conversion/convert",
        formData,
        { withCredentials: true }
      );

      // setConversionResult(response.data.xmlContent);
      console.log("Conversion Successful:", response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Conversion failed. Please try again.");
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
          <div className="mt-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-700">
                Selected file: {selectedFile.name}
              </p>
            </div>

            <button
              className={`mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg 
                          ${isConverting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"}`}
              onClick={handleConvert}
              disabled={isConverting}
            >
              {isConverting ? "Converting..." : "Convert to XML"}
            </button>
          </div>
        )}

        {conversionResult && (
          <div className="mt-6 bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-700">Conversion successful!</p>
            <pre className="bg-gray-100 p-2 rounded">{conversionResult}</pre>
          </div>
        )}
      </div>
    </Layout>
  );
}
