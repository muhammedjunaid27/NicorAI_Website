// API service for NicorAI frontend
// Connects to the real API Gateway

// Configuration
const API_GATEWAY_URL = 'http://localhost:4000';
const DEVELOPMENT_MODE = true; // Set to false in production

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

// API class
class ApiService {
  // Send a chat message and get a response
  async sendMessage(message: string): Promise<ChatMessage> {
    try {
      // If in development mode and we want to test with mock responses,
      // uncomment the following line:
      // if (DEVELOPMENT_MODE) throw new Error('Testing fallback');
      
      // Create request payload
      const payload = {
        userId: 'user-123', // Can be dynamic in a real app
        message: message,
        timestamp: new Date().toISOString()
      };
      
      // Make the actual API call
      const response = await fetch(`${API_GATEWAY_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      // Parse the API Gateway response (format 4.3.1)
      const data = await response.json();
      
      // Check if the response has empty content
      if (!data.content?.text || data.content.text.trim() === '\n') {
        console.warn('Received empty response from API Gateway');
        
        if (DEVELOPMENT_MODE) {
          // In development, provide a mock response if the API returns empty content
          return {
            id: data.responseId || Date.now().toString(),
            content: `[MOCK CONTENT] The API returned an empty response. ${this.generateResponse(message)}`,
            sender: 'ai',
            timestamp: new Date(data.timestamp)
          };
        }
      }
      
      // Transform the API response to the ChatMessage format
      return {
        id: data.responseId || Date.now().toString(),
        content: data.content.text,
        sender: 'ai',
        timestamp: new Date(data.timestamp)
      };
    } catch (error) {
      console.error('Error calling API Gateway:', error);
      
      if (DEVELOPMENT_MODE) {
        // Determine error type for better debug information
        let fallbackMessage = '';
        
        if (error instanceof TypeError && error.message.includes('fetch')) {
          fallbackMessage = '[FALLBACK - CONNECTION ERROR] The API Gateway appears to be offline. ';
        } else {
          fallbackMessage = '[FALLBACK - API ERROR] ';
        }
        
        // Return a more informative fallback response
        console.warn('Development mode: Falling back to mock response');
        return {
          id: Date.now().toString(),
          content: `${fallbackMessage}${this.generateResponse(message)}`,
          sender: 'ai',
          timestamp: new Date()
        };
      } else {
        // In production, rethrow the error to be handled by the component
        throw error;
      }
    }
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
  
  // Private helper to generate responses for fallback mode
  private generateResponse(message: string): string {
    message = message.toLowerCase();
    
    if (message.includes('hello') || message.includes('hi')) {
      return "Hello! I'm the NicorAI assistant. How can I help you today?";
    }
    
    if (message.includes('help')) {
      return "I'd be happy to help! You can ask me about our AI services, schedule a demo, or get information about how our solutions can benefit your business.";
    }
    


    // if (message.includes('service') || message.includes('offer')) {
    //   return "NicorAI offers a range of AI-powered services including conversational AI, data analytics, and custom AI solutions tailored to your business needs. Would you like more specific information about any of these services?";
    // }
    
    // if (message.includes('demo') || message.includes('try')) {
    //   return "I'd be happy to set up a demo for you! Please provide your contact information through our 'Connect' page, and our team will reach out to schedule a personalized demonstration.";
    // }
    
    // if (message.includes('price') || message.includes('cost')) {
    //   return "Our pricing is customized based on your business needs and the scope of the solution. Contact us through the 'Connect' page for a detailed quote tailored to your requirements.";
    // }
    

    
    // Default response
    return `Thanks for your message. Our team at NicorAI specializes in building custom AI solutions to help businesses like yours. Would you like to know more about how we can assist with your specific needs?`;
  }
}

// Export a singleton instance
const apiService = new ApiService();
export default apiService; 