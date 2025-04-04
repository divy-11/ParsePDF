import React, { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { ConversionCard } from '../components/ConversionCard';
import { Conversion } from '../types';
import axios from 'axios';
import XMLViewer from 'react-xml-viewer';
import { useNavigate } from 'react-router-dom';

export function History() {
  const [selConv, setSelConv] = useState<String | null>(null);
  const [convs, setConvs] = useState<Conversion[]>([])
  const [load, setLoad] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const navigate = useNavigate()
  const fetchConv = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate('/')
      }
      const resp = await axios.get("https://parsepdf.onrender.com/api/conversion/all", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log(resp.data);
      setConvs(resp.data.conversions)
      setLoad(false)
    } catch (err: any) {
      console.log("Error", err);
      if (err.response && err.response.status === 401) {
        navigate('/')
        return
      } else {
        setLoad(false)
      }
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
        <h1 className="text-2xl font-semibold text-gray-900 mb-5">
          Conversion History
        </h1>
        {load && (<h2>Loading ...</h2>)}
        <div className="space-y-3">
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
        {
          (!load) && (convs.length == 0) && (<div className="flex flex-col items-center justify-center py-10 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-20 h-20 mb-3 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6l4 2m0 0-4-2-4 2m8-2v4m0-4-4-2-4 2m8 4H8m4-14a9 9 0 11-9 9 9 9 0 019-9z"
              />
            </svg>
            <p className="text-lg font-semibold mb-1">No conversions found</p>
            <p className="text-sm mb-5">You haven't converted any files yet. Start by uploading a PDF.</p>
            <button
              onClick={() => navigate('/home')}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
            >
              Convert Now
            </button>
          </div>)
        }
        {!(convs.length == 0) && (<div className="mt-4 flex justify-between items-center">
          <button onClick={handlePrevious} disabled={currentPage === 1} className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 disabled:bg-gray-300 disabled:text-gray-500">
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={handleNext} disabled={currentPage === totalPages} className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 disabled:bg-gray-300 disabled:text-gray-500">
            Next
          </button>
        </div>)}
      </div>
    </Layout>
  );
}