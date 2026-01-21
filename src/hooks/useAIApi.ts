import { useState, useCallback } from 'react';
import type { ChatMessage } from './useChat';
import type { AIModel } from '@/types/models';

export interface ApiError {
  message: string;
  type: 'network' | 'auth' | 'rate_limit' | 'server' | 'unknown';
}

export function useAIApi() {
  const [error, setError] = useState<ApiError | null>(null);

  const callAIApi = useCallback(async (
    _apiKey: string,
    model: AIModel,
    _messages: ChatMessage[],
    onStream?: (chunk: string) => void
  ): Promise<string> => {
    setError(null);
    
    try {
      // For demonstration, we'll simulate streaming response
      // In a real implementation, you would connect to the actual API
      const simulatedResponse = `This is a simulated response from ${model.name} (${model.provider}).\n\n` +
        `Model Details:\n` +
        `- Parameters: ${model.parameters || 'N/A'}\n` +
        `- Active Parameters: ${model.activeParameters || 'N/A'}\n` +
        `- Context Window: ${model.contextWindow || 'Standard'}\n` +
        `- Features: ${model.features?.join(', ') || 'General Purpose'}\n\n` +
        `To connect to the actual API, you would need to implement the specific API call for ${model.provider} models.\n\n` +
        `This playground provides a framework where you can input your API key and test different AI models. The actual API integration would depend on the specific endpoints and authentication methods used by each provider.`;

      // Simulate streaming
      if (onStream) {
        const chunks = simulatedResponse.split('\n');
        let accumulated = '';
        
        for (const chunk of chunks) {
          await new Promise(resolve => setTimeout(resolve, 50));
          accumulated += chunk + '\n';
          onStream(accumulated);
        }
      }

      return simulatedResponse;
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      const errorType: ApiError['type'] = errorMessage.includes('401') ? 'auth' :
                                        errorMessage.includes('429') ? 'rate_limit' :
                                        errorMessage.includes('network') ? 'network' :
                                        errorMessage.includes('server') ? 'server' : 'unknown';
      
      const apiError: ApiError = {
        message: errorMessage,
        type: errorType
      };
      
      setError(apiError);
      throw apiError;
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    callAIApi,
    error,
    clearError,
  };
}
