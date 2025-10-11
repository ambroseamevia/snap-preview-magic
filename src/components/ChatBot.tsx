import { useState, useEffect, useRef } from 'react';
import { Bot, X, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onCategorySelect?: (category: string) => void;
  onScrollToSection?: (section: string) => void;
}

export const ChatBot = ({ isOpen, onClose, products, onCategorySelect, onScrollToSection }: ChatBotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! 👋 I'm Brivon's AI assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();

    // Product search
    if (input.includes('laptop') || input.includes('hp') || input.includes('elitebook')) {
      const laptop = products.find(p => p.name.toLowerCase().includes('elitebook') || p.name.toLowerCase().includes('laptop'));
      return laptop 
        ? `I found the ${laptop.name} for GH¢${laptop.price}! It's a great choice for productivity. Would you like to see more electronics?`
        : "We have laptops available! Check out our Electronics category.";
    }

    if (input.includes('iphone') || input.includes('phone')) {
      const phones = products.filter(p => p.category === 'Phones');
      if (phones.length > 0) {
        return `We have ${phones.length} iPhone(s) available:\n${phones.map(p => `• ${p.name} - GH¢${p.price}`).join('\n')}\nWould you like to see them?`;
      }
      return "Check out our Phones category for the latest smartphones!";
    }

    if (input.includes('charger') || input.includes('cable') || input.includes('accessories')) {
      const accessories = products.filter(p => p.category === 'Accessories');
      if (accessories.length > 0) {
        return `We have ${accessories.length} accessories:\n${accessories.map(p => `• ${p.name} - GH¢${p.price}`).join('\n')}`;
      }
      return "Browse our Accessories for chargers, cables, and more!";
    }

    if (input.includes('backpack') || input.includes('bag')) {
      const backpack = products.find(p => p.name.toLowerCase().includes('backpack'));
      return backpack
        ? `Check out our ${backpack.name} for GH¢${backpack.price}! Perfect for travel and daily use.`
        : "We have bags in our Accessories category!";
    }

    // Price inquiries
    if (input.includes('cheap') || input.includes('affordable') || input.includes('budget') || input.includes('price')) {
      const affordable = products.filter(p => p.price <= 100);
      if (affordable.length > 0) {
        return `Here are our most affordable items:\n${affordable.map(p => `• ${p.name} - GH¢${p.price}`).join('\n')}`;
      }
      return "Our prices range from GH¢30 to GH¢3,500. What's your budget?";
    }

    // Shipping info
    if (input.includes('delivery') || input.includes('shipping') || input.includes('ship')) {
      return "We deliver within 2-3 business days in Accra and 3-5 days nationwide. Free delivery on orders over GH¢500! 🚚";
    }

    // Contact
    if (input.includes('contact') || input.includes('phone') || input.includes('whatsapp') || input.includes('email')) {
      return "You can reach us at:\n📞 054 559 9550\n📧 brivonecommerce@gmail.com\n💬 WhatsApp: Click any 'Order via WhatsApp' button!";
    }

    // Categories
    if (input.includes('electronics') || input.includes('electronic')) {
      onCategorySelect?.('Electronics');
      onScrollToSection?.('products');
      return "Showing Electronics! We have laptops, phones, and more. 💻📱";
    }

    if (input.includes('phones') || input.includes('mobile')) {
      onCategorySelect?.('Phones');
      onScrollToSection?.('products');
      return "Here are our Phones! Check out our iPhone collection. 📱";
    }

    if (input.includes('accessories') || input.includes('accessory')) {
      onCategorySelect?.('Accessories');
      onScrollToSection?.('products');
      return "Showing Accessories! Chargers, cables, and bags. 🔌";
    }

    // Help/General
    if (input.includes('help') || input.includes('hi') || input.includes('hello')) {
      return "I can help you with:\n• Finding products (laptops, phones, accessories)\n• Shipping information\n• Price inquiries\n• Contact details\n\nWhat would you like to know?";
    }

    // Default
    return "I'm here to help! Try asking about:\n• Specific products (iPhone, laptop, charger)\n• Shipping & delivery\n• Prices & budget options\n• Contact information\n• Product categories";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(input),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickReply = (text: string) => {
    setInput(text);
    setTimeout(() => handleSend(), 100);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: '1',
        text: "Hi! 👋 I'm Brivon's AI assistant. How can I help you today?",
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-6 bg-card rounded-xl shadow-elevated w-96 z-50 animate-slide-up border-2 border-border max-h-[600px] flex flex-col">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground p-4 rounded-t-xl flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 animate-pulse" />
          <span className="font-semibold">AI Assistant</span>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleClearChat}
            className="hover:bg-background/20 rounded-full p-1 transition text-xs px-2"
          >
            Clear
          </button>
          <button 
            onClick={onClose} 
            className="hover:bg-background/20 rounded-full p-1 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4 bg-background" ref={scrollRef}>
        <div className="space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`rounded-lg p-3 max-w-[80%] ${
                  message.sender === 'user'
                    ? 'bg-gradient-primary text-primary-foreground'
                    : 'bg-card shadow-card border-l-4 border-accent'
                }`}
              >
                <p className="text-sm whitespace-pre-line">{message.text}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-card shadow-card border-l-4 border-accent rounded-lg p-3">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Quick Replies */}
      {messages.length <= 2 && (
        <div className="px-4 py-2 border-t border-border bg-muted/30 shrink-0">
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleQuickReply('Show me phones')}
            >
              Show Phones
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleQuickReply('Shipping info')}
            >
              Shipping Info
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleQuickReply('Contact details')}
            >
              Contact Us
            </Button>
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-border bg-card rounded-b-xl shrink-0">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me anything..."
            className="flex-1 px-3 py-2 bg-background border-2 border-input rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
          />
          <Button onClick={handleSend} size="icon" disabled={!input.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
