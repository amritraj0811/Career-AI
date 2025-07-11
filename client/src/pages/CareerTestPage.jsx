// CareerTestPage.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@clerk/clerk-react';

const domains = {
  webdev: {
    name: 'Web Development',
    icon: '🌐',
    questions: [
      {
        id: 1,
        text: "When optimizing React performance, which technique would you prioritize?",
        options: [
          { text: "Server-side rendering (Next.js)", value: "advanced", score: 4 },
          { text: "React.memo for component memoization", value: "intermediate", score: 3 },
          { text: "Code splitting with dynamic imports", value: "intermediate", score: 3 },
          { text: "Using useEffect dependencies properly", value: "beginner", score: 2 }
        ]
      },
      {
        id: 2,
        text: "How would you implement authentication in a modern web app?",
        options: [
          { text: "JWT with refresh tokens", value: "advanced", score: 4 },
          { text: "OAuth with third-party providers", value: "intermediate", score: 3 },
          { text: "Session-based with cookies", value: "intermediate", score: 3 },
          { text: "Basic auth with username/password", value: "beginner", score: 1 }
        ]
      },
      {
        id: 3,
        text: "Your web app has slow API responses. What's your solution?",
        options: [
          { text: "Implement GraphQL with Apollo caching", value: "advanced", score: 4 },
          { text: "Add Redis caching layer", value: "intermediate", score: 3 },
          { text: "Optimize database queries", value: "intermediate", score: 3 },
          { text: "Increase server resources", value: "beginner", score: 1 }
        ]
      },
      {
        id: 4,
        text: "How would you handle state management in a large React app?",
        options: [
          { text: "Redux Toolkit with RTK Query", value: "advanced", score: 4 },
          { text: "Context API + useReducer", value: "intermediate", score: 3 },
          { text: "React Query for server state", value: "intermediate", score: 3 },
          { text: "Component-level useState", value: "beginner", score: 1 }
        ]
      },
      {
        id: 5,
        text: "What's your approach to CSS in a component-based architecture?",
        options: [
          { text: "CSS-in-JS (Styled Components/Emotion)", value: "advanced", score: 4 },
          { text: "CSS Modules with Sass", value: "intermediate", score: 3 },
          { text: "Utility-first (Tailwind CSS)", value: "intermediate", score: 3 },
          { text: "Traditional stylesheets", value: "beginner", score: 1 }
        ]
      }
    ],
    courses: {
      beginner: 'Modern HTML/CSS/JavaScript',
      intermediate: 'React Masterclass with Next.js',
      advanced: 'Advanced Web Performance Optimization'
    }
  },
  datascience: {
    name: 'Data Science',
    icon: '📊',
    questions: [
      {
        id: 1,
        text: "How would you handle missing data in a dataset?",
        options: [
          { text: "Multiple imputation techniques", value: "advanced", score: 4 },
          { text: "Drop rows with missing values", value: "beginner", score: 1 },
          { text: "Fill with mean/median", value: "intermediate", score: 2 },
          { text: "Use algorithms supporting missing data", value: "intermediate", score: 3 }
        ]
      },
      {
        id: 2,
        text: "Which approach would you take for feature selection?",
        options: [
          { text: "Recursive feature elimination", value: "advanced", score: 4 },
          { text: "Correlation matrix analysis", value: "intermediate", score: 3 },
          { text: "Univariate statistical tests", value: "intermediate", score: 3 },
          { text: "Use all available features", value: "beginner", score: 1 }
        ]
      },
      {
        id: 3,
        text: "How would you evaluate a classification model?",
        options: [
          { text: "Precision-Recall curve analysis", value: "advanced", score: 4 },
          { text: "ROC AUC score", value: "intermediate", score: 3 },
          { text: "Confusion matrix", value: "intermediate", score: 3 },
          { text: "Simple accuracy score", value: "beginner", score: 1 }
        ]
      },
      {
        id: 4,
        text: "Which technique would you use for text classification?",
        options: [
          { text: "Transformer models (BERT)", value: "advanced", score: 4 },
          { text: "Word embeddings + LSTM", value: "intermediate", score: 3 },
          { text: "TF-IDF with Naive Bayes", value: "intermediate", score: 3 },
          { text: "Bag-of-words approach", value: "beginner", score: 1 }
        ]
      },
      {
        id: 5,
        text: "How would you deploy a machine learning model?",
        options: [
          { text: "Containerized microservice with FastAPI", value: "advanced", score: 4 },
          { text: "Flask REST endpoint", value: "intermediate", score: 3 },
          { text: "Pre-computed predictions", value: "intermediate", score: 2 },
          { text: "Jupyter notebook export", value: "beginner", score: 1 }
        ]
      }
    ],
    courses: {
      beginner: 'Python for Data Analysis',
      intermediate: 'Machine Learning Engineering',
      advanced: 'Advanced Deep Learning Systems'
    }
  },
  cybersecurity: {
    name: 'Cybersecurity',
    icon: '🔒',
    questions: [
      {
        id: 1,
        text: "How would you secure a web application against XSS?",
        options: [
          { text: "Content Security Policy + input sanitization", value: "advanced", score: 4 },
          { text: "HTML entity encoding", value: "intermediate", score: 3 },
          { text: "Use framework templating", value: "intermediate", score: 2 },
          { text: "Input validation", value: "beginner", score: 1 }
        ]
      },
      {
        id: 2,
        text: "What's your approach to secure API authentication?",
        options: [
          { text: "JWT with short expiry + refresh tokens", value: "advanced", score: 4 },
          { text: "OAuth 2.0 with PKCE", value: "intermediate", score: 3 },
          { text: "API keys with IP restrictions", value: "intermediate", score: 2 },
          { text: "Basic authentication", value: "beginner", score: 1 }
        ]
      },
      {
        id: 3,
        text: "How would you conduct a penetration test?",
        options: [
          { text: "OWASP methodology + custom exploits", value: "advanced", score: 4 },
          { text: "Automated scanning tools", value: "intermediate", score: 3 },
          { text: "Manual vulnerability assessment", value: "intermediate", score: 2 },
          { text: "Checklist-based testing", value: "beginner", score: 1 }
        ]
      },
      {
        id: 4,
        text: "What's your strategy for network monitoring?",
        options: [
          { text: "SIEM with behavioral analytics", value: "advanced", score: 4 },
          { text: "IDS/IPS systems", value: "intermediate", score: 3 },
          { text: "Log aggregation", value: "intermediate", score: 2 },
          { text: "Basic firewall logs", value: "beginner", score: 1 }
        ]
      },
      {
        id: 5,
        text: "How would you secure cloud infrastructure?",
        options: [
          { text: "Zero-trust architecture implementation", value: "advanced", score: 4 },
          { text: "IAM role-based access control", value: "intermediate", score: 3 },
          { text: "Network security groups", value: "intermediate", score: 2 },
          { text: "Basic password policies", value: "beginner", score: 1 }
        ]
      }
    ],
    courses: {
      beginner: 'Cybersecurity Fundamentals',
      intermediate: 'Ethical Hacking Certification',
      advanced: 'Advanced Threat Hunting'
    }
  },
  cloud: {
    name: 'Cloud Computing',
    icon: '☁️',
    questions: [
      {
        id: 1,
        text: "How would you design a highly available system?",
        options: [
          { text: "Multi-region deployment with failover", value: "advanced", score: 4 },
          { text: "Auto-scaling groups", value: "intermediate", score: 3 },
          { text: "Load balanced instances", value: "intermediate", score: 2 },
          { text: "Single instance deployment", value: "beginner", score: 1 }
        ]
      },
      {
        id: 2,
        text: "What's your approach to infrastructure as code?",
        options: [
          { text: "Terragrunt with modular Terraform", value: "advanced", score: 4 },
          { text: "Terraform modules", value: "intermediate", score: 3 },
          { text: "CloudFormation templates", value: "intermediate", score: 2 },
          { text: "Manual console configuration", value: "beginner", score: 1 }
        ]
      },
      {
        id: 3,
        text: "How would you optimize cloud costs?",
        options: [
          { text: "Reserved instances + spot fleets", value: "advanced", score: 4 },
          { text: "Right-sizing recommendations", value: "intermediate", score: 3 },
          { text: "Budget alerts", value: "intermediate", score: 2 },
          { text: "Manual monitoring", value: "beginner", score: 1 }
        ]
      },
      {
        id: 4,
        text: "What's your container orchestration strategy?",
        options: [
          { text: "Service mesh with Istio", value: "advanced", score: 4 },
          { text: "Kubernetes with Helm", value: "intermediate", score: 3 },
          { text: "ECS/EKS managed services", value: "intermediate", score: 2 },
          { text: "Manual container management", value: "beginner", score: 1 }
        ]
      },
      {
        id: 5,
        text: "How would you implement CI/CD in cloud?",
        options: [
          { text: "GitOps with ArgoCD", value: "advanced", score: 4 },
          { text: "Pipeline-as-code (AWS CodePipeline)", value: "intermediate", score: 3 },
          { text: "Manual deployment scripts", value: "intermediate", score: 2 },
          { text: "Manual deployments", value: "beginner", score: 1 }
        ]
      }
    ],
    courses: {
      beginner: 'Cloud Practitioner Essentials',
      intermediate: 'AWS Solutions Architect',
      advanced: 'Multi-Cloud Architecture'
    }
  },
  blockchain: {
    name: 'Blockchain',
    icon: '⛓️',
    questions: [
      {
        id: 1,
        text: "How would you optimize gas fees in Ethereum?",
        options: [
          { text: "Layer 2 solutions with zkRollups", value: "advanced", score: 4 },
          { text: "Batch transactions", value: "intermediate", score: 3 },
          { text: "Gas price estimation", value: "intermediate", score: 2 },
          { text: "Manual gas setting", value: "beginner", score: 1 }
        ]
      },
      {
        id: 2,
        text: "What's your approach to smart contract security?",
        options: [
          { text: "Formal verification + fuzzing", value: "advanced", score: 4 },
          { text: "Automated analysis tools", value: "intermediate", score: 3 },
          { text: "Manual code review", value: "intermediate", score: 2 },
          { text: "Basic testing", value: "beginner", score: 1 }
        ]
      },
      {
        id: 3,
        text: "How would you scale a dApp?",
        options: [
          { text: "Sharded blockchain architecture", value: "advanced", score: 4 },
          { text: "Sidechains with bridges", value: "intermediate", score: 3 },
          { text: "Optimized contract design", value: "intermediate", score: 2 },
          { text: "Single chain deployment", value: "beginner", score: 1 }
        ]
      },
      {
        id: 4,
        text: "What's your token standard choice for NFTs?",
        options: [
          { text: "ERC-721A for gas optimization", value: "advanced", score: 4 },
          { text: "ERC-721 with metadata", value: "intermediate", score: 3 },
          { text: "ERC-1155 multi-token", value: "intermediate", score: 2 },
          { text: "Basic ERC-20", value: "beginner", score: 1 }
        ]
      },
      {
        id: 5,
        text: "How would you implement DAO governance?",
        options: [
          { text: "Multi-sig with proposal queuing", value: "advanced", score: 4 },
          { text: "Token-weighted voting", value: "intermediate", score: 3 },
          { text: "Basic snapshot voting", value: "intermediate", score: 2 },
          { text: "Centralized control", value: "beginner", score: 1 }
        ]
      }
    ],
    courses: {
      beginner: 'Blockchain Fundamentals',
      intermediate: 'Smart Contract Development',
      advanced: 'Blockchain Scalability Solutions'
    }
  }
};

function CareerTestPage() {
  const { user } = useUser();
  const [currentStep, setCurrentStep] = useState('domain');
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (selectedDomain) {
      const domainQuestions = domains[selectedDomain].questions;
      // Select all questions (or can randomize if you prefer)
      setQuestions(domainQuestions);
      setCurrentStep('test');
    }
  }, [selectedDomain]);

  const handleAnswer = (option) => {
    setAnswers([...answers, {
      questionId: questions[currentQuestion].id,
      score: option.score
    }]);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      calculateResult();
    }
  };

  const calculateResult = () => {
    const totalScore = answers.reduce((sum, answer) => sum + answer.score, 0);
    const maxPossibleScore = questions.length * 4; // 4 being the max score per question
    const percentage = (totalScore / maxPossibleScore) * 100;

    let level;
    if (percentage >= 75) level = 'advanced';
    else if (percentage >= 50) level = 'intermediate';
    else level = 'beginner';

    setResult({
      domain: domains[selectedDomain].name,
      score: percentage.toFixed(1),
      level,
      recommendedCourse: domains[selectedDomain].courses[level]
    });
    setCurrentStep('result');
  };

  const restartTest = () => {
    setSelectedDomain(null);
    setQuestions([]);
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
    setCurrentStep('domain');
  };

  return (
    <div className="min-h-screen bg-gray-950 py-12 px-4 pt-16 md:pt-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg mx-auto text-center mb-4"
      >
        <div className="mb-4">
          <p className="text-gray-400">
            Welcome, <span className="text-primary font-medium">{user.fullName}</span>
          </p>
          <p className="text-gray-500 text-sm mt-1">
            {user.primaryEmailAddress?.emailAddress}
          </p>
        </div>
        
        <h1 className="text-4xl font-bold text-white mb-2">
          Tech Career Pathfinder
        </h1>
        <p className="text-gray-400">
          Advanced assessment for specialized tech domains
        </p>
      </motion.div>
      
      <AnimatePresence mode='wait'>
        {currentStep === 'domain' && (
          <DomainSelection 
            domains={domains} 
            onSelect={setSelectedDomain} 
          />
        )}
        
        {currentStep === 'test' && (
          <CareerTest 
            questions={questions}
            currentQuestion={currentQuestion}
            onAnswer={handleAnswer}
            domain={selectedDomain}
            domains={domains}
          />
        )}
        
        {currentStep === 'result' && (
          <Result 
            result={result} 
            onRestart={restartTest} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

const DomainSelection = ({ domains, onSelect }) => (
  <motion.div
    key="domain"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="max-w-4xl mx-auto"
  >
    <h2 className="text-2xl font-semibold text-white mb-8 text-center">
      Select your tech specialization
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Object.entries(domains).map(([key, domain]) => (
        <motion.button
          key={key}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="p-6 bg-gray-900 rounded-lg border border-gray-800 hover:border-primary transition-colors flex flex-col items-center"
          onClick={() => onSelect(key)}
        >
          <span className="text-3xl mb-2">{domain.icon}</span>
          <h3 className="text-lg font-bold text-white text-center">{domain.name}</h3>
          <p className="text-gray-400 text-sm mt-2">
            {domain.questions.length} advanced questions
          </p>
        </motion.button>
      ))}
    </div>
  </motion.div>
);

const CareerTest = ({ questions, currentQuestion, onAnswer, domain, domains }) => (
  <motion.div
    key="test"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="max-w-2xl mx-auto p-6 bg-gray-900 rounded-xl border border-gray-800"
  >
    <div className="flex justify-between items-center mb-6">
      <div>
        <span className="text-primary font-medium">
          {domains[domain].name}
        </span>
        <span className="text-gray-400 mx-2">•</span>
        <span className="text-gray-400">
          Question {currentQuestion + 1}/{questions.length}
        </span>
      </div>
      <div className="flex gap-1">
        {Array(questions.length).fill().map((_, i) => (
          <div 
            key={i}
            className={`h-1 rounded-full ${i <= currentQuestion ? 'bg-primary w-3' : 'bg-gray-700 w-2'}`}
          />
        ))}
      </div>
    </div>
    
    <h2 className="text-xl font-semibold text-white mb-6">
      {questions[currentQuestion]?.text}
    </h2>
    
    <div className="space-y-3">
      {questions[currentQuestion]?.options.map((option, i) => (
        <motion.button
          key={i}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full p-4 text-left bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-colors"
          onClick={() => onAnswer(option)}
        >
          <div className="flex items-center">
            <span className="text-gray-400 mr-3">{i + 1}.</span>
            <span className="text-white">{option.text}</span>
          </div>
        </motion.button>
      ))}
    </div>
  </motion.div>
);

const Result = ({ result, onRestart }) => (
  <motion.div
    key="result"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.3 }}
    className="max-w-2xl mx-auto p-6 bg-gray-900 rounded-xl border border-gray-800"
  >
    <h2 className="text-2xl font-bold text-center mb-6 text-primary">
      {result.domain} Assessment Results
    </h2>
    
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-400">Your skill level:</span>
        <span className="font-bold text-white capitalize">{result.level}</span>
      </div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-400">Your score:</span>
        <span className="font-bold text-white">{result.score}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2.5 mt-4">
        <div 
          className="bg-primary h-2.5 rounded-full" 
          style={{ width: `${result.score}%` }}
        />
      </div>
    </div>
    
    <div className="bg-gray-800 p-4 rounded-lg mb-6">
      <h3 className="text-lg font-semibold text-white mb-2">
        Recommended Course:
      </h3>
      <p className="text-primary font-medium text-xl">
        {result.recommendedCourse}
      </p>
      <p className="text-gray-400 text-sm mt-1">
        ({result.level} level program)
      </p>
    </div>
    
    <div className="flex gap-3">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onRestart}
        className="flex-1 py-3 bg-primary hover:bg-primary-dull text-white rounded-lg font-medium"
      >
        Take Test Again
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium"
      >
        View Course Details
      </motion.button>
    </div>
  </motion.div>
);

export default CareerTestPage;