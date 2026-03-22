import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { HiSparkles, HiOutlineDocumentSearch } from 'react-icons/hi';

import DataTable from '../components/DataTable'; 
import { FileUpload } from '../components/FileUpload';
import { AutomationPanel } from '../components/AutomationPanel';
import { SuccessCard } from '../components/SuccessCard';

import { backendAPI } from '../config/api';

const Dashboard = () => {
  // Management state
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAutomating, setIsAutomating] = useState(false);

  // Data State
  const [extractedData, setExtractedData] = useState(null);
  const [n8nResult, setN8nResult] = useState(null);

  // Form States
  const [email, setEmail] = useState("mdmunnatbm@gmail.com");
  const [question, setQuestion] = useState("Summarize this document and make sure the result is better summary.");

  // Extract the document content and call the backend api
  const handleExtract = async () => {
    if (!file) return toast.error("Please drop a file first!");
    setLoading(true);
    setN8nResult(null);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const { data } = await toast.promise(
        backendAPI.post('/upload', formData),
        {
          pending: 'Extracting data via Gemini AI...',
          success: 'Document analyzed successfully!',
          error: 'Extraction failed. Check server connection.'
        }
      );
      
      setExtractedData(data.extractedData.key_points);
    } catch (error) {
      console.error("Extraction failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // Format the data and send email on provided email
  const handleAutomate = async () => {
    setIsAutomating(true);
    
    try {
      // Format the extracted data and add status is urgent to send the email
      const formattedData = extractedData.reduce((acc, curr) => {
        if (curr.field === 'total_amount') {
          acc[curr.field] = Number(String(curr.value).replace(/[^0-9.-]+/g, ""));
        } else {
          acc[curr.field] = String(curr.value);
        }
        return acc;
      }, { status: "Urgent" });

      const payload = {
        extractedData: formattedData,
        question: question,
        email: email
      };
      // Send the email through backend api
      const { data } = await toast.promise(
        backendAPI.post('/automate', payload),
        {
          pending: 'Firing webhook to n8n...',
          success: 'Workflow complete! Email dispatched.',
          error: 'Automation failed to trigger.'
        }
      );
      
      setN8nResult(data);
    } catch (error) {
      console.error("Automation error:", error);
    } finally {
      setIsAutomating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100">
      <ToastContainer position="top-right" theme="light" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">
            Intelligent Document <br className="hidden md:block"/> 
            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-violet-600">Processing Engine</span>
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* File upload section and extraction ui */}
          <section className="lg:col-span-5 flex flex-col gap-6">
            <div className="p-8 rounded-4xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-lg font-extrabold text-slate-800 mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white text-sm">1</span>
                Ingest & Extract
              </h2>
              
              <FileUpload file={file} setFile={setFile} />
              
              <button
                onClick={handleExtract}
                disabled={!file || loading}
                className={`w-full mt-6 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2
                  ${loading 
                    ? 'bg-slate-100 text-slate-400 shadow-none cursor-not-allowed' 
                    : 'bg-slate-900 text-white hover:bg-indigo-600 active:scale-[0.98]'}`}
              >
                {loading ? 'Processing via AI...' : 'Extract Knowledge'}
              </button>
            </div>
            {extractedData && (
              <AutomationPanel 
                email={email}
                setEmail={setEmail}
                question={question}
                setQuestion={setQuestion}
                onAutomate={handleAutomate}
                isAutomating={isAutomating}
              />
            )}
          </section>
          {/* Showing table of extraction data */}
          <section className="lg:col-span-7">
            <div className="h-full min-h-25 rounded-4xl border-2 border-dashed border-slate-200 bg-white/50 backdrop-blur-sm flex flex-col p-8 relative">
              
              {!extractedData ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                  <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-sm mb-6">
                    <HiOutlineDocumentSearch className="w-10 h-10 text-slate-300" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Awaiting Document</h3>
                  <p className="text-xs text-slate-400 mt-2 max-w-xs leading-relaxed">
                    Upload an invoice or document to begin the extraction and automation workflow.
                  </p>
                </div>
              ) : (
                <div className="w-full flex flex-col animate-in slide-in-from-right-8 duration-500">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-slate-800 underline decoration-indigo-500 underline-offset-8 decoration-2">
                      Structured Data Preview
                    </h3>
                  </div>
                  
                  <DataTable data={extractedData} />
                  <SuccessCard result={n8nResult} />
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;