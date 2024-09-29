'use client';

import { Table } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AddAlbums from '../AddAlbums/AddAlbums';
import ArtistDelete from '../ArtistDelete/ArtistDelete';
import { useRecoilState } from 'recoil';
import { clickState } from '@/app/state';

type ArtistRecord = {
    id: number;
    firstName: string;
    lastName: string;
    releaseDate: string;
    createdAt: string;
    file: {
        url: string;
    };
};

type TableRecord = {
    key: number;
    id: number;
    name: string;
    year: string;
    createdAt: string;
    image: string;
};

const ArtistTable = () => {
    const [dataSource, setDataSource] = useState<TableRecord[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [click] = useRecoilState(clickState)

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const token = document.cookie
                    .split('; ')
                    .find((row) => row.startsWith('token='))
                    ?.split('=')[1];

                if (!token) {
                    throw new Error('No token found');
                }

                const response = await axios.get('https://vibetunes-backend.onrender.com/author', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = response.data.map((artist: ArtistRecord) => ({
                    key: artist.id,
                    id: artist.id,
                    name: `${artist.firstName} ${artist.lastName}`,
                    year: artist.releaseDate,
                    createdAt: new Date(artist.createdAt).toLocaleDateString(),
                    image: artist.file?.url || '', 
                }));

                setDataSource(data);
            } catch (error) {
                console.error('Error fetching artist data:', error);
                setError('Failed to fetch artist data');
            }
        };

        fetchArtists();
    }, [click]);

    const columns = [
        {
            title: 'Name, surname',
            dataIndex: 'name',
            key: 'name',
            render: (text: string, record: TableRecord) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {record.image && (
                        <img
                            src={record.image}
                            alt={record.name}
                            style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
                        />
                    )}
                    {text}
                </div>
            ),
        },
        {
            title: 'Release Year',
            dataIndex: 'year',
            key: 'year',
        },
        {
            title: 'Added Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (record: TableRecord) => (
                <div style={{ display: 'flex', gap: '10px' }}>
                    <AddAlbums />
                    <ArtistDelete artistId={record.id}/>
                </div>
            ),
        },
    ];

    if (error) {
        return <div>{error}</div>;
    }

    return <Table dataSource={dataSource} columns={columns} pagination={false} />;
};

export default ArtistTable;
