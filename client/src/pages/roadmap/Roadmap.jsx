// 📁 src/pages/roadmap/Roadmap.jsx
import { useState, useEffect, useRef } from "react";
import { useUser } from "@clerk/clerk-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function Roadmap() {
  const { user } = useUser();
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState(null);
  const [error, setError] = useState(null);
  const [abortController, setAbortController] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const saved = localStorage.getItem('sidebarOpen');
    return saved ? JSON.parse(saved) : true;
  });
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const messagesEndRef = useRef(null);

  // Apply theme and sidebar preferences
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    localStorage.setItem('sidebarOpen', JSON.stringify(sidebarOpen));
  }, [darkMode, sidebarOpen]);

  const fetchHistory = async () => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/roadmap/history?email=${user?.primaryEmailAddress?.emailAddress}`
      );
      const data = await res.json();
      if (data.success) {
        setHistory(data.history);
        if (data.history.length > 0) {
          setSelectedHistory(data.history[0].id);
        }
      }
    } catch (err) {
      console.error("Error fetching history", err);
      setError("Failed to load history");
    }
  };

  const deleteHistoryItem = async (id, e) => {
    e.stopPropagation();
    try {
      const res = await fetch(`http://localhost:3001/api/roadmap/history/${id}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (data.success) {
        setHistory(prev => prev.filter(item => item.id !== id));
        if (selectedHistory === id) {
          setMessages([]);
          setSelectedHistory(null);
        }
      }
    } catch (err) {
      console.error("Error deleting history item", err);
      setError("Failed to delete history item");
    }
  };

  useEffect(() => {
    if (user) fetchHistory();
  }, [user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const stopGeneration = () => {
    if (abortController) {
      abortController.abort();
      setLoading(false);
      setMessages(prev => [...prev, { 
        type: 'system', 
        text: "Generation stopped by user", 
        isError: true 
      }]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    const controller = new AbortController();
    setAbortController(controller);
    setLoading(true);
    setError(null);
    
    // Add user message
    const userMessage = { 
      type: 'user', 
      text: prompt,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMessage]);
    setPrompt("");

    try {
      const res = await fetch("http://localhost:3001/api/roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: user?.primaryEmailAddress?.emailAddress, 
          prompt 
        }),
        signal: controller.signal
      });

      const data = await res.json();
      if (data.success) {
        // Add assistant message with full response
        setMessages(prev => [...prev, { 
          type: 'assistant', 
          text: data.roadmap,
          timestamp: new Date().toISOString()
        }]);
        fetchHistory();
      } else {
        setMessages(prev => [...prev, { 
          type: 'system', 
          text: data.message || "Failed to generate roadmap", 
          isError: true,
          timestamp: new Date().toISOString()
        }]);
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        setMessages(prev => [...prev, { 
          type: 'system', 
          text: "Connection error. Please try again.", 
          isError: true,
          timestamp: new Date().toISOString()
        }]);
      }
    } finally {
      setLoading(false);
    }
  };

  const loadHistoryItem = (id) => {
    const item = history.find(h => h.id === id);
    if (item) {
      setSelectedHistory(id);
      setMessages([
        { 
          type: 'user', 
          text: item.prompt,
          timestamp: item.created_at
        },
        { 
          type: 'assistant', 
          text: item.roadmap,
          timestamp: item.created_at
        }
      ]);
    }
  };

  const clearCurrent = () => {
    if (loading && abortController) {
      abortController.abort();
    }
    setPrompt("");
    setMessages([]);
    setError(null);
    setLoading(false);
    setSelectedHistory(null);
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`min-h-screen flex ${darkMode ? 'dark bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        transition={{ duration: 0.3 }}
        className={`w-72 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r p-4 overflow-y-auto fixed h-screen z-20`}
      >
        <div className="flex justify-between items-center mb-6">
          <Link to='/' className='flex items-center gap-2'>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                  <path d="M12 3L1 9l11 6 9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82Z" />
                </svg>
              </div>
              <span className="text-xl font-medium">CareerAI</span>
            </div>
          </Link>
          <div className="flex items-center space-x-2">
            <button 
              onClick={clearCurrent}
              className={`text-xs ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-blue-50 hover:bg-blue-100 text-blue-600'} px-3 py-1 rounded-full transition flex items-center`}
            >
              New
            </button>
            <button 
              onClick={() => setSidebarOpen(false)}
              className={`${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <h2 className={`text-sm font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>History</h2>
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'} p-1 rounded-md`}
            title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {sidebarOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </button>
        </div>
        
        {history.length === 0 ? (
          <div className="text-center py-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'} mt-2`}>No conversations yet</p>
          </div>
        ) : (
          <ul className="space-y-2">
            {history.map((item) => (
              <motion.li 
                key={item.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`p-3 rounded-lg cursor-pointer transition relative group ${selectedHistory === item.id ? 
                  (darkMode ? 'bg-blue-900/30 border-blue-700' : 'bg-blue-50 border-blue-200') : 
                  (darkMode ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200')} border`}
                onClick={() => loadHistoryItem(item.id)}
              >
                <button 
                  onClick={(e) => deleteHistoryItem(item.id, e)}
                  className={`absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity ${darkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-500 hover:text-red-500'} p-1`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
                <p className={`font-medium text-sm ${darkMode ? 'text-gray-200' : 'text-gray-800'} pr-6 truncate`}>{item.prompt}</p>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                  {new Date(item.created_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </motion.li>
            ))}
          </ul>
        )}
      </motion.aside>

      {/* Main Chat Interface */}
      <div className={`flex-1 flex flex-col h-screen transition-all ${sidebarOpen ? 'md:ml-72' : 'ml-0'}`}>
        {/* Header */}
        <div className={`border-b ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} p-4 shadow-sm flex items-center justify-between`}>
          <div className="flex items-center">
            {!sidebarOpen && (
              <button 
                onClick={() => setSidebarOpen(true)}
                className={`mr-4 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            )}
            <h1 className="text-xl font-semibold">Career Roadmap Assistant</h1>
          </div>
          
          {/* Theme Toggle Button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-yellow-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'} transition-colors`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
        </div>

        {/* Messages Container */}
        <div className={`flex-1 overflow-y-auto p-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className={`w-24 h-24 mb-6 ${darkMode ? 'bg-gray-800' : 'bg-blue-50'} rounded-full flex items-center justify-center`}>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-10 w-10 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h2 className={`text-xl font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Welcome to Career Roadmap Assistant</h2>
              <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'} max-w-md`}>
                Describe your career goals and get a personalized roadmap to achieve them
              </p>
            </div>
          ) : (
            <div className="space-y-4 max-w-3xl mx-auto">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-3xl rounded-xl p-4 ${message.type === 'user' 
                      ? (darkMode ? 'bg-blue-700 text-white' : 'bg-blue-600 text-white')
                      : message.isError
                        ? (darkMode ? 'bg-red-900/50 border-red-700' : 'bg-red-50 border-red-200')
                        : (darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200')} border shadow-xs`}
                  >
                    {message.type === 'assistant' && (
                      <div className="flex items-center mb-2">
                        <div className={`w-8 h-8 rounded-full ${darkMode ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gradient-to-r from-blue-400 to-purple-400'} mr-2 flex items-center justify-center text-white text-sm font-medium`}>
                          AI
                        </div>
                        <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Career Assistant</span>
                        <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} ml-2`}>
                          {formatDate(message.timestamp)}
                        </span>
                      </div>
                    )}
                    {message.type === 'user' && (
                      <div className="flex items-center justify-end mb-2">
                        <span className={`text-xs ${darkMode ? 'text-blue-200' : 'text-blue-100'} mr-2`}>
                          {formatDate(message.timestamp)}
                        </span>
                        <span className={`text-sm font-medium ${darkMode ? 'text-blue-200' : 'text-blue-100'}`}>You</span>
                      </div>
                    )}
                    <div className={`whitespace-pre-wrap text-sm ${message.type === 'user' ? 'text-white' : darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                      {message.text}
                    </div>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className={`border-t ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} p-4`}>
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`p-3 mb-4 rounded-lg text-sm ${darkMode ? 'bg-red-900/50 border-red-700 text-red-300' : 'bg-red-50 border-red-200 text-red-700'} border`}
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative">
              <input
                type="text"
                required
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className={`w-full px-4 py-3 ${darkMode ? 'bg-gray-700 border-gray-600 placeholder-gray-400 text-white' : 'bg-gray-50 border-gray-200 placeholder-gray-400'} border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm`}
                placeholder="Describe your career goal (e.g. Become a Senior Frontend Developer in 2 years)"
                disabled={loading}
              />
              <AnimatePresence>
                {prompt && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    type="button"
                    onClick={() => setPrompt("")}
                    className={`absolute right-3 top-3 ${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
            <div className="flex space-x-3">
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={!loading ? { scale: 1.01 } : {}}
                whileTap={!loading ? { scale: 0.99 } : {}}
                className={`flex-1 py-3 rounded-lg font-medium transition text-sm ${loading ? 
                  (darkMode ? 'bg-blue-800 cursor-not-allowed' : 'bg-blue-400 cursor-not-allowed') : 
                  (darkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white')}`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                    </svg>
                    Send Message
                  </span>
                )}
              </motion.button>
              {loading && (
                <motion.button
                  type="button"
                  onClick={stopGeneration}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={`px-4 py-3 rounded-lg font-medium ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-white hover:bg-gray-50 text-gray-700'} border ${darkMode ? 'border-gray-600' : 'border-gray-300'} text-sm transition flex items-center justify-center`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Stop
                </motion.button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}