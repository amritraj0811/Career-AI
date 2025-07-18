import { useState, useEffect, useRef } from 'react';
import preDefinedQuestions from '../assets/carrier-test/preDefinedQuestions';
import { useUser } from '@clerk/clerk-react';
import BlurCircle from '../components/BlurCircle';

export default function CareerTestPage() {
  const [step, setStep] = useState('select');
  const [domain, setDomain] = useState('');
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds timer
  const timerRef = useRef(null);
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  const {user} = useUser();

  const domains = [
    { id: 'webdev', name: 'Web Development', icon: '🌐' },
    { id: 'datascience', name: 'Data Science', icon: '📊' },
    { id: 'cybersecurity', name: 'Cybersecurity', icon: '🔒' },
    { id: 'cloud', name: 'Cloud Computing', icon: '☁️' },
    { id: 'blockchain', name: 'Blockchain', icon: '⛓️' },
    { id: 'ai', name: 'Artificial Intelligence', icon: '🤖' },
    { id: 'mobile', name: 'Mobile Development', icon: '📱' },
    { id: 'devops', name: 'DevOps', icon: '🔧' }
  ];

  // Pre-defined questions for all domains (20 questions each)
  

  const extractJsonFromMarkdown = (markdownText) => {
    // Handle both ```json and ``` cases
    const jsonMatch = markdownText.match(/```(?:json)?\n([\s\S]*?)\n```/);
    if (jsonMatch && jsonMatch[1]) {
      return jsonMatch[1];
    }
    // If no backticks found, assume it's plain JSON
    return markdownText;
  };

  const parseGeminiResponse = (response) => {
    try {
      const jsonContent = extractJsonFromMarkdown(response);
      return JSON.parse(jsonContent);
    } catch (err) {
      console.error('Failed to parse response:', response);
      throw new Error('Invalid response format from Gemini API');
    }
  };

  const callGeminiAI = async (prompt, maxTokens = 1000) => {
    if (!apiKey) {
      throw new Error('Gemini API key is required');
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: maxTokens
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  };

  // Start timer when question changes
  useEffect(() => {
    if (step === 'test' && questions.length > 0) {
      setTimeLeft(30); // Reset timer for each new question
      
      timerRef.current = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current);
            handleAnswer(1); // Auto-submit with minimum score when time runs out
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timerRef.current);
    }
  }, [current, questions, step]);

  const generateQuestions = async (domainId) => {
    // Use pre-defined questions for faster loading
    if (preDefinedQuestions[domainId]) {
      // Get 5 random questions from the pre-defined set
      const shuffled = [...preDefinedQuestions[domainId]].sort(() => 0.5 - Math.random());
      const selectedQuestions = shuffled.slice(0, 5);
      return { questions: selectedQuestions };
    }

    const domainName = getDomainName(domainId);
    const prompt = `Generate 5 career assessment questions for ${domainName} with multiple choice answers. Each question should test different aspects like technical knowledge, experience level, problem-solving, and career goals.

Return the response in this exact JSON format without any markdown formatting or additional text:
{
  "questions": [
    {
      "question": "Question text here",
      "options": [
        {"text": "Option 1", "score": 1},
        {"text": "Option 2", "score": 2},
        {"text": "Option 3", "score": 3},
        {"text": "Option 4", "score": 4}
      ]
    }
  ]
}

Make sure scores range from 1 (beginner/low) to 4 (expert/high). Questions should cover:
- Technical knowledge and skills
- Experience with tools and technologies
- Problem-solving scenarios
- Career goals and interests
- Industry awareness

Make questions practical and relevant to current ${domainName} practices.`;

    const response = await callGeminiAI(prompt, 1000);
    return parseGeminiResponse(response);
  };

  const fetchQuestions = async (domainId) => {
    setLoading(true);
    setError(null);

    try {
      // Add a small delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const data = await generateQuestions(domainId);
      
      if (!data.questions || !Array.isArray(data.questions)) {
        throw new Error('Invalid question data received');
      }

      setQuestions(data.questions);
      setDomain(domainId);
      setStep('test');
      setCurrent(0);
      setAnswers([]);
      setTimeLeft(30);
    } catch (err) {
      console.error('Question generation error:', err);
      setError(err.message || 'Failed to generate questions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (score) => {
    clearInterval(timerRef.current); // Clear timer when answer is submitted
    const updatedAnswers = [...answers, score];
    setAnswers(updatedAnswers);
    
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      evaluateResult(updatedAnswers);
    }
  };

  const evaluateResult = async (scores) => {
    setLoading(true);
    setError(null);
    
    const totalScore = scores.reduce((a, b) => a + b, 0);
    const maxPossibleScore = questions.length * 4;
    const percentage = Math.round((totalScore / maxPossibleScore) * 100);

    try {
      const domainName = getDomainName(domain);
      const prompt = `Based on a career assessment for ${domainName}, analyze these results:
- Total Score: ${totalScore}/${maxPossibleScore}
- Percentage: ${percentage}%
- Number of questions: ${questions.length}

Provide a detailed analysis in this exact JSON format without any markdown formatting or additional text:
{
  "level": "beginner|intermediate|advanced|expert",
  "recommendation": "Detailed career recommendation and next steps (2-3 sentences)",
  "strengths": ["strength1", "strength2"],
  "areas_for_improvement": ["area1", "area2"],
  "next_steps": ["step1", "step2", "step3"]
}

Base the level on: 0-40% = beginner, 41-60% = intermediate, 61-80% = advanced, 81-100% = expert.
Make recommendations specific to ${domainName} career paths.`;

      const response = await callGeminiAI(prompt, 800);
      const data = parseGeminiResponse(response);
      
      setResult({ ...data, percentage, totalScore, maxPossibleScore });
      setStep('result');
    } catch (err) {
      console.error('Evaluation error:', err);
      setError(err.message || 'Failed to evaluate results. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const restartTest = () => {
    setStep('select');
    setQuestions([]);
    setCurrent(0);
    setAnswers([]);
    setResult(null);
    setDomain('');
    setError(null);
    setTimeLeft(30);
    clearInterval(timerRef.current);
  };

  const getDomainName = (domainId) => {
    return domains.find(d => d.id === domainId)?.name || domainId;
  };

  const handleApiKeySubmit = () => {
    if (apiKey.trim()) {
      setError(null);
    } else {
      setError('Please check your Gemini API key configuration');
    }
  };

  return (
    <div className="min-h-screen pt-16 md:pt-50  text-white flex flex-col items-center py-10 px-4">
      <BlurCircle top='-80px' left='-100px' />
      <BlurCircle top='-80px' right='120px' color='from-purple-500/20' />
      <BlurCircle bottom='100px' right='880px' color='from-blue-500/20' />
      <BlurCircle bottom='-80px' left='100px' color='from-indigo-500/20' />
      <BlurCircle bottom='-120' right='120px' color='from-purple-500/20' />
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            AI Career Assessment
          </h1>
          <p className="text-gray-300 text-lg">{user.firstName}, Discover your career readiness with Gemini AI-powered insights</p>
        </div>

        {/* API Key Input Modal */}
        {!apiKey && (
          <div className="mb-6 p-4 bg-yellow-900/50 border border-yellow-500 rounded-lg backdrop-blur-sm">
            <p className="text-yellow-200">
              Please add your Gemini API key to the .env file as VITE_GEMINI_API_KEY to use this assessment.
            </p>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-900/50 border border-red-500 rounded-lg backdrop-blur-sm">
            <p className="text-red-200">{error}</p>
            <button 
              onClick={() => setError(null)}
              className="mt-2 text-red-300 hover:text-white underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-400/30 rounded-full animate-spin"></div>
              <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-blue-400 rounded-full animate-spin"></div>
            </div>
            <p className="text-gray-400 mt-4 text-lg">
              {step === 'select' ? 'Preparing your assessment...' : 
               step === 'test' ? 'Processing your answer...' : 
               'Analyzing your results...'}
            </p>
          </div>
        )}

        {!loading && step === 'select' && apiKey && (
          <div className="bg-gray-800/30 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50">
            <h3 className="text-2xl font-semibold mb-8 text-center">Choose Your Career Domain</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {domains.map((domain) => (
                <button
                  key={domain.id}
                  onClick={() => fetchQuestions(domain.id)}
                  className="p-6 bg-gray-700/50 hover:bg-gray-600/50 rounded-xl transition-all duration-300 flex flex-col items-center group hover:scale-105 border border-gray-600/50 hover:border-blue-400/50"
                >
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                    {domain.icon}
                  </div>
                  <span className="text-lg font-medium text-center">{domain.name}</span>
                  <span className="text-sm text-gray-400 mt-1">AI-generated assessment</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {!loading && step === 'test' && questions.length > 0 && (
          <div className="bg-gray-800/30 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50">
            <div className="mb-8">
              <div className="flex justify-between text-sm text-gray-400 mb-3">
                <span>Question {current + 1} of {questions.length}</span>
                <span className="flex items-center gap-2">
                  <span className={`font-medium ${timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-blue-400'}`}>
                    Time left: {timeLeft}s
                  </span>
                  {domains.find(d => d.id === domain)?.icon} {getDomainName(domain)}
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300" 
                  style={{ width: `${((current + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <h3 className="text-xl font-semibold mb-8 leading-relaxed">
              {questions[current].question}
            </h3>
            
            <div className="space-y-3">
              {questions[current].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option.score)}
                  className="w-full p-4 bg-gray-700/50 hover:bg-gray-600/50 rounded-xl text-left transition-all duration-200 border border-gray-600/50 hover:border-blue-400/50 hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center text-sm font-medium">
                      {String.fromCharCode(65 + index)}
                    </span>
                    {option.text}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {!loading && step === 'result' && result && (
          <div className="bg-gray-800/30 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50">
            <div className="text-center mb-8">
              <div className="inline-block bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-4 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold mb-2">Assessment Complete!</h3>
              <p className="text-gray-400 text-lg">Your {getDomainName(domain)} results</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-700/30 p-6 rounded-xl border border-gray-600/50">
                <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <span className="text-2xl">🎯</span> Skill Level
                </h4>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-blue-400 capitalize">{result.level}</span>
                  <span className="text-gray-400">({result.percentage}%)</span>
                </div>
                <div className="mt-2 text-sm text-gray-400">
                  Score: {result.totalScore}/{result.maxPossibleScore}
                </div>
              </div>

              <div className="bg-gray-700/30 p-6 rounded-xl border border-gray-600/50">
                <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <span className="text-2xl">💪</span> Strengths
                </h4>
                <ul className="space-y-1">
                  {result.strengths?.map((strength, index) => (
                    <li key={index} className="text-green-400 text-sm">• {strength}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-700/30 p-6 rounded-xl border border-gray-600/50">
                <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <span className="text-2xl">🚀</span> Recommendation
                </h4>
                <p className="text-gray-300 leading-relaxed">{result.recommendation}</p>
              </div>

              <div className="bg-gray-700/30 p-6 rounded-xl border border-gray-600/50">
                <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <span className="text-2xl">📈</span> Areas for Improvement
                </h4>
                <ul className="space-y-1">
                  {result.areas_for_improvement?.map((area, index) => (
                    <li key={index} className="text-yellow-400 text-sm">• {area}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-700/30 p-6 rounded-xl border border-gray-600/50">
                <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <span className="text-2xl">🎯</span> Next Steps
                </h4>
                <ol className="space-y-1">
                  {result.next_steps?.map((step, index) => (
                    <li key={index} className="text-blue-400 text-sm">
                      {index + 1}. {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="flex justify-center mt-8 gap-4">
              <button
                onClick={restartTest}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-lg font-medium transition-all duration-200 hover:scale-105"
              >
                Take Another Test
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}