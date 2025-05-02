import Link from 'next/link';
import React from 'react';

interface SidebarProps {
  onNavClick: (view: string) => void;
  activeView: string | null;
}

const Sidebar: React.FC<SidebarProps> = ({ onNavClick, activeView }) => {
  // Mock recent chats data
  const recentChats = [
    { id: 1, title: 'Project Planning', date: '2 days ago' },
    { id: 2, title: 'Marketing Strategy', date: 'Yesterday' },
    { id: 3, title: 'Technical Support', date: 'Just now' },
  ];

  const navItems = [
    { id: 'what-we-do', label: 'What We Do' },
    { id: 'what-weve-done', label: 'What We\'ve Done' },
    { id: 'connect', label: 'Connect' },
    { id: 'us', label: 'Us' },
  ];

  const handleNavClick = (id: string) => {
    onNavClick(id);
  };

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 fixed left-0 top-0 flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-blue-600">NicorAI</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  activeView === item.id
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Recent Chats Section */}
      <div className="p-4 border-t border-gray-200">
        <h2 className="font-semibold mb-3 text-gray-800">Recent Chats</h2>
        <ul className="space-y-2">
          {recentChats.map((chat) => (
            <li key={chat.id} className="group">
              <Link 
                href="#"
                className="flex items-start p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {chat.title}
                  </p>
                  <p className="text-xs text-gray-600">{chat.date}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar; 