'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './TrendHits.module.scss';
import MusicCard from '../MusicCard/MusicCard';

type PhotoData = {
    id: number;
    url: string;
    key: string;
    bucket: string;
    fileName: string;
};

type UrlData = {
    id: number;
    url: string;
    key: string;
    bucket: string;
    fileName: string;
};

type MusicData = {
    id: number;
    name: string;
    artistName: string;
    artistId: number;
    duration: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: null | string;
    photo: PhotoData;
    url: UrlData;
};

type Props = {
    limit?: number;
};

const AlbumsById: React.FC<Props> = ({ limit }) => {
    const [recentlymusic, setResentlyMusic] = useState<MusicData[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const resentlyMusic = async () => {
            try {
                const token = document.cookie
                    .split('; ')
                    .find((row) => row.startsWith('token='))
                    ?.split('=')[1];

                if (!token) {
                    throw new Error('No token found');
                }

                const response = await axios.get('https://vibetunes-backend.onrender.com/music/recent', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data: MusicData[] = response.data;
                setResentlyMusic(data);
            } catch (error) {
                console.error('Error fetching recently music data:', error);
                setError('Failed to fetch recently music');
            }
        };

        resentlyMusic();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    const displayedMusic = limit ? recentlymusic.slice(0, limit) : recentlymusic;

    return (
        <div className={styles.musicCards}>
            <span>recently add music</span>
            {displayedMusic.map((music) => (
                <MusicCard
                    key={music.id}
                    imageUrl={music.photo.url}
                    songName={music.name}
                    artistName={music.artistName}
                    showBin={true}
                />
            ))}
        </div>
    );
};

export default AlbumsById;
