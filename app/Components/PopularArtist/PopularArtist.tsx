'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './PopularArtist.module.scss';
import ArtistCard from '../ArtistCard/ArtistCard';

type Artist = {
    id: number;
    firstName: string;
    lastName: string;
    file: {
        url: string;
    };
    releaseDate: string;
};

type Props = {
    limit: number;
};

const PopularArtist = ({ limit }: Props) => {
    const [artistsData, setArtistsData] = useState<Artist[]>([]);

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const token = document.cookie
                    .split('; ')
                    .find((row) => row.startsWith('token='))
                    ?.split('=')[1];

                const response = await axios.get('https://vibetunes-backend.onrender.com/author/recent', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                setArtistsData(response.data);
            } catch (error) {
                console.error('Error fetching artist data:', error);
            }
        };

        fetchArtists();
    }, []);

    return (
        <div className={styles.container}>
            {artistsData.slice(0, limit).map((artist) => (
                <ArtistCard
                    key={artist.id}
                    title={`${artist.firstName} ${artist.lastName}`.trim()}
                    url={artist.file.url}
                    year={artist.releaseDate}
                />
            ))}
        </div>
    );
};

export default PopularArtist;
