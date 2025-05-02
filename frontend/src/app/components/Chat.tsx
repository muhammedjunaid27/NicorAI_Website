import React, { useState, useRef, useEffect } from 'react';
import apiService, { ChatMessage, DynamicView } from '../services/api';
import DynamicContentRenderer from './DynamicContentRenderer';

interface ChatProps {
  isVisible: boolean;
  onMessageSent?: () => void;
}

const Chat: React.FC<ChatProps> = ({ isVisible, onMessageSent }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dynamicView, setDynamicView] = useState<DynamicView | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const faqSuggestions = [
    "How can AI help my business?",
    "What services does NicorAI offer?",
    "How do I get started with NicorAI?",
    "What industries do you specialize in?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to handle sending a message
  const sendMessage = async (content: string) => {
    if (!content.trim()) return;
    
    // Add user message to chat
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setError(null);
    
    // Notify parent that a message was sent
    onMessageSent?.();
    
    try {
      // Use the API service to get a response
      const aiResponse = await apiService.sendMessage(content);
      setMessages(prev => [...prev, aiResponse]);

      // Check if we should show a dynamic view
      // This is just an example - in a real app, the backend would determine this
      if (content.toLowerCase().includes('chart') || content.toLowerCase().includes('report')) {
        const view = await apiService.getDynamicView('chart-example');
        if (view) {
          setDynamicView(view);
        }
      } else if (content.toLowerCase().includes('info') || content.toLowerCase().includes('details')) {
        const view = await apiService.getDynamicView('card-example');
        if (view) {
          setDynamicView(view);
        }
      }
    } catch (error) {
      setError('Failed to get a response. Please try again.');
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const handleFaqClick = (question: string) => {
    sendMessage(question);
  };

  const handleCloseDynamicView = () => {
    setDynamicView(null);
  };

  const renderInitialView = () => (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="w-full max-w-lg">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to NicorAI Assistant</h2>
          <p className="text-gray-700">How can I help you today?</p>
        </div>
        
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="relative">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message here..."
              className="w-full p-4 pr-12 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none h-24 placeholder-gray-500"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <button
              type="submit"
              className="absolute right-3 bottom-3 p-2 text-blue-600 hover:text-blue-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </button>
          </div>
        </form>
        
        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-700">Frequently asked questions:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {faqSuggestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleFaqClick(question)}
                className="p-3 text-left text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderChatView = () => (
    <div className="flex flex-col h-full">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto py-4 px-6">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`mb-4 ${message.sender === 'user' ? 'flex justify-end' : 'flex justify-start'}`}
          >
            <div 
              className={`max-w-[75%] rounded-lg p-4 ${
                message.sender === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
              <div 
                className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-blue-100' : 'text-gray-600'
                }`}
              >
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="bg-gray-100 rounded-lg p-4 max-w-[75%]">
              <div className="flex space-x-2 items-center">
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          </div>
        )}
        
        {error && (
          <div className="mx-auto p-3 my-2 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area - fixed at bottom */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <form onSubmit={handleSubmit} className="flex items-end">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message here..."
              className="w-full p-3 pr-12 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none h-12 min-h-12 max-h-32 placeholder-gray-500"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <button
              type="submit"
              disabled={isLoading}
              className={`absolute right-3 bottom-3 p-1 ${
                isLoading ? 'text-gray-400' : 'text-blue-600 hover:text-blue-800'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  if (!isVisible) {
    return null;
  }

  return (
    <div className="flex-1 h-full flex flex-col">
      {messages.length === 0 ? renderInitialView() : renderChatView()}
      
      {/* Render dynamic view if available */}
      {dynamicView && (
        <DynamicContentRenderer 
          view={dynamicView} 
          onClose={handleCloseDynamicView} 
        />
      )}
    </div>
  );
};

export default Chat; 