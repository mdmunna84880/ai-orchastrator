import { HiOutlineCloudUpload } from 'react-icons/hi';

export const FileUpload = ({ file, setFile }) => {
  return (
    <div className="w-full">
      <label className={`
        flex flex-col items-center justify-center w-full h-44 
        border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300
        ${file ? 'border-indigo-400 bg-indigo-50/50' : 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50'}
      `}>
        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
          <HiOutlineCloudUpload className={`w-12 h-12 mb-3 ${file ? 'text-indigo-500' : 'text-slate-400'}`} />
          {file ? (
            <p className="text-sm font-semibold text-indigo-700 truncate max-w-xs">{file.name}</p>
          ) : (
            <>
              <p className="mb-2 text-sm text-slate-600 font-medium">Click or drag to upload document</p>
              <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">PDF and Text</p>
            </>
          )}
        </div>
        <input 
          type="file" 
          className="hidden" 
          onChange={(e) => setFile(e.target.files[0])} 
        />
      </label>
    </div>
  );
};