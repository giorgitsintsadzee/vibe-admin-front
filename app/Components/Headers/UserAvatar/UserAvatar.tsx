'use client';
import { useState, useEffect } from 'react';
import styles from './UserAvatar.module.scss';
import Image from 'next/image';
import axios from 'axios';

const UserAvatar = () => {
    const [userIn, setUserIn] = useState(false);
    const [email, setEmail] = useState<string>('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = getToken(); 

                const response = await axios.get('https://vibetunes-backend.onrender.com/users/me', {
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    }
                });
                setEmail(response.data.email);  
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const getToken = () => {
        const match = document.cookie.match(new RegExp('(^| )token=([^;]+)'));
        return match ? match[2] : ''; 
    };

    const onClick = () => {
        setUserIn(!userIn);
    };

    const handleLogOut = () => {
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; 
        window.location.reload(); 
    };

    return (
        <>
            <div className={styles.container}>
                <Image
                    src='/user avatar.svg'
                    onClick={onClick}
                    width={32}
                    height={32}
                    alt='user avatar'
                    className={styles.userAvatar}
                />
                {userIn && (
                    <div className={styles.wrapper} onClick={onClick}>
                        <div className={styles.userWindow}>
                            <span>
                                {email ? email : 'Loading...'} 
                            </span>
                            <div className={styles.longOut} onClick={handleLogOut}>
                                <img src='/longout icoon.svg' alt='log out button' width={24} height={24} />
                                <span>Log out</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default UserAvatar;
