import { useState } from 'react';
import { useUser } from '@clerk/clerk-react';

export default function CareerTestPage() {
  const { user } = useUser();
  const [step, setStep] = useState('select');
  const [domain, setDomain] = useState('');
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const domains = [
    { id: 'webdev', name: 'Web Development' },
    { id: 'datascience', name: 'Data Science' },
    { id: 'cybersecurity', name: 'Cybersecurity' },
    { id: 'cloud', name: 'Cloud Computing' },
    { id: 'blockchain', name: 'Blockchain' }
  ];

  const fetchQuestions = async (domainId) => {
    setLoading(true);
    setError(null);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

    try {
      console.log('Starting question fetch for domain:', domainId);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/questions/generate`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ domain: domainId }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Server returned ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.questions || !Array.isArray(data.questions)) {
        throw new Error('Invalid question data received');
      }

      console.log('Received questions:', data.questions);
      setQuestions(data.questions);
      setDomain(domainId);
      setStep('test');
      setCurrent(0);
      setAnswers([]);
    } catch (err) {
      clearTimeout(timeoutId);
      console.error('Question fetch error:', err);
      setError(err.message || 'Failed to load questions. Please try again.');
      if (err.name !== 'AbortError') {
        // Show error to user
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (score) => {
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
    const maxPossibleScore = questions.length * 4; // 4 being the highest score per question
    const percentage = Math.round((totalScore / maxPossibleScore) * 100);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/questions/evaluate`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
          domain,
          totalScore,
          maxPossibleScore,
          percentage 
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Server returned ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.level || !data.recommendation) {
        throw new Error('Invalid evaluation data received');
      }

      setResult(data);
      setStep('result');

      // Save test history if user is logged in
      if (user?.primaryEmailAddress?.emailAddress) {
        try {
          await fetch(`${import.meta.env.VITE_API_URL}/api/history/save`, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              email: user.primaryEmailAddress.emailAddress,
              domain,
              score: totalScore,
              maxPossibleScore,
              percentage,
              level: data.level,
              recommendation: data.recommendation,
              testDate: new Date().toISOString()
            })
          });
        } catch (historyError) {
          console.error('Failed to save history:', historyError);
          // Don't show this error to user as it doesn't affect their test
        }
      }
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
  };

  const getDomainName = (domainId) => {
    return domains.find(d => d.id === domainId)?.name || domainId;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-3xl">
        <h2 className="text-3xl font-bold mb-4 text-center">AI Career Assessment</h2>
        {user && <p className="mb-6 text-gray-300 text-center">Welcome, {user.fullName}</p>}

        {error && (
          <div className="mb-6 p-4 bg-red-900/50 border border-red-500 rounded-lg">
            <p className="text-red-200">{error}</p>
            <button 
              onClick={() => setError(null)}
              className="mt-2 text-red-300 hover:text-white"
            >
              Dismiss
            </button>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="flex space-x-2 mb-4">
              <div className="w-4 h-4 bg-blue-400 rounded-full animate-bounce"></div>
              <div className="w-4 h-4 bg-blue-400 rounded-full animate-bounce delay-100"></div>
              <div className="w-4 h-4 bg-blue-400 rounded-full animate-bounce delay-200"></div>
            </div>
            <p className="text-gray-400">
              {step === 'select' ? 'Loading questions...' : 
               step === 'test' ? 'Processing your answer...' : 
               'Generating your results...'}
            </p>
          </div>
        )}

        {!loading && step === 'select' && (
          <div className="bg-gray-800/50 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-6 text-center">Choose Your Career Domain</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {domains.map((domain) => (
                <button
                  key={domain.id}
                  onClick={() => fetchQuestions(domain.id)}
                  className="p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all duration-200 flex flex-col items-center"
                >
                  <span className="text-lg font-medium">{domain.name}</span>
                  <span className="text-sm text-gray-400 mt-1">10-15 min assessment</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {!loading && step === 'test' && questions.length > 0 && (
          <div className="bg-gray-800/50 p-6 rounded-xl">
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-400 mb-1">
                <span>Question {current + 1} of {questions.length}</span>
                <span>{getDomainName(domain)}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full" 
                  style={{ width: `${((current + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <h3 className="text-xl font-semibold mb-6">{questions[current].question}</h3>
            
            <div className="space-y-3">
              {questions[current].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option.score)}
                  className="w-full p-4 bg-gray-700 hover:bg-gray-600 rounded-lg text-left transition-colors duration-150"
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {!loading && step === 'result' && result && (
          <div className="bg-gray-800/50 p-6 rounded-xl">
            <div className="text-center mb-6">
              <div className="inline-block bg-blue-500/20 p-3 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">Assessment Complete!</h3>
              <p className="text-gray-400">Your {getDomainName(domain)} results</p>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-700/50 p-4 rounded-lg">
                <h4 className="font-semibold text-lg mb-2">Skill Level</h4>
                <div className="flex items-center">
                  <span className="text-blue-400 font-medium capitalize">{result.level}</span>
                </div>
              </div>

              <div className="bg-gray-700/50 p-4 rounded-lg">
                <h4 className="font-semibold text-lg mb-2">Recommendation</h4>
                <p className="text-gray-300">{result.recommendation}</p>
              </div>

              <div className="flex justify-center mt-8">
                <button
                  onClick={restartTest}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-colors duration-200"
                >
                  Take Another Test
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}