import React, { useState } from 'react';
import { NewsInput } from './NewsInput';
import { AnalysisResult } from './AnalysisResult';
import { analyzeText } from '../utils/analyzeText';
import { AlertTriangleIcon } from 'lucide-react';
export function FakeNewsDetector() {
  const [newsText, setNewsText] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const handleTextChange = text => {
    setNewsText(text);
    setAnalysisResult(null);
  };
  const handleAnalyze = () => {
    if (!newsText.trim()) return;
    setIsAnalyzing(true);
    // Simulate analysis delay for UX
    setTimeout(() => {
      const result = analyzeText(newsText);
      setAnalysisResult(result);
      setIsAnalyzing(false);
    }, 1500);
  };
  return <div className="max-w-3xl mx-auto">
      <header className="text-center mb-8">
        <div className="inline-flex items-center justify-center bg-orange-100 text-orange-800 rounded-full px-4 py-1 mb-4">
          <AlertTriangleIcon size={16} className="mr-2" />
          <span className="text-sm font-medium">Educational Tool</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
          Fake News Detector
        </h1>
        <p className="mt-3 text-slate-600">
          Analyze news articles and statements to identify potential
          misinformation
        </p>
      </header>
      <NewsInput newsText={newsText} onTextChange={handleTextChange} onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
      {analysisResult && <AnalysisResult result={analysisResult} />}
      <footer className="mt-12 text-center text-sm text-slate-500">
        <p>
          This is a simplified educational tool and should not be used as the
          sole means to verify information. Always cross-check with reliable
          sources.
        </p>
      </footer>
    </div>;
}