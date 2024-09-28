'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

type Props = {
  id: number;
};

const Padlock = ({ id }: Props) => {
  const [isLocked, setIsLocked] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const fetchUserStatus = async () => {
      try {
        const token = document.cookie
          .split('; ')
          .find((row) => row.startsWith('token='))
          ?.split('=')[1];

        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get(`https://vibetunes-backend.onrender.com/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { deletedAt } = response.data;

        setIsLocked(deletedAt !== null);
      } catch (error) {
        console.error('Failed to fetch user status:', error);
      }
    };

    fetchUserStatus();
  }, [id]);

  const handleClick = async () => {
    try {
      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='))
        ?.split('=')[1];

      if (!token) {
        throw new Error('No token found');
      }

      await axios.delete(`https://vibetunes-backend.onrender.com/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setIsLocked(!isLocked);
    } catch (error) {
      console.error('Failed to update lock status:', error);
    }
  };

  if (isLocked === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div onClick={handleClick}>
      <img
        src={isLocked ? '/icons/Lock.svg' : '/icons/unlock.svg'}
        alt={isLocked ? 'lock' : 'unlock'}
        width={32}
        height={32}
      />
    </div>
  );
};

export default Padlock;