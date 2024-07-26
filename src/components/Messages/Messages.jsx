import { socket } from '@/libs/socket';
import { useState } from 'react';
import Input from '../Input/Input';
import Message from '../Message/Message';
import './Messages.css';

function Messages({ channels, activeChannel }) {
  const [message, setMessage] = useState('');

  const selectedChannel = channels.find(channel => channel.name === activeChannel);

  function sendMessage() {
    socket.emit('message:channel:send', activeChannel, message);
    setMessage('');
  }

  return (
    <div className="messages-container">
      {selectedChannel && (
        <div className="messages">
          {selectedChannel.messages.map(messageObj => (
            <Message key={messageObj.id} messageObject={messageObj}>
              {messageObj.message}
            </Message>
          ))}
        </div>
      )}
      <Input
        value={message}
        onChange={event => setMessage(event.target.value)}
        onKeyDown={event => {
          if (event.key === 'Enter') {
            sendMessage();
          }
        }}
        placeholder={`Message #${activeChannel}`}
      />
    </div>
  );
}

export default Messages;
