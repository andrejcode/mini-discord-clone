import Avatar from '../Avatar/Avatar';
import './User.css';

function User({ username, avatarNumber }) {
  return (
    <div className="user-container">
      <Avatar avatarNumber={avatarNumber} />
      <p>{username}</p>
    </div>
  );
}

export default User;
