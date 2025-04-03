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
      <div className="flex items-start justify-between">
        <div className="flex items-center cursor-pointer" onClick={() => isToggle(conversion._id)}>
          <FileText className="h-8 w-8 text-blue-600" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-gray-900">{conversion.fileName}</h3>
            <p className="text-sm text-gray-500">{new Date(conversion.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="p-1 text-gray-400 hover:text-gray-500" title="Copy XML" onClick={handleCopyXml}>
            <Copy className="h-5 w-5" />
          </button>
          <button className="p-1 text-gray-400 hover:text-gray-500" title="Download XML" onClick={handleDownload}>
            <Download className="h-5 w-5" />
          </button>
          <button
            className="p-1 text-gray-400 hover:text-gray-500"
            title="Expand/Collapse"
            onClick={() => isToggle(conversion._id)}
          >
            <Eye className={`h-5 w-5 ${isExpanded ? "text-blue-600" : ""}`} />
          </button>
        </div>
      </div>
      <div className="mt-2">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Completed
        </span>
      </div>

    </div >
  );
}