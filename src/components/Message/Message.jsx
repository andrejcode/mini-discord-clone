import formatTimestamp from '@/utils/time';
import User from '../User/User';
import './Message.css';

function Message({ children, messageObject }) {
  return (
    <div className="message-container">
      <div className="user-and-timestamp-container">
        <User username={messageObject.username} avatarNumber={messageObject.avatar} />
        <p className="timestamp">{formatTimestamp(messageObject.timestamp)}</p>
      </div>
      <p className="message">{children}</p>
    </div>
  );
}

export default Message;
