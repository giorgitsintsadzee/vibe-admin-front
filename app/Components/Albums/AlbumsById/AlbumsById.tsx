'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddMusic from "../../AddMusic/AddMusic";
import MusicCard from "../../MusicCard/MusicCard";
import styles from './AlbumsById.module.scss';
import { useRecoilState } from 'recoil';
import { clickState } from '@/app/state';
import { useParams } from 'next/navigation';

// type Props = {
//     albumSong: string;
//     albumSinger: string;
//     albumDate: string;
//     artistId?: number;
// };

type MusicResponse = {
    artistName: string;
    releaseDate: string;
    title: string;
    // albumSinger: string;
    // albumSong: string;
    // albumDate: string;
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

const AlbumsById = () => {
    const [albomsmusic, setAlbomsmusic] = useState<MusicData[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [click] = useRecoilState(clickState);
    const params = useParams();

    const [albumCoverUrl, setAlbumCoverUrl] = useState<string | null>(null);
    const [title, setTitle] = useState<string | undefined>()
    const [artistName, setArtistName] = useState<string | undefined>()
    const[releaseDate, setReleaseDate] = useState<string | undefined>()

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

                setTitle(response.data.title)
                setArtistName(response.data.artistName)
                setReleaseDate(response.data.releaseDate)

                const albumData = response.data;

                console.log(albumData, 'albumsiddddd wamoighooooooh');

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
          <div className={styles.headerNames}>
                    <a className={styles.paths} href="/albums">Albums</a>
                    <img src="/arrowp.svg" />
                    <div className={styles.pageTitle}>{artistName}</div>
                </div>
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
                        <div>
                        <span className={styles.albumSong}>{title} -</span>
                        <span className={styles.albumSingerdate}>{artistName}</span>
                        </div>
                        <span className={styles.albumSingerdate}>{releaseDate}</span>
                    </div>
                    <AddMusic />
                </div>

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
