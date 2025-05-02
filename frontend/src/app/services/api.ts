// Mock API service for NicorAI frontend
// This file would be replaced with actual API calls in production

// Types
export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface DynamicView {
  id: string;
  type: 'chart' | 'card' | 'table' | 'custom';
  data: any;
}

// Mock API class
class ApiService {
  // Send a chat message and get a response
  async sendMessage(message: string): Promise<ChatMessage> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    
    // In a real application, this would make an actual API call
    // For now, we'll just return a mock response
    return {
      id: Date.now().toString(),
      content: this.generateResponse(message),
      sender: 'ai',
      timestamp: new Date()
    };
  }
  
  // Generate a dynamic view (mock)
  async getDynamicView(viewId: string): Promise<DynamicView | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In a real app, this would fetch the view data from the backend
    // For now, we'll just return a mock view based on the requested ID
    if (viewId === 'chart-example') {
      return {
        id: 'chart-example',
        type: 'chart',
        data: {
          title: 'Sample Chart',
          chartType: 'bar',
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
          values: [12, 19, 3, 5, 2]
        }
      };
    }
    
    if (viewId === 'card-example') {
      return {
        id: 'card-example',
        type: 'card',
        data: {
          title: 'Important Information',
          content: 'This is a dynamically generated card with important information.',
          actions: [
            { label: 'Learn More', url: '#' }
          ]
        }
      };
    }
    
    return null;
  }
  
  // Private helper to generate responses (very basic)
  private generateResponse(message: string): string {
    message = message.toLowerCase();
    
    if (message.includes('hello') || message.includes('hi')) {
      return "Hello! I'm the NicorAI assistant. How can I help you today?";
    }
    
    if (message.includes('help')) {
      return "I'd be happy to help! You can ask me about our AI services, schedule a demo, or get information about how our solutions can benefit your business.";
    }
    
    if (message.includes('service') || message.includes('offer')) {
      return "NicorAI offers a range of AI-powered services including conversational AI, data analytics, and custom AI solutions tailored to your business needs. Would you like more specific information about any of these services?";
    }
    
    if (message.includes('demo') || message.includes('try')) {
      return "I'd be happy to set up a demo for you! Please provide your contact information through our 'Connect' page, and our team will reach out to schedule a personalized demonstration.";
    }
    
    if (message.includes('price') || message.includes('cost')) {
      return "Our pricing is customized based on your business needs and the scope of the solution. Contact us through the 'Connect' page for a detailed quote tailored to your requirements.";
    }
    
    // Default response
    return `Thanks for your message. Our team at NicorAI specializes in building custom AI solutions to help businesses like yours. Would you like to know more about how we can assist with your specific needs?`;
  }
}

// Export a singleton instance
const apiService = new ApiService();
export default apiService; 