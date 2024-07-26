import User from '../User/User';
import './Users.css';

function Users({ users }) {
  return (
    <div className="users-container">
      <div className="online-users">
        <p className="user-status">ONLINE</p>
        {users.length > 0 &&
          users
            .filter(user => user.connected)
            .map(user => (
              <User key={user.userId} username={user.username} avatarNumber={user.avatar} />
            ))}
      </div>

      <div className="offline-users">
        <p className="user-status">OFFLINE</p>
        {users.length > 0 &&
          users
            .filter(user => !user.connected)
            .map(user => (
              <User key={user.userId} username={user.username} avatarNumber={user.avatar} />
            ))}
      </div>
    </div>
  );
}

export default Users;
