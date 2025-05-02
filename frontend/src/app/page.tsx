"use client";

import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import DynamicViewRenderer from './components/DynamicViewRenderer';

export default function Home() {
  const [activeView, setActiveView] = useState<string | null>(null);
  const [hasMessages, setHasMessages] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(true);

  // Function to handle sending a message in the chat
  const handleMessageSent = () => {
    setHasMessages(true);
    
    // If a view is active, hide it
    if (activeView) {
      setActiveView(null);
    }
    
    // Ensure chat is visible
    setIsChatVisible(true);
  };

  // Handle navigation clicks from the sidebar
  const handleNavClick = (view: string) => {
    setActiveView(view);
    // Hide chat when navigating to a view
    setIsChatVisible(false);
  };

  // Handle closing a view
  const handleCloseView = () => {
    setActiveView(null);
    // Show chat again when closing a view
    setIsChatVisible(true);
  };

  // Set up global keyboard handler for Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeView) {
        handleCloseView();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeView]);

  return (
    <main className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar onNavClick={handleNavClick} activeView={activeView} />

      {/* Main Content Area */}
      <div className="flex-1 ml-64 h-screen overflow-hidden flex flex-col">
        {/* Render active view */}
        {activeView && (
          <DynamicViewRenderer 
            viewId={activeView} 
            onClose={handleCloseView} 
          />
        )}
        
        {/* Render chat if visible */}
        {isChatVisible && <Chat isVisible={true} onMessageSent={handleMessageSent} />}
        
        {/* If nothing is visible, show a fallback */}
        {!activeView && !isChatVisible && (
          <div className="flex items-center justify-center h-full">
            <button
              onClick={() => setIsChatVisible(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Start Chatting
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
