import React from 'react';
import { motion } from 'framer-motion';
import { Mic, Send, Volume2 } from 'lucide-react';
import { Card, Button } from '../components';
import '../components/pages.css';

const VoiceAssistant: React.FC = () => {
  const [messages, setMessages] = React.useState<Array<{ type: 'user' | 'ai'; text: string }>>([
    {
      type: 'ai',
      text: 'Hi! I\'m your financial assistant. Ask me anything about your spending, budgets, or financial tips.',
    },
  ]);
  const [input, setInput] = React.useState('');
  const [isListening, setIsListening] = React.useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages([...messages, { type: 'user', text: input }]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          type: 'ai',
          text: 'I understand. Based on your spending patterns, I recommend setting a budget of ₹3,000 per month for dining out.',
        },
      ]);
    }, 1000);
  };

  const quickPrompts = [
    'How am I spending?',
    'Budget tips',
    'Savings advice',
    'Investment guide',
  ];

  return (
    <div className="page-content">
      <div className="voice-container">
        <div className="voice-hero">
          <h2 className="voice-title">Voice Assistant</h2>
          <p className="voice-subtitle">Ask me anything about your finances and get instant personalized advice</p>
        </div>

        <motion.button
          className="voice-button-large"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsListening(!isListening)}
        >
          <Mic size={60} />
        </motion.button>

        {isListening && (
          <motion.div
            className="listening-indicator"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              border: '2px solid #5B8FFF',
              position: 'absolute',
            }}
          />
        )}

        <Card variant="glass" className="voice-conversation">
          {messages.map((msg, idx) => (
            <div key={idx} className={`voice-message ${msg.type}`}>
              <div className={`voice-message-bubble ${msg.type}`}>{msg.text}</div>
            </div>
          ))}
        </Card>

        <div style={{ width: '100%', maxWidth: '700px', display: 'flex', gap: '1rem' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your question..."
            style={{
              flex: 1,
              padding: '1rem',
              borderRadius: '0.75rem',
              border: '2px solid #e5e7eb',
              fontSize: '1rem',
              transition: 'all 250ms ease-in-out',
            }}
          />
          <Button onClick={handleSend} icon={<Send size={18} />}>
            Send
          </Button>
        </div>

        <div style={{ width: '100%', maxWidth: '700px' }}>
          <h4 style={{ marginBottom: '1rem', color: '#6b7280' }}>Quick Prompts</h4>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {quickPrompts.map((prompt) => (
              <Button
                key={prompt}
                variant="secondary"
                size="sm"
                onClick={() => {
                  setInput(prompt);
                }}
              >
                {prompt}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant;
