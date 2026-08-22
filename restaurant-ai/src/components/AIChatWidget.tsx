"use client";
import { useState, useRef } from 'react';
import { MessageSquare, X, Send, Loader2, Mic, Settings } from 'lucide-react';
import { RestaurantAPI } from '@/lib/api/restaurants';

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  // Personalization settings
  const [showSettings, setShowSettings] = useState(false);
  const [preference, setPreference] = useState('All');

  const handleSend = async (textToSubmit = query) => {
    if (!textToSubmit.trim()) return;
    const newHistory = [...history, { role: 'user', content: textToSubmit }];
    setHistory(newHistory);
    setQuery('');
    setLoading(true);
    try {
      const res = await RestaurantAPI.chatWithAI(textToSubmit, history, preference);
      const replyContent = res.reply || res.message || (res.detail ? JSON.stringify(res.detail) : 'AI Response');
      setHistory([...newHistory, { role: 'ai', content: replyContent }]);
    } catch (e) {
      setHistory([...newHistory, { role: 'ai', content: 'Error occurred connecting to AI.' }]);
    } finally {
      setLoading(false);
    }
  };

  const startVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support Voice Search.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN'; // Works great for Hinglish
    recognition.interimResults = false;
    
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      // Auto send after 1 second
      setTimeout(() => handleSend(transcript), 500);
    };
    
    recognition.start();
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
    <div className="fixed bottom-6 right-6 w-[350px] bg-card border rounded-2xl shadow-xl z-50 flex flex-col h-[500px] overflow-hidden">
      <div className="p-4 flex justify-between items-center bg-primary text-primary-foreground">
        <h3 className="font-bold flex items-center gap-2">
          <MessageSquare className="w-4 h-4" /> AI Assistant
        </h3>
        <div className="flex gap-2">
          <button onClick={() => setShowSettings(!showSettings)} className="hover:bg-primary-foreground/20 rounded-full p-1"><Settings className="w-4 h-4" /></button>
          <button onClick={() => setIsOpen(false)} className="hover:bg-primary-foreground/20 rounded-full p-1"><X className="w-5 h-5" /></button>
        </div>
      </div>
      
      {showSettings && (
        <div className="p-3 bg-muted border-b text-sm flex items-center justify-between">
          <span className="font-semibold">Food Preference:</span>
          <select 
            className="border rounded p-1 text-xs" 
            value={preference} 
            onChange={(e) => setPreference(e.target.value)}
          >
            <option value="All">Anything (All)</option>
            <option value="Veg">Strictly Vegetarian 🥬</option>
            <option value="Non-Veg">Non-Vegetarian 🍗</option>
          </select>
        </div>
      )}

      <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 bg-muted/30">
        {history.length === 0 && (
          <div className="text-center text-sm text-muted-foreground mt-4">
            Hi! I am your AI Restaurant Assistant. Ask me for recommendations based on real customer reviews!
          </div>
        )}
        {history.map((msg, i) => (
          <div key={i} className={`p-3 rounded-xl max-w-[85%] text-sm ${msg.role === 'user' ? 'bg-primary text-primary-foreground self-end rounded-br-sm' : 'bg-background border self-start rounded-bl-sm whitespace-pre-line'}`}>
            {msg.content}
          </div>
        ))}
        {loading && <Loader2 className="w-5 h-5 animate-spin self-start text-muted-foreground ml-2" />}
      </div>
      <div className="p-3 border-t bg-background flex gap-2 items-center">
        <button 
          onClick={startVoiceInput} 
          className={`p-2 rounded-full flex-shrink-0 flex items-center justify-center transition-colors ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-muted hover:bg-muted/80 text-foreground'}`}
          title="Speak"
        >
          <Mic className="w-4 h-4" />
        </button>
        <input 
          type="text" 
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          className="flex-1 bg-muted border-transparent focus:bg-background rounded-full px-4 py-2 text-sm outline-none ring-1 ring-border focus:ring-primary"
          placeholder={isListening ? "Listening..." : "Ask me anything..."}
        />
        <button onClick={() => handleSend()} className="p-2 bg-primary text-primary-foreground rounded-full flex-shrink-0 flex items-center justify-center hover:bg-primary/90" disabled={loading}>
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
