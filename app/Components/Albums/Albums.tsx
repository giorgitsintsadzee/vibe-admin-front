'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from "./Albums.module.scss";
import AlbumCard from '../AlbumCard/AlbumCard';

type Album = {
    id: number;
    title: string;
    artistName: string;
    releaseDate: string;
    file?: { url: string }; 
};

type Props = {
    limit?: number;
};

const Albums = (props: Props) => {
    const [albumsData, setAlbumsData] = useState<Album[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const token = document.cookie
                    .split('; ')
                    .find((row) => row.startsWith('token='))
                    ?.split('=')[1];

                if (!token) {
                    throw new Error('No token found');
                }

                const response = await axios.get('https://vibetunes-backend.onrender.com/album', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                setAlbumsData(response.data); 
            } catch (error) {
                console.error('Error fetching album data:', error);
                setError('Failed to fetch album data');
            }
        };

        fetchAlbums();
    }, []);

    const albumCard = props.limit ? albumsData.slice(0, props.limit) : albumsData;

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className={styles.albumsContainer}>
            {albumCard.map((album) => (
                <AlbumCard
                    key={album.id}
                    imageUrl={album.file?.url || '/default_album_image.svg'} 
                    songName={album.title}
                    artistName={album.artistName}
                    year={album.releaseDate}
                    id={album.id}
                    
                />
            ))}
        </div>
    );
};

export default Albums;
