import React from 'react';
import './MessageContainer.css'; // Import the CSS file for styling

const MessageContainer = ({ messages }) => {
  return (
    <div className="message-container">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`message ${msg.isCurrentUser ? 'current-user' : 'other-user'}`}
        >
          {msg.username}: {msg.msg}
        </div>
      ))}
    </div>
  );
};

export default MessageContainer;
