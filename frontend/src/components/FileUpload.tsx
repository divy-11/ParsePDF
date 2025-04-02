import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

export function FileUpload({ onFileSelect }: FileUploadProps) {
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file && file.type === 'application/pdf') {
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 transition-colors duration-200"
    >
      <div className="flex flex-col items-center">
        <Upload className="h-12 w-12 text-gray-400" />
        <p className="mt-4 text-lg font-medium text-gray-900">
          Drop your PDF here, or{' '}
          <label className="text-blue-600 hover:text-blue-500 cursor-pointer">
            browse
            <input
              type="file"
              className="hidden"
              accept=".pdf"
              onChange={handleChange}
            />
          </label>
        </p>
        <p className="mt-2 text-sm text-gray-500">PDF files only, up to 10MB</p>
      </div>
    </div>
  );
}