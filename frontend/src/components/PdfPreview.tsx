import { Worker, Viewer } from "@react-pdf-viewer/core";
import { zoomPlugin } from "@react-pdf-viewer/zoom";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/zoom/lib/styles/index.css";
import { useState } from "react";

const PdfPreview = ({ fileUrl }: { fileUrl: string }) => {
    const zoomPluginInstance = zoomPlugin();
    const { ZoomInButton, ZoomOutButton, ZoomPopover } = zoomPluginInstance;

    const [loading, setLoading] = useState(true);

    return (
        <div className="w-full h-[500px] border rounded-lg shadow-lg bg-gray-100 flex flex-col">
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                <div className="flex justify-between p-2 bg-gray-200 rounded-t-lg">
                    <div className="flex space-x-2">
                        <ZoomOutButton />
                        <ZoomPopover />
                        <ZoomInButton />
                    </div>
                </div>

                {/* PDF Viewer */}
                <div className="flex-1 flex items-center justify-center relative overflow-hidden">
                    {loading && (
                        <p className="absolute text-gray-600">Loading PDF...</p>
                    )}
                    <Viewer
                        fileUrl={fileUrl}
                        plugins={[zoomPluginInstance]}
                        onDocumentLoad={() => setLoading(false)}
                    />

                </div>
            </Worker>
        </div>
    );
};

export default PdfPreview;
