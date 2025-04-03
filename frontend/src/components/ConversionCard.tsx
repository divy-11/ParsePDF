import { useState } from 'react';
import { FileText, Download, Copy, Eye, Check } from 'lucide-react';
import { Conversion } from '../types';

interface ConversionCardProps {
  conversion: Conversion;
  isExpanded: boolean;
  isToggle: (id: string) => void;
}

export function ConversionCard({ conversion, isExpanded, isToggle }: ConversionCardProps) {
  const [copied, setCopied] = useState(false)
  const handleCopyXml = async () => {
    await navigator.clipboard.writeText(conversion.xmlContent)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500);
  };

  const handleDownload = () => {
    const blob = new Blob([conversion.xmlContent], { type: 'text/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${conversion.fileName}.xml`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center cursor-pointer" onClick={() => isToggle(conversion._id)}>
          <FileText className="h-8 w-8 text-blue-600" />
          <div className="ml-3 w-full">
            <div className="text-sm font-medium text-gray-900">{conversion.fileName}</div>
            <div className="mt-2 space-y-1 text-xs text-gray-600">
              <p><span className="font-medium text-gray-800">Original Size:</span> {(conversion.originalSize / 1024).toFixed(2)} KB</p>
              <p><span className="font-medium text-gray-800">Converted Size:</span> {(conversion.convertedSize / 1024).toFixed(2)} KB</p>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="p-1 text-gray-500 hover:text-gray-700 transition" title="Copy XML" onClick={handleCopyXml}>
            {copied ? <Check className="h-5 w-5 text-green-600" /> : <Copy className="h-5 w-5" />}
          </button>
          <button className="p-1 text-gray-500 hover:text-gray-700" title="Download XML" onClick={handleDownload}>
            <Download className="h-5 w-5" />
          </button>
          <button
            className="p-1 text-gray-500 hover:text-gray-700"
            title="Expand/Collapse"
            onClick={() => isToggle(conversion._id)}
          >
            <Eye className={`h-5 w-5 ${isExpanded ? "text-blue-600" : ""}`} />
          </button>
        </div>
      </div>
      <div className="mt-3 flex justify-between">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Completed
        </span>
        <div className="text-sm text-gray-500 ml-6">{new Date(conversion.createdAt).toLocaleDateString()}</div> 
      </div>

    </div >
  );
}