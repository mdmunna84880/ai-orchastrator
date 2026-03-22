import { HiOutlineCheckCircle } from 'react-icons/hi';

export const SuccessCard = ({ result }) => {
  if (!result) return null;

  console.log(result)
  const isDelivered = result.status === "SENT" || result.emailBody;

  return (
    <div className="mt-8 bg-emerald-50 border border-emerald-200 rounded- p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-full shrink-0">
          <HiOutlineCheckCircle className="text-emerald-600 w-8 h-8" />
        </div>
        <div>
          <h3 className="text-xl font-black text-emerald-900">Automation Successful</h3>
          <p className="text-sm font-medium text-emerald-600">The n8n workflow has completed.</p>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-emerald-100 flex flex-col gap-3">
         <div className="flex justify-between items-center border-b border-slate-50 pb-3">
           <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Delivery Status</span>
           <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${isDelivered ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
             {isDelivered ? 'Email Delivered' : 'Processed'}
           </span>
         </div>
         <div className="pt-2">
           <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">AI Summary Output</span>
           <p className="text-sm text-slate-700 font-medium leading-relaxed">
             {result.finalAnswer || "Analysis completed without summary."}
           </p>
         </div>
      </div>
    </div>
  );
};