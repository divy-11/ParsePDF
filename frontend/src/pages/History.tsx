import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { ConversionCard } from '../components/ConversionCard';
import { Conversion } from '../types';

export function History() {
  const [selectedConversion, setSelectedConversion] = useState<Conversion | null>(null);

  // Mock data - replace with actual API calls
  const conversions: Conversion[] = [
    {
      id: '1',
      fileName: 'document1.pdf',
      createdAt: '2024-03-10T10:00:00Z',
      status: 'completed',
      pdfUrl: 'https://example.com/pdf1',
      xmlContent: '<root><text>Sample XML content</text></root>'
    },
    {
      id: '2',
      fileName: 'document2.pdf',
      createdAt: '2024-03-09T15:30:00Z',
      status: 'processing',
      pdfUrl: 'https://example.com/pdf2',
      xmlContent: ''
    }
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">
          Conversion History
        </h1>
        <div className="space-y-4">
          {conversions.map((conversion) => (
            <ConversionCard
              key={conversion.id}
              conversion={conversion}
              onPreview={setSelectedConversion}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}