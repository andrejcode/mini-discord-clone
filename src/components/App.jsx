import { useState, useEffect } from 'react';
import { socket } from '@/libs/socket';
import UsernameInput from './UsernameInput/UsernameInput';
import Users from './Users/Users';
import ChannelsWithUser from './ChannelsWithUser/ChannelsWithUser';
import Messages from './Messages/Messages';
import { updateUsersBasedOnUserStatus } from '@/utils/users';
import {
  getSessionFromLocalStorage,
  removeSessionFromLocalStorage,
  setSessionToLocalStorage,
} from '@/utils/localStorage';

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [session, setSession] = useState(null);
  const [users, setUsers] = useState([]);
  const [channels, setChannels] = useState([]);
  const [activeChannel, setActiveChannel] = useState(null);

  useEffect(() => {
    const storedSession = getSessionFromLocalStorage();
    if (storedSession) {
      // We provide username to the auth
      // Because of the bug on the server that will set username to anonymous
      socket.auth = { sessionId: storedSession.sessionId, username: storedSession.username };
      socket.connect();
    }

    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onSession(currentSession) {
      setSession(currentSession);
      setSessionToLocalStorage(currentSession);
    }

    function onChannels(channels) {
      setChannels(channels);
      setActiveChannel(channels[0].name);
    }

    function onMessageChannel(channel, message) {
      setChannels(prevChannels => {
        const foundChannel = prevChannels.find(prevChannel => prevChannel.name === channel);

        if (foundChannel) {
          return prevChannels.map(prevChannel => {
            if (prevChannel.name === channel) {
              return { ...prevChannel, messages: [...prevChannel.messages, message] };
            } else {
              return prevChannel;
            }
          });
        } else {
          return prevChannels;
        }
      });
    }

    function onUsers(allUsers) {
      setUsers(allUsers);
    }

    function onUserJoin(joinedUser) {
      setUsers(prevUsers => {
        const existingUser = prevUsers.find(user => user.userId === joinedUser.userId);

        if (existingUser) {
          return updateUsersBasedOnUserStatus(prevUsers, joinedUser);
        } else {
          return [...prevUsers, joinedUser];
        }
      });
    }

    function onUserDisconnect(disconnectedUser) {
      setUsers(prevUsers => updateUsersBasedOnUserStatus(prevUsers, disconnectedUser));
    }

    function onUserLeave(userLeft) {
      setUsers(prevUsers => prevUsers.filter(user => user.userId !== userLeft.userId));
      removeSessionFromLocalStorage();
    }

    socket.on('connect', onConnect);
    socket.on('session', onSession);
    socket.on('channels', onChannels);
    socket.on('message:channel', onMessageChannel);
    socket.on('users', onUsers);
    socket.on('user:join', onUserJoin);
    socket.on('user:disconnect', onUserDisconnect);
    socket.on('user:leave', onUserLeave);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('session', onSession);
      socket.off('channels', onChannels);
      socket.off('message:channel', onMessageChannel);
      socket.off('users', onUsers);
      socket.off('user:join', onUserJoin);
      socket.off('user:disconnect', onUserDisconnect);
      socket.off('user:leave', onUserLeave);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  return (
    <main>
      {!isConnected ? (
        <UsernameInput />
      ) : (
        <div className="main-container">
          <ChannelsWithUser
            channels={channels}
            activeChannel={activeChannel}
            setActiveChannel={setActiveChannel}
            username={session.username}
            avatarNumber={session.avatar}
          />
          <Messages channels={channels} activeChannel={activeChannel} />
          <Users users={users} />
        </div>
      )}
    </main>
  );
}

export default App;
