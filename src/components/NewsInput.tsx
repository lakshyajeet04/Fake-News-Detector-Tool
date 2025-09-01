import React from 'react';
import { SearchIcon, Loader2Icon } from 'lucide-react';
export function NewsInput({
  newsText,
  onTextChange,
  onAnalyze,
  isAnalyzing
}) {
  return <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-slate-800 mb-3">
        Enter News Content
      </h2>
      <textarea className="w-full h-40 p-4 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" placeholder="Paste a news article, headline, or statement here..." value={newsText} onChange={e => onTextChange(e.target.value)}></textarea>
      <div className="mt-4 flex justify-end">
        <button onClick={onAnalyze} disabled={!newsText.trim() || isAnalyzing} className={`flex items-center px-4 py-2 rounded-md font-medium ${!newsText.trim() || isAnalyzing ? 'bg-slate-200 text-slate-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
          {isAnalyzing ? <>
              <Loader2Icon size={18} className="mr-2 animate-spin" />
              Analyzing...
            </> : <>
              <SearchIcon size={18} className="mr-2" />
              Analyze Text
            </>}
        </button>
      </div>
    </div>;
}