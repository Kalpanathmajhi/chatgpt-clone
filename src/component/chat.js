import React, { useState } from 'react';
import './chat.css';
import Header from './header';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = (event) => {
    event.preventDefault();
    if(input.trim() !== "") {
      setMessages([...messages, { text: input, isUser: true }]);

      setMessages(prevMessages => [...prevMessages, { text: "Placeholder response", isUser: false }]);
      setInput("");
    }
  };

  return (
    <div className="chat">
    <div>
      <Header />
    </div>
   
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
