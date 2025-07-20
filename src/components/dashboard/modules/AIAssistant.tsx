'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AIApi } from '@/lib/api';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'aria';
  timestamp: Date;
}

const AIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I am ARIA, your Advanced Reasoning Intelligence Assistant aboard the Voyager Palen. How may I assist you today?',
      sender: 'aria',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await AIApi.chat(inputText);

      const ariaMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.success ? response.data : 'I apologize, but I am experiencing technical difficulties. Please try again.',
        sender: 'aria',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, ariaMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Connection error. Please check your network and try again.',
        sender: 'aria',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="font-orbitron text-4xl font-bold mb-2 text-glow">
          <span className="bg-gradient-to-r from-neon-blue via-neon-purple to-neon-green bg-clip-text text-transparent">
            AI ASSISTANT
          </span>
        </h1>
        <p className="font-mono text-gray-400">
          ARIA - Advanced Reasoning Intelligence Assistant
        </p>
      </motion.div>

      {/* Chat Container */}
      <div className="glass-strong rounded-xl p-6 flex-1 flex flex-col min-h-[500px]">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 max-h-96">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-neon-blue text-white'
                    : 'bg-gray-700 text-gray-100'
                }`}>
                  {message.sender === 'aria' && (
                    <div className="flex items-center mb-1">
                      <span className="text-neon-green mr-2">🤖</span>
                      <span className="font-mono text-xs text-neon-green">ARIA</span>
                    </div>
                  )}
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-60 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-gray-700 text-gray-100 max-w-xs px-4 py-2 rounded-lg">
                <div className="flex items-center mb-1">
                  <span className="text-neon-green mr-2">🤖</span>
                  <span className="font-mono text-xs text-neon-green">ARIA</span>
                </div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-neon-green rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-neon-green rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-neon-green rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask ARIA about ship systems, navigation, or anything else..."
            className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue"
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isLoading}
            className={`px-6 py-2 rounded-lg font-mono transition-all duration-200 ${
              inputText.trim() && !isLoading
                ? 'bg-neon-blue text-white hover:bg-neon-blue/80 hover:shadow-lg hover:shadow-neon-blue/50'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isLoading ? '...' : 'SEND'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
