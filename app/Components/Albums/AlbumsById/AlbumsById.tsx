'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddMusic from "../../AddMusic/AddMusic";
import MusicCard from "../../MusicCard/MusicCard";
import styles from './AlbumsById.module.scss';

type Props = {
    albumSong: string;
    albumSinger: string;
    albumDate: string;
    // albumId?: number;
    artistId?: number;
};
type MusicResponse = {
    id: number;
    name: string;
    artistName: string;
    photo: {
        id: number;
        url: string;
    };
    url: {
        id: number;
        url: string;
    };
};

type MusicData = {
    id: number;
    name: string;
    artistName: string;
    photo: string;
    mp3: string;
};

const AlbumsById = (props: Props) => {
    const [albomsmusic, setAlbomsmusic] = useState<MusicData[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAlbumMusic = async () => {
            try {
                const token = document.cookie
                    .split('; ')
                    .find((row) => row.startsWith('token='))
                    ?.split('=')[1];

                if (!token) {
                    throw new Error('No token found');
                }

                const response = await axios.get<MusicResponse[]>('https://vibetunes-backend.onrender.com/music', {
                    headers: {
                        // 'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = response.data.map((music) => ({
                    id: music.id,
                    name: music.name,
                    artistName: music.artistName,
                    photo: music.photo?.url || '/default_music_image.svg',
                    mp3: music.url?.url || '',
                }));

                setAlbomsmusic(data);
            } catch (error) {
                console.error('Error fetching album music data:', error);
                setError('Failed to fetch album music');
            }
        };

        fetchAlbumMusic();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.title}>Albums</div>
                <div className={styles.albumContainer}>
                    <div className={styles.albumImg}>
                        <img className={styles.img} src='/albumcardimg.svg' alt="Album cover" />
                    </div>
                </div>
                <div className={styles.albumText}>
                    <div className={styles.albums}>
                        <div>
                            <span className={styles.albumSong}>{props.albumSong}</span>
                            <span className={styles.albumSingerdate}>{props.albumSinger}</span>
                        </div>
                        {/* <AddMusic albumsId={props.albumId ?? 0} artistId={props.artistId ?? 0} /> */}
                        <AddMusic artistId={props.artistId ?? 0} />

                    </div>
                    <span className={styles.albumSingerdate}>{props.albumDate}</span>
                </div>
                <div className={styles.musicCards}>
                    {albomsmusic.map((music) => (
                        <MusicCard
                            key={music.id}
                            imageUrl={music.photo}
                            songName={music.name}
                            artistName={music.artistName}
                            showBin={true}
                            albumsMusicId={music.id}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default AlbumsById;