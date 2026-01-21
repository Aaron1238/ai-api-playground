import { useCallback, useEffect, useState } from 'react';
import './App.css';
import { useApiKey } from '@/hooks/useApiKey';
import { useChat } from '@/hooks/useChat';
import { useAIApi } from '@/hooks/useAIApi';
import { aiModels, type AIModel } from '@/types/models';
import { ApiKeyInput } from '@/sections/ApiKeyInput';
import { ModelSelector } from '@/sections/ModelSelector';
import { ChatInterface } from '@/sections/ChatInterface';
import { Toaster } from '@/components/ui/sonner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

function App() {
  const { apiKey, saveApiKey, clearApiKey, isLoaded } = useApiKey();
  const { messages, isLoading, streamingMessageId, addMessage, updateMessage, clearMessages, startStreaming, stopStreaming } = useChat();
  const { callAIApi, error, clearError } = useAIApi();
  const [selectedModel, setSelectedModel] = useState<AIModel | null>(null);

  // Set default model on load
  useEffect(() => {
    if (isLoaded && !selectedModel && aiModels.length > 0) {
      setSelectedModel(aiModels[0]);
    }
  }, [isLoaded, selectedModel]);

  const handleSendMessage = useCallback(async (content: string) => {
    if (!selectedModel || !apiKey) return;

    // Add user message
    const userMessageId = addMessage({
      role: 'user',
      content,
    });

    // Add initial assistant message (will be updated with streaming)
    const assistantMessageId = addMessage({
      role: 'assistant',
      content: '',
      model: selectedModel.name,
      isStreaming: true,
    });

    startStreaming(assistantMessageId);

    try {
      let accumulatedContent = '';
      
      await callAIApi(apiKey, selectedModel, [...messages, { id: userMessageId, role: 'user', content, timestamp: new Date() }], 
        (chunk) => {
          accumulatedContent = chunk;
          updateMessage(assistantMessageId, { content: chunk });
        }
      );

      updateMessage(assistantMessageId, { 
        content: accumulatedContent,
        isStreaming: false 
      });
      
    } catch (err) {
      // Remove the streaming message on error
      updateMessage(assistantMessageId, { 
        content: 'Sorry, an error occurred while processing your request. Please check your API key and try again.',
        isStreaming: false 
      });
    } finally {
      stopStreaming();
    }
  }, [apiKey, selectedModel, messages, addMessage, updateMessage, startStreaming, stopStreaming, callAIApi]);

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">AI API Playground</h1>
              <p className="text-sm text-muted-foreground">
                Test {aiModels.length}+ AI models with your own API key
              </p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="gap-2">
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Settings */}
          <div className="lg:col-span-1 space-y-6">
            <ApiKeyInput
              apiKey={apiKey}
              onSave={saveApiKey}
              onClear={clearApiKey}
            />
            
            <ModelSelector
              selectedModel={selectedModel}
              onSelectModel={setSelectedModel}
            />

            {/* Error Alert */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>API Error</AlertTitle>
                <AlertDescription>
                  {error.message}
                  <Button 
                    variant="link" 
                    size="sm" 
                    onClick={clearError}
                    className="ml-2 p-0 h-auto"
                  >
                    Dismiss
                  </Button>
                </AlertDescription>
              </Alert>
            )}

            {/* Info Card */}
            <div className="rounded-lg border bg-card text-card-foreground p-4">
              <h4 className="font-medium mb-2">How to use</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Enter your API key</li>
                <li>• Select an AI model</li>
                <li>• Start chatting!</li>
              </ul>
            </div>
          </div>

          {/* Right Column - Chat */}
          <div className="lg:col-span-2">
            <ChatInterface
              messages={messages}
              isLoading={isLoading}
              streamingMessageId={streamingMessageId}
              selectedModel={selectedModel}
              apiKey={apiKey}
              onSendMessage={handleSendMessage}
              onClearChat={clearMessages}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="text-center text-sm text-muted-foreground">
            <p>
              AI API Playground — Your API key is stored locally and never shared with anyone.
            </p>
            <p className="mt-1">
              Built with React, TypeScript, and Tailwind CSS. Open source on GitHub.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
