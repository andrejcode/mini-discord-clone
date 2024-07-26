import { socket } from '@/libs/socket';
import { useState } from 'react';
import Input from '../Input/Input';
import './UsernameInput.css';
import { getSessionFromLocalStorage } from '@/utils/localStorage';

const USERNAME_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 20;

function UsernameInput() {
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  function handleChange(event) {
    setUsername(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (username.length < USERNAME_MIN_LENGTH) {
      setErrorMessage('Username must be at least 3 characters long.');
    } else if (username.length > USERNAME_MAX_LENGTH) {
      setErrorMessage('Username must be no longer than 20 characters.');
    } else {
      connectToServer(username);
    }
  }

  function connectToServer() {
    const storedSession = getSessionFromLocalStorage();
    if (storedSession && username === storedSession.username) {
      // We provide username to the auth
      // Because of the bug on the server that will set username to anonymous
      socket.auth = { sessionId: storedSession.sessionId, username: storedSession.username };
    } else {
      socket.auth = { username };
    }
    socket.connect();
  }

  return (
    <div className="username-input">
      <form className="username-form" onSubmit={handleSubmit}>
        {errorMessage && <div className="error-alert">{errorMessage}</div>}
        <Input
          value={username}
          onKeyDown={event => {
            if (event.key === 'Enter') {
              handleSubmit(event);
            }
          }}
          onChange={handleChange}
          placeholder="Enter your username"
        />
        <button className="discord-button" type="submit">
          Connect
        </button>
      </form>
    </div>
  );
}

export default UsernameInput;
