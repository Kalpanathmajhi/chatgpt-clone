import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './chat.css';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'POST',
        url: 'https://alchemytextserg-osipchukv1.p.rapidapi.com/deleteSingleModel',
        headers: {
          'X-RapidAPI-Key': '994ad9ecfamsh713c9fd6571a367p162aaejsne61772635e87',
          'X-RapidAPI-Host': 'AlchemyTextserg-osipchukV1.p.rapidapi.com'
        }
      };
    
      try {
        const response = await axios.request(options);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const sendMessage = async (event) => {
    event.preventDefault();
    if(input.trim() !== "") {
      setMessages([...messages, { text: input, isUser: true }]);
      const options = {
        method: 'POST',
        url: process.env.REACT_APP_API_URL,
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
          'X-RapidAPI-Host': process.env.REACT_APP_RAPIDAPI_HOST
        },
        data: {
          message: input
        }
      };
      try {
        const response = await axios.request(options);
        setMessages(prevMessages => [...prevMessages, { text: response.data, isUser: false }]);
      } catch (error) {
        console.error(error);
      }
      setInput("");
    }
  
  };
  

  return (
    <div className="chat">
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
