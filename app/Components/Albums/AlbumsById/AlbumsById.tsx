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
        duration: string | null; 
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
    photo: string; 
    mp3: string; 
    coverUrl: string;
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

                const musicData = albumData.musics.map((music) => ({
                    id: music.id,
                    name: music.name,
                    artistName: music.artistName,
                    photo: music.photo?.url || '/default_music_image.svg', 
                    mp3: albumData.file.url, 
                    coverUrl: albumData.file.url, 
                }));

                setAlbomsmusic(musicData);

                if (musicData.length > 0) {
                    setAlbumCoverUrl(albumData.file.url); 
                }
            } catch (error) {
                console.error('Error fetching album music data:', error);
                setError('Failed to fetch album music');
            }
        };

        fetchAlbumMusic();
    }, [click, params.id]); 

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
                        src={albumCoverUrl || '/default_album_image.svg'} 
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
                        imageUrl={music.coverUrl} 
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
