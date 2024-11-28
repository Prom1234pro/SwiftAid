import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, Camera, Phone, Paperclip, Send, MoreVertical } from 'lucide-react';
import '../styles/Chatting.css';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi, I want to report an emergency",
      sender: "user",
      timestamp: "10:30 AM"
    },
    {
      id: 2,
      text: "Hello there, Go ahead! what's your emergency please.",
      sender: "lawyer",
      timestamp: "10:31 AM"
    },
    {
      id: 3,
      sender: "user",
      type: "image",
      imageUrl: "/api/placeholder/300/200",
      caption: "This is the condition of my neighbors car, they need your immediate help pls",
      timestamp: "10:32 AM"
    },
    {
      id: 4,
      text: "Hold on, can you get on a call?",
      sender: "lawyer",
      timestamp: "10:33 AM"
    },
    {
      id: 5,
      text: "Yes sir, I would urgently need your help.",
      sender: "user",
      timestamp: "10:34 AM"
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [isPractitioner, setIsPractitioner] = useState(false);  // Track if the current role is practitioner
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const sender = isPractitioner ? "lawyer" : "user";  // Toggle sender based on practitioner status
      const message = {
        id: messages.length + 1,
        text: newMessage,
        sender: sender,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const togglePractitioner = () => {
    setIsPractitioner(!isPractitioner);  // Toggle between user and lawyer
  };

  return (
    <div className="chat-interface">
      {/* Header */}
      <div className="chat-header">
        <div className="header-content">
          <button className="header-icon">
            <ChevronLeft size={24} />
          </button>
          <div className="header-user-info">
            <img 
              src="/api/placeholder/40/40" 
              alt="Jane Cooper" 
              className="header-user-image"
            />
            <div>
              <h2 className="header-username">Jane Cooper</h2>
              <p className="header-status">Online</p>
            </div>
          </div>
        </div>
        <div className="header-actions">
          <button className="header-icon">
            <Phone size={20} />
          </button>
          <button className="header-icon" onClick={togglePractitioner}>  {/* Toggle role button */}
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="messages-container">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message-wrapper ${message.sender === 'user' ? 'message-user' : 'message-lawyer'}`}
          >
            <div className={`message-bubble ${message.sender === 'user' ? 'bubble-user' : 'bubble-lawyer'}`}>
              {message.type === 'image' ? (
                <div className="message-image-content">
                  <img
                    src={message.imageUrl}
                    alt="Sent image"
                    className="message-image"
                  />
                  <p className="message-caption">{message.caption}</p>
                </div>
              ) : (
                <p className="message-text">{message.text}</p>
              )}
              <p className={`message-timestamp ${message.sender === 'user' ? 'timestamp-user' : 'timestamp-lawyer'}`}>
                {message.timestamp}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="input-area">
        <button className="input-icon">
          <Camera size={24} />
        </button>
        <button className="input-icon">
          <Paperclip size={24} />
        </button>
        <div className="input-field-container">
          <input
            type="text"
            placeholder="Type message..."
            className="input-field"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
        <button 
          className="input-send-icon"
          onClick={handleSendMessage}
        >
          <Send size={24} />
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
