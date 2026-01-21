import { useState, useCallback } from 'react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  model?: string;
  isStreaming?: boolean;
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(null);

  const addMessage = useCallback((message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage: ChatMessage = {
      ...message,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
    return newMessage.id;
  }, []);

  const updateMessage = useCallback((id: string, updates: Partial<ChatMessage>) => {
    setMessages(prev => prev.map(msg => 
      msg.id === id ? { ...msg, ...updates } : msg
    ));
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setStreamingMessageId(null);
    setIsLoading(false);
  }, []);

  const startStreaming = useCallback((messageId: string) => {
    setStreamingMessageId(messageId);
    setIsLoading(true);
  }, []);

  const stopStreaming = useCallback(() => {
    setStreamingMessageId(null);
    setIsLoading(false);
  }, []);

  return {
    messages,
    isLoading,
    streamingMessageId,
    addMessage,
    updateMessage,
    clearMessages,
    startStreaming,
    stopStreaming,
  };
}
