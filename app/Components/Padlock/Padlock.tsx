'use client';
import { useState } from 'react';
import axios from 'axios';

type Props = {
  id: number;
};

const Padlock = ({ id }: Props) => {
  const [isLocked, setIsLocked] = useState(false);

  const handleClick = async () => {
    try {
      setIsLocked(!isLocked);

      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='))
        ?.split('=')[1];

      if (!token) {
        throw new Error('No token found');
      }

      if (!isLocked) {
        await axios.delete(`https://vibetunes-backend.onrender.com/users/${id}`, {
          headers: {
            // 'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        
      }
    } catch (error) {
      console.error('Failed to update lock status:', error);
    }
  };

  return (
    <div onClick={handleClick}>
      <img
        src={isLocked ? '/icons/Lock.svg' : '/icons/Unlock.svg'}
        alt={isLocked ? 'lock' : 'unlock'}
        width={32}
        height={32}
      />
    </div>
  );
};

export default Padlock;
