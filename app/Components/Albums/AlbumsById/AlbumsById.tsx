'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddMusic from "../../AddMusic/AddMusic";
import MusicCard from "../../MusicCard/MusicCard";
import styles from './AlbumsById.module.scss';
import { useRecoilState } from 'recoil';
import { clickState } from '@/app/state';
import { useParams } from 'next/navigation';

type Props = {
    albumSong: string;
    albumSinger: string;
    albumDate: string;
    artistId?: number;
};

type MusicResponse = {
    musics: {
        id: number;
        name: string;
        artistName: string;
        photo: {
            id: number;
            url: string;
        };
        duration: string | null; // Adjusted if you need this
    }[];
    file: {
        id: number;
        url: string;
    };
    id: number;
};

type MusicData = {
    id: number;
    name: string;
    artistName: string;
    photo: string; // Existing property for music photo
    mp3: string; // Existing property for mp3 URL
    coverUrl: string; // Added coverUrl property
};

const AlbumsById = (props: Props) => {
    const [albomsmusic, setAlbomsmusic] = useState<MusicData[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [click] = useRecoilState(clickState);
    const params = useParams();
    
    const [albumCoverUrl, setAlbumCoverUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchAlbumMusic = async () => {
            try {
                const token = document.cookie
                    .split('; ')
                    .find((row) => row.startsWith('token='))?.split('=')[1];

                if (!token) {
                    throw new Error('No token found');
                }

                const response = await axios.get<MusicResponse>(`https://vibetunes-backend.onrender.com/album/${params.id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                const albumData = response.data;

                // Map the music data to include the photo URL and cover URL
                const musicData = albumData.musics.map((music) => ({
                    id: music.id,
                    name: music.name,
                    artistName: music.artistName,
                    photo: music.photo?.url || '/default_music_image.svg', // Fallback if photo URL is missing
                    mp3: albumData.file.url, // Assuming the mp3 URL is the same for all tracks
                    coverUrl: albumData.file.url, // Assuming the album cover URL is the same for all tracks
                }));

                setAlbomsmusic(musicData);

                // Set album cover URL (if applicable)
                if (musicData.length > 0) {
                    setAlbumCoverUrl(albumData.file.url); // Adjust as needed for cover URL
                }
            } catch (error) {
                console.error('Error fetching album music data:', error);
                setError('Failed to fetch album music');
            }
        };

        fetchAlbumMusic();
    }, [click, params.id]); // Add params.id to dependencies

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>Albums</div>
            <div className={styles.albumContainer}>
                <div className={styles.albumImg}>
                    <img
                        className={styles.img}
                        src={albumCoverUrl || '/default_album_image.svg'} // Fallback if cover URL is not set
                        alt="Album cover"
                    />
                </div>
            </div>
            <div className={styles.albumText}>
                <div className={styles.albums}>
                    <div>
                        <span className={styles.albumSong}>{props.albumSong}</span>
                        <span className={styles.albumSingerdate}>{props.albumSinger}</span>
                    </div>
                    <AddMusic />
                </div>
                <span className={styles.albumSingerdate}>{props.albumDate}</span>
            </div>
            <div className={styles.musicCards}>
                {albomsmusic.map((music) => (
                    <MusicCard
                        key={music.id}
                        imageUrl={music.coverUrl} // Pass the cover URL here
                        songName={music.name}
                        artistName={music.artistName}
                        showBin={false}
                        albumsMusicId={music.id}
                    />
                ))}
            </div>
        </div>
    );
};

export default AlbumsById;
