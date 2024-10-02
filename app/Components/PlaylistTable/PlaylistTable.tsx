'use client';
import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import Bin from '../Bin/Bin';
import EditPlaylist from '../EditPlaylist/EditPlaylist';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { clickState } from '@/app/state';

type MusicRecord = {
    id: number;
    photo: {
        url: string;
    };
};

type SongRecord = {
    id: number;
    name: string;
    musics: MusicRecord[];
};

const PlaylistTable = () => {
    const [playlist, setPlaylist] = useState<SongRecord[]>([]);
    const [loading, setLoading] = useState(false);
    const [click] = useRecoilState(clickState);
    const params = useParams();

    useEffect(() => {
        const fetchPlaylist = async () => {
            setLoading(true);
            try {
                const token = document.cookie
                    .split('; ')
                    .find((row) => row.startsWith('token='))
                    ?.split('=')[1];

                if (!token) {
                    throw new Error('No token found');
                }

                const response = await axios.get(
                    `https://vibetunes-backend.onrender.com/playlist/admin/${params.id}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setPlaylist(response.data);
            } catch (error) {
                console.error('Failed to fetch playlist:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPlaylist();
    }, [params.id, click]);

    const columns = [
        {
            title: 'Playlist Name',
            dataIndex: 'name',
            key: 'name',
            render: (text: string, record: SongRecord) => {
                const musicImage = record.musics[0]?.photo?.url || '/whiteLogo.png'; 
                return (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                            src={musicImage}
                            alt="Music"
                            style={{ width: '40px', height: '40px', marginRight: '10px' }}
                        />
                        <span>{text}</span>
                    </div>
                );
            },
        },
        {
            title: '',
            key: 'actions',
            render: (record: SongRecord) => (
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <EditPlaylist playlistId={record.id} />
                    <Bin playlistId={record.id} />
                </div>
            ),
        },
    ];

    return (
        <Table
            dataSource={playlist}
            columns={columns}
            pagination={false}
            rowClassName="custom-row"
            loading={loading}
        />
    );
};

export default PlaylistTable;
