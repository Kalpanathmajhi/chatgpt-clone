import React, { useState, useEffect } from 'react';
import './chat.css';
import Header from './header';

const Chat = () => {
  const initialMessages = JSON.parse(sessionStorage.getItem('messages')) || [];
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");

  const sendMessage = (event) => {
    event.preventDefault();
    if(input.trim() !== "") {
      const newMessages = [...messages, 
                           { text: input, isUser: true }, 
                           { text: "Placeholder response", isUser: false }
                          ];
      setMessages(newMessages);
      sessionStorage.setItem('messages', JSON.stringify(newMessages));
      setInput("");
    }
  };

  useEffect(() => {
    window.addEventListener('beforeunload', () => sessionStorage.removeItem('messages'));
    return () => window.removeEventListener('beforeunload', () => sessionStorage.removeItem('messages'));
  }, []);

  return (
<div className="chat">
      <Header />

      <div className="chat__messages">
        {messages.map((message, index) => (
          <p key={index} className={`chat__message ${message.isUser ? "chat__userMessage" : "chat__botMessage"}`}>
            {message.text}
          </p>
        ))}
      </div>

      <form className="chat__input" onSubmit={sendMessage}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
  
};

export default Chat;
