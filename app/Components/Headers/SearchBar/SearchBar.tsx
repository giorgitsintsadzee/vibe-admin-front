'use client';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Image from 'next/image';
import styles from './SearchBar.module.scss';
import ListOptions from './ListOptions/ListOptions';

type Option = {
    id: number;
    text: string;
    img?: string;
    type: 'albums' | 'author' | 'music';
    link?: string;
    musicSrc?: string;
};

interface Album {
    id: number;
    title: string;
    artistName: string;
    file: {
        url: string;
    };
}

interface Author {
    id: number;
    artistName: string;
    firstName: string;
    lastName: string;
    file: {
        url: string;
    };
}

interface Music {
    id: number;
    name: string;
    audioSrc?: string;
    artistName: string;
    photo: {
        url: string;
    };
}

interface ApiResponse {
    album: Album[];
    author: Author[];
    music: Music[];
}

const SearchBar = () => {
    const [query, setQuery] = useState<string>('');
    const [filteredOptions, setFilteredOptions] = useState<Option[]>([]);

    const fetchOptions = useCallback(async () => {
        if (query) {
            try {
                const token = document.cookie
                    .split('; ')
                    .find((row) => row.startsWith('token='))
                    ?.split('=')[1];

                if (!token) {
                    throw new Error('No token found');
                }

                const response = await axios.get<ApiResponse>(`https://vibetunes-backend.onrender.com/search?searchField=${query}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                const { album: albumData, author: authorData, music: musicData } = response.data;

                if (!albumData || !authorData || !musicData) {
                    console.error('Data missing in response:', response.data);
                    setFilteredOptions([]);
                    return;
                }

                const albumOptions = albumData.map((album: Album) => ({
                    id: album.id,
                    text:  album.title,
                    file: album.file.url,
                    type: 'albums' as const,
                    link: `/albums/${album.id}`,
                    artistName: album.artistName,
                }));

                const authorOptions = authorData.map((author: Author) => ({
                    id: author.id,
                    text: `${author.firstName} ${author.lastName}`,
                    file: author.file.url,
                    type: 'author' as const,
                    link: `/artist`,
                }));

                const musicOptions = musicData.map((music: Music) => ({
                    id: music.id,
                    text: music.name,
                    photo: music.photo.url,
                    type: 'music' as const,
                    musicSrc: music.audioSrc,
                    artistName: music.artistName,
                }));

                const allOptions = [...albumOptions, ...authorOptions, ...musicOptions];
                setFilteredOptions(allOptions);

            } catch (error) {
                console.error('Error fetching search options:', error);
                setFilteredOptions([]);
            }
        } else {
            setFilteredOptions([]);
        }
    }, [query]);

    useEffect(() => {
        fetchOptions();
    }, [query, fetchOptions]);

    const handleOptionClick = () => {
        setQuery('');
        setFilteredOptions([]); 
    };

    return (
        <div className={styles.searchContainer}>
            <input
                className={styles.search}
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <Image
                src="/search icon.svg"
                width={24}
                height={24}
                alt="search icon"
                className={styles.icon}
            />
            <div className={styles.border}>
                {filteredOptions.length > 0 && (
                    <ListOptions options={filteredOptions} onOptionClick={handleOptionClick} />
                )}
            </div>
        </div>
    );
};

export default SearchBar;
