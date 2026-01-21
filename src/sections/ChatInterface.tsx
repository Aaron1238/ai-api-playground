import { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2, Trash2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import type { ChatMessage } from '@/hooks/useChat';
import type { AIModel } from '@/types/models';
import { getProviderColor } from '@/types/models';
import { toast } from 'sonner';

interface ChatInterfaceProps {
  messages: ChatMessage[];
  isLoading: boolean;
  streamingMessageId: string | null;
  selectedModel: AIModel | null;
  apiKey: string;
  onSendMessage: (content: string) => void;
  onClearChat: () => void;
}

export function ChatInterface({
  messages,
  isLoading,
  streamingMessageId,
  selectedModel,
  apiKey,
  onSendMessage,
  onClearChat,
}: ChatInterfaceProps) {
  const [input, setInput] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    if (!apiKey) {
      toast.error("API Key Required", {
        description: "Please configure your API key first.",
      });
      return;
    }

    if (!selectedModel) {
      toast.error("Model Required", {
        description: "Please select an AI model first.",
      });
      return;
    }

    onSendMessage(input.trim());
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isStreaming = (messageId: string) => streamingMessageId === messageId;

  return (
    <Card className="w-full flex flex-col h-[600px]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          Chat Interface
        </CardTitle>
        <div className="flex items-center gap-2">
          {selectedModel && (
            <Badge variant="secondary" className="hidden sm:flex items-center gap-1">
              <div className={`w-1.5 h-1.5 rounded-full ${getProviderColor(selectedModel.provider)}`} />
              {selectedModel.name}
            </Badge>
          )}
          {messages.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearChat}
              className="gap-1"
            >
              <Trash2 className="h-4 w-4" />
              Clear
            </Button>
          )}
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="flex-1 p-0 flex flex-col">
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Bot className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">Start a conversation</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                {selectedModel
                  ? `Ask ${selectedModel.name} anything. The model will respond based on its training and capabilities.`
                  : 'Select an AI model and enter your API key to start chatting.'}
              </p>
              {!apiKey && (
                <p className="text-sm text-destructive mt-2">
                  Please configure your API key first.
                </p>
              )}
              {apiKey && !selectedModel && (
                <p className="text-sm text-destructive mt-2">
                  Please select an AI model to start.
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`flex gap-3 max-w-[85%] ${
                      message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      {message.role === 'user' ? (
                        <User className="h-4 w-4" />
                      ) : (
                        <Bot className="h-4 w-4" />
                      )}
                    </div>
                    <div
                      className={`rounded-lg px-4 py-2 ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">
                        {message.content}
                        {isStreaming(message.id) && (
                          <span className="inline-block w-2 h-4 bg-current ml-1 animate-pulse" />
                        )}
                      </div>
                      <div className="text-xs opacity-60 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                        {message.model && (
                          <span className="ml-2">· {message.model}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && !streamingMessageId && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                  <div className="bg-muted rounded-lg px-4 py-2">
                    <div className="text-sm text-muted-foreground">
                      {selectedModel?.name} is thinking...
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </ScrollArea>

        <Separator />

        <div className="p-4">
          <div className="flex gap-2">
            <Textarea
              placeholder={
                !apiKey
                  ? 'Configure your API key first...'
                  : !selectedModel
                  ? 'Select an AI model first...'
                  : `Ask ${selectedModel.name} something...`
              }
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={!apiKey || !selectedModel || isLoading}
              className="min-h-[60px] max-h-[120px] resize-none"
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || !apiKey || !selectedModel || isLoading}
              className="h-[60px] px-4"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
