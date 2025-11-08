/**
 * AI Tutor Panel Component
 * * This is a simplified chat interface specifically for the AI tutor.
 */
import React, { useState } from 'react';
import { MOCK_CHAT_HISTORY } from '@/lib/constants';
import { callGeminiAPI } from '@/lib/api';
import Input from './ui/Input';
import Button from './ui/Button';
import { SendIcon } from './icons';

const AiTutorPanel = () => {
  const [messages, setMessages] = useState(MOCK_CHAT_HISTORY['ai']);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || isTyping) return;

    const msg = { from: 'self', text: newMessage };
    const newMessages = [...messages, msg];
    setMessages(newMessages);
    setNewMessage('');
    setIsTyping(true);

    const systemPrompt = "You are Study Sphere, a helpful and friendly AI academic assistant. A student is asking you for help. Provide a clear, educational, and encouraging response.";
    const aiResponseText = await callGeminiAPI(msg.text, systemPrompt);
    const aiResponse = { from: 'ai', text: aiResponseText };
    setMessages([...newMessages, aiResponse]);
    setIsTyping(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      <div className="p-4 border-b">
        <h1 className="text-2xl font-bold text-gray-900">Study Sphere AI</h1>
        <p className="text-gray-600">Your personal AI-powered study assistant.</p>
      </div>
      
      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.from === 'self' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex items-start max-w-lg ${msg.from === 'self' ? 'flex-row-reverse' : ''}`}>
              {msg.from !== 'self' && (
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xl mr-2 flex-shrink-0">
                  🤖
                </div>
              )}
              <div
                className={`p-3 rounded-2xl ${
                  msg.from === 'self' 
                    ? 'bg-indigo-600 text-white rounded-br-none' 
                    : 'bg-white text-gray-800 shadow-md rounded-bl-none'
                }`}
              >
                <p>{msg.text}</p>
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start max-w-lg">
              <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xl mr-2 flex-shrink-0">
                🤖
              </div>
              <div className="p-3 rounded-2xl bg-white text-gray-800 shadow-md rounded-bl-none">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="p-4 bg-white border-t border-gray-200">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
          <Input
            placeholder="Ask about a topic, e.g., 'Explain photosynthesis'"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" variant="primary" className="p-3 rounded-full" disabled={isTyping}>
            <SendIcon className="w-5 h-5" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AiTutorPanel;