import avatar1 from '@/assets/avatar1.png';
import avatar2 from '@/assets/avatar2.png';
import avatar3 from '@/assets/avatar3.png';
import avatar4 from '@/assets/avatar4.png';
import avatar5 from '@/assets/avatar5.png';
import './Avatar.css';

const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5];

function Avatar({ avatarNumber }) {
  return <img className="avatar" src={avatars[avatarNumber - 1]} alt="Avatar" />;
}

export default Avatar;
