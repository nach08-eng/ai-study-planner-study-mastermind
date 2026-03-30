import React, { useState, useEffect, useRef } from 'react';
import Layout from '../components/Layout/Layout';
import { Send, User, Brain, ArrowRight, Sparkles, Plus, Clock, MessageCircle } from 'lucide-react';
import api from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your AI Study Assistant. How can I help you today?", sender: 'ai', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), text: input, sender: 'user', timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await api.post('/ai/chat', { message: input });
      const aiMessage = { 
        id: Date.now() + 1, 
        text: res.data.response, 
        sender: 'ai', 
        timestamp: new Date() 
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('AI Chat Error:', error);
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: "Sorry, I'm having trouble connecting right now. Please try again later.", 
        sender: 'ai',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    "What should I study now?",
    "How is my progress?",
    "Suggest a study plan for Math",
    "Tell me about Pomodoro"
  ];

  return (
    <Layout>
      <div className="flex flex-col h-[calc(100vh-120px)] max-w-5xl mx-auto shadow-2xl relative overflow-hidden transition-all duration-300 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        
        {/* Chat Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900 sticky top-0 z-20 transition-colors duration-300">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary-500/20">
                <Brain size={24} />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-800 dark:text-white">AI Study Assistant</h2>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase">Online • Active Intelligence</span>
                </div>
              </div>
           </div>
           <div className="hidden sm:flex items-center gap-3">
              <button className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                <Plus size={20} />
              </button>
              <button className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                <Clock size={20} />
              </button>
           </div>
        </div>

        {/* Chat Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 bg-slate-50/30 dark:bg-slate-950/20 scroll-smooth">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} group items-end gap-3`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 shrink-0 shadow-sm transition-all duration-300">
                    <Brain size={20} />
                  </div>
                )}
                <div className={`max-w-[80%] sm:max-w-[70%] p-5 rounded-[1.5rem] shadow-sm relative transition-all duration-300 ${
                  msg.sender === 'user' 
                    ? 'bg-primary-600 text-white rounded-br-none shadow-primary-500/10' 
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none border border-slate-200/50 dark:border-slate-700/50 shadow-slate-200/20 dark:shadow-none'
                }`}>
                  <p className="text-sm md:text-base font-medium leading-relaxed mb-2 prose dark:prose-invert max-w-none">
                    {msg.text.split('**').map((part, i) => i % 2 === 1 ? <b key={i} className={msg.sender === 'user' ? 'text-white' : 'text-primary-500'}>{part}</b> : part)}
                  </p>
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${msg.sender === 'user' ? 'text-white/60' : 'text-slate-400 dark:text-slate-500'}`}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                {msg.sender === 'user' && (
                  <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 shrink-0 shadow-sm transition-all duration-300">
                    <User size={20} />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex justify-start items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary-500/20">
                <Brain size={20} />
              </div>
              <div className="flex gap-1.5 p-4 bg-white dark:bg-slate-800 rounded-[1.5rem] rounded-bl-none shadow-sm border border-slate-200/50 dark:border-slate-700/50">
                <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" />
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-6 md:p-8 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors duration-300">
          <div className="flex flex-wrap gap-2 mb-6">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setInput(suggestion)}
                className="px-4 py-1.5 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary-500 hover:text-white dark:hover:bg-primary-500 dark:hover:text-white border border-transparent transition-all duration-300 active:scale-95 flex items-center gap-2 group"
              >
                <Sparkles size={12} className="group-hover:animate-spin" />
                {suggestion}
              </button>
            ))}
          </div>
          
          <form onSubmit={handleSend} className="relative group">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about your study schedule..."
              className="w-full pl-6 pr-16 py-4 bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-primary-500 focus:bg-white dark:focus:bg-slate-950 text-slate-900 dark:text-white rounded-2xl outline-none transition-all duration-300 shadow-sm font-medium pr-[4.5rem]"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className={`absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-xl transition-all duration-300 ${
                !input.trim() || isLoading 
                ? 'text-slate-300 cursor-not-allowed opacity-50' 
                : 'text-white bg-primary-600 hover:bg-primary-500 shadow-md hover:shadow-primary-500/20 active:scale-90 translate-x-[-4px]'
              }`}
            >
              <Send size={24} />
            </button>
          </form>
          <p className="mt-4 text-center text-[10px] text-slate-400 dark:text-slate-600 font-bold uppercase tracking-tight">AI Assistant can make mistakes. Verify important deadlines.</p>
        </div>
      </div>
    </Layout>
  );
};

export default Chat;
