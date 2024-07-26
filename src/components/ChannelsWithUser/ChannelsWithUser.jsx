import { socket } from '@/libs/socket';
import Channels from '../Channels/Channels';
import User from '../User/User';
import './ChannelsWithUser.css';

function ChannelsWithUser({ channels, activeChannel, setActiveChannel, username, avatarNumber }) {
  function disconnectFromServer() {
    socket.disconnect();
  }

  function leaveServer() {
    socket.emit('user:leave');
  }

  return (
    <div className="channels-container-with-user">
      <Channels
        channels={channels}
        activeChannel={activeChannel}
        setActiveChannel={setActiveChannel}
      />
      <div className="user-and-button-container">
        <User username={username} avatarNumber={avatarNumber} />
        <div className="disconnect-button-container">
          <button className="discord-button" onClick={disconnectFromServer}>
            Disconnect
          </button>
          <button className="discord-button" onClick={leaveServer}>
            Leave server
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChannelsWithUser;
