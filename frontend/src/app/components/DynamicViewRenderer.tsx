import React from 'react';

interface ViewProps {
  viewId: string;
  onClose: () => void;
}

const DynamicViewRenderer: React.FC<ViewProps> = ({ viewId, onClose }) => {
  // Function to render content based on viewId
  const renderContent = () => {
    switch (viewId) {
      case 'what-we-do':
        return (
          <div className="p-6">
            <h2 className="text-3xl font-bold mb-6">What We Do</h2>
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <h3 className="text-xl font-semibold mb-3">AI-Powered Solutions</h3>
                <p className="text-gray-700">
                  NicorAI specializes in creating custom AI solutions tailored to your business needs. 
                  We leverage cutting-edge machine learning and natural language processing to automate tasks, 
                  analyze data, and provide actionable insights.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <h3 className="text-xl font-semibold mb-3">Conversational AI</h3>
                <p className="text-gray-700">
                  Our conversational AI platforms enable seamless interactions between your business and customers.
                  From intelligent chatbots to sophisticated virtual assistants, we help you enhance customer experience
                  and streamline operations.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <h3 className="text-xl font-semibold mb-3">Data Analytics</h3>
                <p className="text-gray-700">
                  Turn your data into valuable insights with our advanced analytics solutions. We help you
                  identify patterns, predict trends, and make data-driven decisions that drive growth
                  and efficiency.
                </p>
              </div>
            </div>
          </div>
        );
        
      case 'what-weve-done':
        return (
          <div className="p-6">
            <h2 className="text-3xl font-bold mb-6">What We've Done</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Case Study 1 */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Case Study Image</span>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-2">Healthcare AI Assistant</h3>
                  <p className="text-gray-700 mb-3">
                    Developed an AI assistant for a major healthcare provider that reduced administrative workload by 35%.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Healthcare</span>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">NLP</span>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Workflow Automation</span>
                  </div>
                </div>
              </div>
              
              {/* Case Study 2 */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Case Study Image</span>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-2">Retail Demand Forecasting</h3>
                  <p className="text-gray-700 mb-3">
                    Built predictive models for a retail chain that improved inventory management and increased sales by 22%.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Retail</span>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Predictive Analytics</span>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">ML</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'connect':
        return (
          <div className="p-6">
            <h2 className="text-3xl font-bold mb-6">Connect With Us</h2>
            
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 max-w-2xl mx-auto">
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your company name"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 resize-none"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        );
        
      case 'us':
        return (
          <div className="p-6">
            <h2 className="text-3xl font-bold mb-6">About Us</h2>
            
            <div className="mb-8 max-w-3xl">
              <p className="text-gray-700 mb-4">
                NicorAI was founded with a vision to make artificial intelligence accessible and practical
                for businesses of all sizes. Our team of experts combines deep technical knowledge with
                business acumen to deliver AI solutions that drive real results.
              </p>
              <p className="text-gray-700">
                We believe in the transformative power of AI and are committed to helping our clients
                leverage this technology to innovate, grow, and stay ahead in today's competitive landscape.
              </p>
            </div>
            
            <h3 className="text-2xl font-semibold mb-4">Our Team</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {/* Team Member 1 */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Team Member Photo</span>
                </div>
                <div className="p-4">
                  <h4 className="text-lg font-semibold">Jane Doe</h4>
                  <p className="text-blue-700 text-sm mb-2">CEO & Founder</p>
                  <p className="text-gray-700 text-sm">
                    AI enthusiast with 15+ years of experience in machine learning and business leadership.
                  </p>
                </div>
              </div>
              
              {/* Team Member 2 */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Team Member Photo</span>
                </div>
                <div className="p-4">
                  <h4 className="text-lg font-semibold">John Smith</h4>
                  <p className="text-blue-700 text-sm mb-2">CTO</p>
                  <p className="text-gray-700 text-sm">
                    Former research scientist with expertise in NLP and conversational AI architectures.
                  </p>
                </div>
              </div>
              
              {/* Team Member 3 */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Team Member Photo</span>
                </div>
                <div className="p-4">
                  <h4 className="text-lg font-semibold">Emily Chen</h4>
                  <p className="text-blue-700 text-sm mb-2">Lead Data Scientist</p>
                  <p className="text-gray-700 text-sm">
                    PhD in Computer Science with specialization in predictive modeling and data analysis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p className="text-lg text-gray-700">Select a section from the sidebar to view content</p>
          </div>
        );
    }
  };

  return (
    <div className="relative flex-1 h-full overflow-auto bg-gray-50">
      <div className="sticky top-0 right-0 p-4 flex justify-end">
        <button
          onClick={onClose}
          className="p-2 text-gray-500 hover:text-gray-700 bg-white rounded-full shadow-sm"
          aria-label="Close view"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {renderContent()}
    </div>
  );
};

export default DynamicViewRenderer; 