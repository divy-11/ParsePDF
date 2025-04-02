import React from 'react';
import { FileText, Download, Copy, Eye } from 'lucide-react';
import { Conversion } from '../types';

interface ConversionCardProps {
  conversion: Conversion;
  onPreview: (conversion: Conversion) => void;
}

export function ConversionCard({ conversion, onPreview }: ConversionCardProps) {
  const handleCopyXml = () => {
    navigator.clipboard.writeText(conversion.xmlContent);
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
        <div className="flex items-center">
          <FileText className="h-8 w-8 text-blue-600" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-gray-900">{conversion.fileName}</h3>
            <p className="text-sm text-gray-500">{new Date(conversion.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onPreview(conversion)}
            className="p-1 text-gray-400 hover:text-gray-500"
            title="Preview"
          >
            <Eye className="h-5 w-5" />
          </button>
          <button
            onClick={handleCopyXml}
            className="p-1 text-gray-400 hover:text-gray-500"
            title="Copy XML"
          >
            <Copy className="h-5 w-5" />
          </button>
          <button
            onClick={handleDownload}
            className="p-1 text-gray-400 hover:text-gray-500"
            title="Download XML"
          >
            <Download className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="mt-2">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${conversion.status === 'completed'
          ? 'bg-green-100 text-green-800'
          : conversion.status === 'processing'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-red-100 text-red-800'
          }`}>
          {conversion.status.charAt(0).toUpperCase() + conversion.status.slice(1)}
        </span>
      </div>
    </div>
  );
}