import React from 'react';
import { AlertCircleIcon, AlertTriangleIcon, CheckCircleIcon, InfoIcon } from 'lucide-react';
export function AnalysisResult({
  result
}) {
  const {
    credibilityScore,
    indicators,
    advice
  } = result;
  // Determine the UI treatment based on the score
  let statusColor = 'bg-green-100 text-green-800';
  let statusIcon = <CheckCircleIcon size={20} />;
  let statusText = 'Likely Credible';
  if (credibilityScore < 40) {
    statusColor = 'bg-red-100 text-red-800';
    statusIcon = <AlertCircleIcon size={20} />;
    statusText = 'Likely Fake News';
  } else if (credibilityScore < 70) {
    statusColor = 'bg-yellow-100 text-yellow-800';
    statusIcon = <AlertTriangleIcon size={20} />;
    statusText = 'Questionable Content';
  }
  return <div className="mt-8 bg-white rounded-lg shadow-md p-6 animate-fade-in">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">
        Analysis Results
      </h2>
      <div className="flex items-center mb-6">
        <div className="mr-4">
          <div className="w-20 h-20 rounded-full border-4 border-slate-200 flex items-center justify-center">
            <span className="text-xl font-bold">{credibilityScore}%</span>
          </div>
        </div>
        <div>
          <div className={`inline-flex items-center px-3 py-1 rounded-full ${statusColor} mb-2`}>
            {statusIcon}
            <span className="ml-2 font-medium">{statusText}</span>
          </div>
          <p className="text-slate-600">
            Credibility score based on text analysis
          </p>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="font-medium text-slate-800 mb-2">Detected Indicators</h3>
        <ul className="space-y-2">
          {indicators.map((indicator, index) => <li key={index} className="flex items-start">
              <span className={`flex-shrink-0 w-5 h-5 rounded-full ${indicator.severity === 'high' ? 'bg-red-100' : indicator.severity === 'medium' ? 'bg-yellow-100' : 'bg-blue-100'} flex items-center justify-center mt-0.5 mr-2`}>
                <span className={`w-2 h-2 rounded-full ${indicator.severity === 'high' ? 'bg-red-500' : indicator.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'}`}></span>
              </span>
              <span className="text-slate-700">{indicator.text}</span>
            </li>)}
        </ul>
      </div>
      <div className="p-4 bg-blue-50 rounded-md border border-blue-100">
        <div className="flex items-start">
          <InfoIcon size={20} className="text-blue-500 mr-3 mt-0.5" />
          <div>
            <h4 className="font-medium text-slate-800 mb-1">Advice</h4>
            <p className="text-slate-600 text-sm">{advice}</p>
          </div>
        </div>
      </div>
    </div>;
}