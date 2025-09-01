// This is a simplified fake news detection algorithm for educational purposes
// In a real application, you would use more sophisticated NLP techniques
type Indicator = {
  text: string;
  severity: 'high' | 'medium' | 'low';
};
type AnalysisResult = {
  credibilityScore: number;
  indicators: Indicator[];
  advice: string;
};
export function analyzeText(text: string): AnalysisResult {
  const lowerText = text.toLowerCase();
  const indicators: Indicator[] = [];
  let credibilityScore = 100;
  // Check for sensationalist language
  const sensationalistWords = ['shocking', 'bombshell', "you won't believe", 'mind-blowing', 'unbelievable', 'stunning', 'outrageous', 'scandalous', 'secret', 'conspiracy'];
  for (const word of sensationalistWords) {
    if (lowerText.includes(word)) {
      indicators.push({
        text: `Contains sensationalist language: "${word}"`,
        severity: 'medium'
      });
      credibilityScore -= 5;
    }
  }
  // Check for ALL CAPS sections (common in fake news)
  const capsRegex = /[A-Z]{5,}/g;
  const capsMatches = text.match(capsRegex);
  if (capsMatches && capsMatches.length > 0) {
    indicators.push({
      text: 'Contains excessive capitalization, often used for emotional manipulation',
      severity: 'medium'
    });
    credibilityScore -= 8;
  }
  // Check for excessive exclamation marks
  const exclamationCount = (text.match(/!/g) || []).length;
  if (exclamationCount > 3) {
    indicators.push({
      text: `Contains ${exclamationCount} exclamation marks, suggesting emotional manipulation`,
      severity: 'medium'
    });
    credibilityScore -= 5;
  }
  // Check for absence of sources
  const sourceIndicators = ['according to', 'source:', 'sources:', 'study:', 'research:', 'report:'];
  let hasSourceIndicator = false;
  for (const indicator of sourceIndicators) {
    if (lowerText.includes(indicator)) {
      hasSourceIndicator = true;
      break;
    }
  }
  if (!hasSourceIndicator && text.length > 100) {
    indicators.push({
      text: 'No clear sources or references mentioned',
      severity: 'high'
    });
    credibilityScore -= 15;
  }
  // Check for clickbait patterns
  const clickbaitPatterns = ['this one trick', 'what happens next', 'will shock you', 'doctors hate', "won't want you to see", "what they don't want you to know", 'this is why'];
  for (const pattern of clickbaitPatterns) {
    if (lowerText.includes(pattern)) {
      indicators.push({
        text: `Contains clickbait pattern: "${pattern}"`,
        severity: 'high'
      });
      credibilityScore -= 10;
    }
  }
  // Check for political bias words
  const politicalBiasWords = ['radical left', 'radical right', 'libtard', 'trumptard', 'snowflake', 'sheep', 'sheeple', 'woke', 'deep state'];
  for (const word of politicalBiasWords) {
    if (lowerText.includes(word)) {
      indicators.push({
        text: `Contains politically charged language: "${word}"`,
        severity: 'medium'
      });
      credibilityScore -= 7;
    }
  }
  // Check text length - very short "news" is often problematic
  if (text.length < 80 && !lowerText.includes('breaking')) {
    indicators.push({
      text: 'Content is very brief, lacking detail or context',
      severity: 'low'
    });
    credibilityScore -= 5;
  }
  // If no red flags found
  if (indicators.length === 0) {
    indicators.push({
      text: 'No obvious indicators of fake news detected',
      severity: 'low'
    });
  }
  // Ensure score stays within 0-100 range
  credibilityScore = Math.max(0, Math.min(100, credibilityScore));
  // Generate appropriate advice based on score
  let advice = '';
  if (credibilityScore < 40) {
    advice = 'This content shows multiple warning signs of potential misinformation. Consider fact-checking with trusted sources before sharing.';
  } else if (credibilityScore < 70) {
    advice = 'This content contains some questionable elements. Cross-reference with established news sources to verify accuracy.';
  } else {
    advice = 'While this content appears credible based on our analysis, always verify important information with multiple reliable sources.';
  }
  return {
    credibilityScore,
    indicators,
    advice
  };
}