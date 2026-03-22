import { HiOutlineLightningBolt, HiOutlineCog } from 'react-icons/hi';

export const AutomationPanel = ({ 
  email, setEmail, 
  question, setQuestion, 
  onAutomate, isAutomating 
}) => {
  return (
    <div className="p-8 rounded-[2.5rem] bg-white border border-slate-200 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 text-white text-xs">2</span>
        Automation Settings(Email)
      </h2>
      
      <div className="space-y-5">
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">
            Target Email Address
          </label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g., abc@gmail.com"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">
            AI Prompt / Question
          </label>
          <textarea 
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="What should the AI analyze?"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none h-24 transition-shadow"
          />
        </div>

        <button
          onClick={onAutomate}
          disabled={isAutomating}
          className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2
            ${isAutomating 
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none' 
              : 'bg-emerald-500 text-white hover:bg-emerald-600 active:scale-95 shadow-emerald-100'}`}
        >
          {isAutomating ? (
            <>
              <HiOutlineCog className="w-5 h-5 animate-spin" />
              Running Workflow...
            </>
          ) : (
            <>
              <HiOutlineLightningBolt className="w-5 h-5" />
              Trigger n8n Automation(Email)
            </>
          )}
        </button>
      </div>
    </div>
  );
};