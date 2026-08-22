"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MessageSquare, X, Send, Loader2, Bot, Mic, Settings } from "lucide-react";

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: 'Hi! I am your AI Restaurant Assistant. Ask me for recommendations based on real customer reviews!' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preference, setPreference] = useState("All");
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Notification sound using Web Audio API (no external file needed)
  const playNotificationSound = useCallback(() => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      // Pleasant "ding" sound
      oscillator.frequency.setValueAtTime(830, audioCtx.currentTime);
      oscillator.frequency.setValueAtTime(1000, audioCtx.currentTime + 0.1);
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
      
      oscillator.start(audioCtx.currentTime);
      oscillator.stop(audioCtx.currentTime + 0.4);
    } catch (err) {
      // Silently ignore if audio not supported
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const startVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support Voice Search.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN'; // Hinglish friendly
    recognition.interimResults = false;
    
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      setTimeout(() => submitQuery(transcript), 500);
    };
    
    recognition.start();
  };

  const submitQuery = async (textToSubmit: string) => {
    if (!textToSubmit.trim()) return;
    
    const userMessage = textToSubmit;
    setQuery("");
    
    // Format history for backend
    const apiHistory = messages.map(m => ({ role: m.role, content: m.text }));
    
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const baseUrl = 'https://zomato-3-hi4f.onrender.com';
      const response = await fetch(`${baseUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          query: userMessage,
          history: apiHistory,
          preference: preference
        })
      });

      const textText = await response.text();
      try {
        const data = JSON.parse(textText);
        setMessages(prev => [...prev, { role: 'ai', text: data.reply || data.response || "No response received" }]);
        playNotificationSound();
      } catch (parseError) {
        setMessages(prev => [...prev, { role: 'ai', text: `Error parsing JSON. Status: ${response.status}.` }]);
      }
    } catch (error: any) {
      setMessages(prev => [...prev, { role: 'ai', text: `Connection Error! Error details: ${error.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitQuery(query);
  };

  return (
    <div className="fixed bottom-24 right-4 z-50 sm:bottom-8 sm:right-8">
      {isOpen ? (
        <div className="bg-card border border-border shadow-2xl rounded-2xl w-[320px] sm:w-[400px] h-[450px] sm:h-[500px] flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-primary p-3 sm:p-4 text-primary-foreground flex justify-between items-center shadow-md z-10">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <h3 className="font-bold text-sm sm:text-base flex items-center gap-2">
                Restaurant AI
                <span className="w-2.5 h-2.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)] animate-pulse" title="Online"></span>
              </h3>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowSettings(!showSettings)} className="hover:bg-primary/80 p-1 rounded transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <button onClick={() => setIsOpen(false)} className="hover:bg-primary/80 p-1 rounded transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Settings Bar */}
          {showSettings && (
            <div className="bg-muted p-2 flex items-center justify-between border-b border-border text-sm">
              <span className="font-semibold text-foreground">Diet Preference:</span>
              <select 
                className="bg-background text-foreground border rounded px-2 py-1 text-xs"
                value={preference}
                onChange={(e) => setPreference(e.target.value)}
              >
                <option value="All">Everything</option>
                <option value="Veg">Strictly Veg 🥬</option>
                <option value="Non-Veg">Non-Veg 🍗</option>
              </select>
            </div>
          )}

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4 bg-muted/30">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-3 sm:px-4 py-2 text-sm shadow-sm whitespace-pre-wrap ${
                  msg.role === 'user' 
                    ? 'bg-primary text-primary-foreground rounded-tr-sm' 
                    : 'bg-card border border-border text-card-foreground rounded-tl-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  <span className="text-sm font-medium">AI is thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-card border-t border-border">
            <form onSubmit={handleSubmit} className="flex gap-2 items-center">
              <button 
                type="button"
                onClick={startVoiceInput}
                className={`p-2 rounded-xl transition-colors shadow-sm flex-shrink-0 ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-muted hover:bg-muted/80 text-foreground'}`}
              >
                <Mic className="w-5 h-5" />
              </button>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={isListening ? "Listening..." : "Ask for the best veg burger..."}
                className="flex-1 rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary text-foreground"
                disabled={isLoading}
              />
              <button 
                type="submit" 
                disabled={isLoading || !query.trim()}
                className="bg-primary hover:bg-primary/90 text-primary-foreground p-2 rounded-xl disabled:opacity-50 transition-colors shadow-sm flex-shrink-0"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="relative group">
          <div className="absolute -inset-2 bg-primary rounded-full animate-ping opacity-30"></div>
          <button
            onClick={() => { setIsOpen(true); playNotificationSound(); }}
            className="relative bg-primary hover:bg-primary/90 text-primary-foreground p-3 sm:p-4 rounded-full shadow-2xl transition-all transform hover:scale-110 flex items-center justify-center animate-pulse"
          >
            <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      )}
    </div>
  );
}
