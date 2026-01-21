import { useState } from 'react';
import { Key, Eye, EyeOff, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

interface ApiKeyInputProps {
  apiKey: string;
  onSave: (key: string) => void;
  onClear: () => void;
}

export function ApiKeyInput({ apiKey, onSave, onClear }: ApiKeyInputProps) {
  const [inputKey, setInputKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [isEditing, setIsEditing] = useState(!apiKey);

  const handleSave = () => {
    if (inputKey.trim()) {
      onSave(inputKey.trim());
      setIsEditing(false);
      toast.success("API Key Saved", {
        description: "Your API key has been securely stored locally.",
      });
    }
  };

  const handleClear = () => {
    onClear();
    setInputKey('');
    setIsEditing(true);
    toast.error("API Key Cleared", {
      description: "Your API key has been removed from local storage.",
    });
  };

  const handleEdit = () => {
    setInputKey(apiKey);
    setIsEditing(true);
  };

  const toggleShowKey = () => {
    setShowKey(!showKey);
  };

  const displayedKey = apiKey ? `${apiKey.slice(0, 8)}...${apiKey.slice(-4)}` : '';

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5" />
          API Configuration
        </CardTitle>
        <CardDescription>
          Enter your API key to start chatting with AI models. Your key is stored locally and never shared.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isEditing ? (
          <div className="space-y-2">
            <Label htmlFor="api-key">API Key</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  id="api-key"
                  type={showKey ? 'text' : 'password'}
                  placeholder="Enter your API key..."
                  value={inputKey}
                  onChange={(e) => setInputKey(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                  className="api-key-input"
                />
                <button
                  type="button"
                  onClick={toggleShowKey}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <Button 
                onClick={handleSave} 
                disabled={!inputKey.trim()}
                className="gap-2"
              >
                <Check className="h-4 w-4" />
                Save
              </Button>
              {apiKey && (
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>API Key</Label>
              <div className="flex items-center gap-2 font-mono text-sm bg-muted px-3 py-2 rounded-md">
                <Key className="h-4 w-4 text-green-500" />
                <span>{displayedKey}</span>
                <span className="text-green-500 text-xs font-sans">✓ Connected</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleEdit}>
                Edit
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleClear}
                className="text-destructive hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
