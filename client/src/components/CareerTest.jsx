// components/CareerTest.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';

const CareerTest = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  
  const questions = [
    {
      id: 1,
      question: "Which tech area excites you most?",
      options: [
        { text: "Artificial Intelligence", value: "ai", emoji: "🤖", color: "from-purple-500 to-purple-600" },
        { text: "Data Science", value: "data", emoji: "📊", color: "from-blue-500 to-blue-600" },
        { text: "UI/UX Design", value: "design", emoji: "🎨", color: "from-pink-500 to-pink-600" },
        { text: "Cybersecurity", value: "security", emoji: "🔒", color: "from-green-500 to-green-600" }
      ]
    },
    {
      id: 2,
      question: "Preferred way to solve problems?",
      options: [
        { text: "Machine Learning models", value: "ml", emoji: "🧠", color: "from-purple-600 to-purple-700" },
        { text: "Data analysis & visualization", value: "analysis", emoji: "📈", color: "from-blue-600 to-blue-700" },
        { text: "Creating user-friendly interfaces", value: "ui", emoji: "💻", color: "from-pink-600 to-pink-700" },
        { text: "Building secure systems", value: "infosec", emoji: "🛡️", color: "from-green-600 to-green-700" }
      ]
    },
    {
      id: 3,
      question: "Favorite programming activity?",
      options: [
        { text: "Training neural networks", value: "dl", emoji: "🕸️", color: "from-purple-700 to-purple-800" },
        { text: "Cleaning and analyzing datasets", value: "cleaning", emoji: "🧹", color: "from-blue-700 to-blue-800" },
        { text: "Designing interactive prototypes", value: "prototyping", emoji: "✏️", color: "from-pink-700 to-pink-800" },
        { text: "Ethical hacking challenges", value: "hacking", emoji: "👨‍💻", color: "from-green-700 to-green-800" }
      ]
    },
    {
      id: 4,
      question: "Which tech tool do you prefer?",
      options: [
        { text: "TensorFlow/PyTorch", value: "frameworks", emoji: "⚙️", color: "from-purple-800 to-purple-900" },
        { text: "Pandas/Tableau", value: "datatools", emoji: "🗃️", color: "from-blue-800 to-blue-900" },
        { text: "Figma/Adobe XD", value: "designtools", emoji: "🖌️", color: "from-pink-800 to-pink-900" },
        { text: "Wireshark/Kali Linux", value: "sectools", emoji: "🔧", color: "from-green-800 to-green-900" }
      ]
    },
    {
      id: 5,
      question: "Ideal work environment?",
      options: [
        { text: "AI research lab", value: "ailab", emoji: "🔬", color: "from-purple-900 to-purple-950" },
        { text: "Data analytics team", value: "dateam", emoji: "👥", color: "from-blue-900 to-blue-950" },
        { text: "Design studio", value: "designstudio", emoji: "🏛️", color: "from-pink-900 to-pink-950" },
        { text: "Security operations center", value: "soc", emoji: "🏢", color: "from-green-900 to-green-950" }
      ]
    }
  ];

  const handleAnswer = (value) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      const result = {
        ai: newAnswers.filter(a => ['ai', 'ml', 'dl', 'frameworks', 'ailab'].includes(a)).length,
        data: newAnswers.filter(a => ['data', 'analysis', 'cleaning', 'datatools', 'dateam'].includes(a)).length,
        design: newAnswers.filter(a => ['design', 'ui', 'prototyping', 'designtools', 'designstudio'].includes(a)).length,
        security: newAnswers.filter(a => ['security', 'infosec', 'hacking', 'sectools', 'soc'].includes(a)).length
      };
      onComplete(result);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-900 rounded-xl border border-gray-800">
      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-white">
            Question {currentQuestion + 1}/{questions.length}
          </h2>
          <p className="text-gray-300 mt-2">
            {questions[currentQuestion].question}
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          {questions[currentQuestion].options.map((option, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-3 p-4 text-left rounded-lg bg-gradient-to-r ${option.color} border border-gray-700`}
              onClick={() => handleAnswer(option.value)}
            >
              <span className="text-2xl">{option.emoji}</span>
              <span className="text-white font-medium">{option.text}</span>
            </motion.button>
          ))}
        </div>
        
        <div className="flex justify-center gap-2">
          {Array(questions.length).fill().map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.8 }}
              animate={{ scale: i <= currentQuestion ? 1.2 : 1 }}
              className={`w-3 h-3 rounded-full ${i <= currentQuestion ? 'bg-primary' : 'bg-gray-700'}`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default CareerTest;