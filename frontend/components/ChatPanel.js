/**
 * Chat Panel Component
 * * This is the main chat interface.
 */
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { MOCK_CHAT_CONTACTS, MOCK_CHAT_HISTORY } from '@/lib/constants';
import { callGeminiAPI } from '@/lib/api';
import Input from './ui/Input';
import Button from './ui/Button';
import { SendIcon } from './icons';

const ChatPanel = () => {
  const { user } = useAuth();
  const [contacts, setContacts] = useState(MOCK_CHAT_CONTACTS);
  const [selectedContactId, setSelectedContactId] = useState('ai');
  const [messages, setMessages] = useState(MOCK_CHAT_HISTORY);
  const [newMessage, setNewMessage] = useState('');

  const selectedContact = contacts.find(c => c.id === selectedContactId);
  const currentMessages = messages[selectedContactId] || [];

  // Filter contacts based on user role
  useEffect(() => {
    if (!user) return;
    let allowedContacts = MOCK_CHAT_CONTACTS;
    if (user.role === 'teacher') {
      allowedContacts = MOCK_CHAT_CONTACTS.filter(c => c.role !== 'group' && c.id !== 'ai');
    } else if (user.role === 'student') {
      allowedContacts = MOCK_CHAT_CONTACTS;
    }
    setContacts(allowedContacts);
  }, [user]);


  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const msg = { from: 'self', text: newMessage };
    const allMessages = {
      ...messages,
      [selectedContactId]: [...(messages[selectedContactId] || []), msg]
    };
    
    setMessages(allMessages);
    setNewMessage('');

    if (selectedContactId === 'ai') {
      const aiResponseText = await callGeminiAPI(msg.text, "You are Study Sphere, a helpful and friendly AI academic assistant. Keep your answers concise and educational.");
      const aiResponse = { from: 'ai', text: aiResponseText };
      setMessages(prev => ({
        ...prev,
        [selectedContactId]: [...prev[selectedContactId], aiResponse]
      }));
    }
  };

  return (
    <div className="flex h-[calc(100vh-64px)] bg-gray-50">
      {/* Contact List */}
      <div className="w-1/3 max-w-xs h-full bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4">
          <Input type="search" placeholder="Search chats..." />
        </div>
        <div className="divide-y divide-gray-200">
          {contacts.map(contact => (
            <button
              key={contact.id}
              onClick={() => setSelectedContactId(contact.id)}
              className={`flex items-center w-full p-4 space-x-3 transition-colors ${selectedContactId === contact.id ? 'bg-indigo-50' : 'hover:bg-gray-50'}`}
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-xl">
                  {contact.avatar}
                </div>
                {contact.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                )}
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-gray-800">{contact.name}</p>
                <p className="text-sm text-gray-500 truncate">{contact.role}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col h-full">
        {selectedContact ? (
          <>
            {/* Chat Header */}
            <div className="flex items-center p-4 bg-white border-b border-gray-200">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-xl">
                {selectedContact.avatar}
              </div>
              <div className="ml-3">
                <p className="text-lg font-semibold text-gray-800">{selectedContact.name}</p>
                <p className="text-sm text-green-500">{selectedContact.online ? 'Online' : 'Offline'}</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {currentMessages.map((msg, index) => (
                <div key={index} className={`flex ${msg.from === 'self' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start max-w-xs md:max-w-md ${msg.from === 'self' ? 'flex-row-reverse' : ''}`}>
                    {msg.from !== 'self' && (
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm mr-2 flex-shrink-0">
                        {msg.name ? msg.name.charAt(0) : selectedContact.avatar}
                      </div>
                    )}
                    <div
                      className={`p-3 rounded-2xl ${
                        msg.from === 'self' 
                          ? 'bg-indigo-600 text-white rounded-br-none' 
                          : 'bg-white text-gray-800 shadow-md rounded-bl-none'
                      }`}
                    >
                      {msg.name && msg.from !== 'self' && (
                        <p className="text-xs font-semibold text-indigo-500 mb-1">{msg.name}</p>
                      )}
                      <p>{msg.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 bg-white border-t border-gray-200">
              <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" variant="primary" className="p-3 rounded-full">
                  <SendIcon className="w-5 h-5" />
                </Button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPanel;