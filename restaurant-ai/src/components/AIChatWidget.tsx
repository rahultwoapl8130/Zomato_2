"use client";
import { useState } from 'react';
import { MessageSquare, X, Send, Loader2 } from 'lucide-react';
import { RestaurantAPI } from '@/lib/api/restaurants';

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!query.trim()) return;
    const newHistory = [...history, { role: 'user', content: query }];
    setHistory(newHistory);
    setQuery('');
    setLoading(true);
    try {
      const res = await RestaurantAPI.chatWithAI(query, history);
      setHistory([...newHistory, { role: 'ai', content: res.reply || 'AI Response' }]);
    } catch (e) {
      setHistory([...newHistory, { role: 'ai', content: 'Error occurred connecting to AI.' }]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 z-50 flex items-center justify-center"
      >
        <MessageSquare className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 bg-card border rounded-2xl shadow-xl z-50 flex flex-col h-96 overflow-hidden">
      <div className="p-4 flex justify-between items-center bg-primary text-primary-foreground">
        <h3 className="font-bold flex items-center gap-2">
          <MessageSquare className="w-4 h-4" /> AI Assistant
        </h3>
        <button onClick={() => setIsOpen(false)} className="hover:bg-primary-foreground/20 rounded-full p-1"><X className="w-5 h-5" /></button>
      </div>
      <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 bg-muted/30">
        {history.length === 0 && (
          <div className="text-center text-sm text-muted-foreground mt-4">
            Hello! Ask me anything about our restaurants.
          </div>
        )}
        {history.map((msg, i) => (
          <div key={i} className={`p-3 rounded-xl max-w-[85%] text-sm ${msg.role === 'user' ? 'bg-primary text-primary-foreground self-end rounded-br-sm' : 'bg-background border self-start rounded-bl-sm'}`}>
            {msg.content}
          </div>
        ))}
        {loading && <Loader2 className="w-5 h-5 animate-spin self-start text-muted-foreground ml-2" />}
      </div>
      <div className="p-3 border-t bg-background flex gap-2">
        <input 
          type="text" 
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          className="flex-1 bg-muted border-transparent focus:bg-background rounded-full px-4 py-2 text-sm outline-none ring-1 ring-border focus:ring-primary"
          placeholder="Ask me anything..."
        />
        <button onClick={handleSend} className="p-2 bg-primary text-primary-foreground rounded-full flex-shrink-0 flex items-center justify-center hover:bg-primary/90" disabled={loading}>
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
