
const DataTable = ({ data }) => {
  if (!data) return null;
  console.log(data, "Data table")

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest">
          Extracted Data Points
        </h3>
      </div>
      
      <div className="divide-y divide-slate-100">
        {data.map(({field, value}, index) => (
          <div key={index} className="flex flex-col sm:flex-row sm:items-center px-6 py-4 hover:bg-slate-50 transition-colors">
            <div className="sm:w-1/3 mb-1 sm:mb-0">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {field.replace(/_/g, ' ')}
              </span>
            </div>
            
            <div className="sm:w-2/3">
              <span className="text-sm font-medium text-slate-900">
                {typeof value === 'boolean' 
                  ? (value ? 'Yes' : 'No') 
                  : value || <span className="text-slate-300 italic">Not found</span>}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataTable;