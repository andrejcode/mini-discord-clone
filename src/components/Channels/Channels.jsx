import './Channels.css';

function Channels({ channels, activeChannel, setActiveChannel }) {
  return (
    <ul className="channel-container">
      {channels.length > 0 &&
        channels.map(channel => (
          <li
            key={channel.name}
            className={`clickable ${channel.name === activeChannel ? 'active-channel' : ''}`}
            onClick={() => {
              setActiveChannel(channel.name);
            }}
          >
            <p># {channel.name}</p>
          </li>
        ))}
    </ul>
  );
}

export default Channels;
