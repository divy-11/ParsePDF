import React, { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { ConversionCard } from '../components/ConversionCard';
import { Conversion } from '../types';
import axios from 'axios';
import XMLViewer from 'react-xml-viewer';

export function History() {
  const [selConv, setSelConv] = useState<String | null>(null);
  const [convs, setConvs] = useState<Conversion[]>([])
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const fetchConv = async () => {
    try {
      const resp = await axios.get("http://localhost:6060/api/conversion/all", { withCredentials: true })
      // console.log(resp.data.conversions);
      setConvs(resp.data.conversions)
      console.log(convs);
    } catch (error) {
      console.log(error);
    }
  }

  const handleClick = (id: String) => {
    setSelConv((prevId) => (prevId === id ? null : id));
  }

  useEffect(() => {
    fetchConv()
  }, [currentPage])

  const totalPages = Math.ceil(convs.length / itemsPerPage);
  const currentConversions = convs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };


  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">
          Conversion History
        </h1>
        <div className="space-y-4">
          {currentConversions.map((conv) => (
            <div key={conv._id}>
              <ConversionCard conversion={conv} isExpanded={selConv == conv._id} isToggle={handleClick} />
              {selConv === conv._id && (
                <div className="bg-gray-100 p-4 rounded mt-2">
                  <pre className="bg-white p-2 rounded border border-gray-300 whitespace-pre-wrap">
                    <div className="overflow-auto max-h-96 border p-2 bg-white rounded">
                      <XMLViewer xml={conv.xmlContent} />
                    </div>
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-between items-center">
          <button onClick={handlePrevious} disabled={currentPage === 1} className="px-4 py-2 bg-gray-300 rounded">
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={handleNext} disabled={currentPage === totalPages} className="px-4 py-2 bg-gray-300 rounded">
            Next
          </button>
        </div>
      </div>
    </Layout>
  );
}