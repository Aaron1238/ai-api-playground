import { useState } from 'react';
import { Bot, ChevronDown, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { aiModels } from '@/types/models';
import type { AIModel } from '@/types/models';
import { getProviderColor } from '@/types/models';

interface ModelSelectorProps {
  selectedModel: AIModel | null;
  onSelectModel: (model: AIModel) => void;
}

export function ModelSelector({ selectedModel, onSelectModel }: ModelSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Group models by provider
  const modelsByProvider = aiModels.reduce((acc, model) => {
    if (!acc[model.provider]) {
      acc[model.provider] = [];
    }
    acc[model.provider].push(model);
    return acc;
  }, {} as Record<string, typeof aiModels>);

  const providerOrder = ['OpenAI', 'Google', 'MoonshotAI', 'Qwen', 'DeepSeek', 'Z.AI', 'xAI', 'NVIDIA', 'ByteDance Seed'];
  const sortedProviders = Object.keys(modelsByProvider).sort((a, b) => {
    const indexA = providerOrder.indexOf(a);
    const indexB = providerOrder.indexOf(b);
    if (indexA === -1 && indexB === -1) return a.localeCompare(b);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          Select AI Model
        </CardTitle>
        <CardDescription>
          Choose from {aiModels.length}+ cutting-edge AI models from various providers.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between text-left h-auto py-3"
            >
              {selectedModel ? (
                <div className="flex items-center gap-3 flex-1">
                  <div className={`w-2 h-2 rounded-full ${getProviderColor(selectedModel.provider)}`} />
                  <div className="flex-1 text-left">
                    <div className="font-medium">{selectedModel.name}</div>
                    <div className="text-sm text-muted-foreground">{selectedModel.provider}</div>
                  </div>
                </div>
              ) : (
                <span className="text-muted-foreground">Choose a model...</span>
              )}
              <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] max-h-[60vh]" align="start">
            <ScrollArea className="max-h-[60vh]">
              {sortedProviders.map((provider) => (
                <div key={provider}>
                  <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
                    {provider}
                  </div>
                  {modelsByProvider[provider]?.map((model) => (
                    <DropdownMenuItem
                      key={model.id}
                      onSelect={() => {
                        onSelectModel(model);
                        setIsOpen(false);
                      }}
                      className="flex flex-col items-start py-3 cursor-pointer"
                    >
                      <div className="flex items-center gap-2 w-full">
                        <div className={`w-2 h-2 rounded-full ${getProviderColor(model.provider)}`} />
                        <span className="font-medium flex-1">{model.name}</span>
                        {model.parameters && (
                          <Badge variant="secondary" className="text-xs">
                            {model.parameters}
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1 ml-4">
                        {model.features?.slice(0, 3).join(' · ')}
                      </div>
                    </DropdownMenuItem>
                  ))}
                </div>
              ))}
            </ScrollArea>
          </DropdownMenuContent>
        </DropdownMenu>

        {selectedModel && (
          <div className="space-y-3 pt-4 border-t">
            <div className="flex items-center justify-between">
              <h4 className="font-medium flex items-center gap-2">
                <Info className="h-4 w-4" />
                Model Details
              </h4>
              <Badge className={getProviderColor(selectedModel.provider)}>
                {selectedModel.provider}
              </Badge>
            </div>
            
            <p className="text-sm text-muted-foreground">
              {selectedModel.description}
            </p>

            <div className="grid grid-cols-2 gap-3">
              {selectedModel.parameters && (
                <div className="bg-muted rounded-lg p-3">
                  <div className="text-xs text-muted-foreground">Parameters</div>
                  <div className="font-medium">{selectedModel.parameters}</div>
                </div>
              )}
              {selectedModel.activeParameters && (
                <div className="bg-muted rounded-lg p-3">
                  <div className="text-xs text-muted-foreground">Active Params</div>
                  <div className="font-medium">{selectedModel.activeParameters}</div>
                </div>
              )}
              {selectedModel.contextWindow && (
                <div className="bg-muted rounded-lg p-3">
                  <div className="text-xs text-muted-foreground">Context</div>
                  <div className="font-medium">{selectedModel.contextWindow}</div>
                </div>
              )}
              {selectedModel.maxTokens && (
                <div className="bg-muted rounded-lg p-3">
                  <div className="text-xs text-muted-foreground">Max Output</div>
                  <div className="font-medium">{selectedModel.maxTokens.toLocaleString()} tokens</div>
                </div>
              )}
            </div>

            {selectedModel.features && selectedModel.features.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedModel.features.map((feature) => (
                  <Badge key={feature} variant="outline" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
