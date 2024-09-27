'use client';
import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import Bin from '../Bin/Bin';
import EditPlaylist from '../EditPlaylist/EditPlaylist';
import axios from 'axios';
import { useParams } from 'next/navigation';

type SongRecord = {
    key: number;
    name: string;
    image: string;
};

const PlaylistTable = () => {
    const [playlist, setPlaylist] = useState<SongRecord[]>([]);
    const [loading, setLoading] = useState(false);
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

                const response = await axios.get(`https://vibetunes-backend.onrender.com/playlist/admin/${params.id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                const users = response.data;
                const formattedData = users.map((user: SongRecord, index: number) => ({
                    key: index + 1, 
                    name: user.name, 
                    image: user.image || 'default_image_url.jpg', 
                }));

                setPlaylist(formattedData);
            } catch (error) {
                console.error('Failed to fetch users:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPlaylist();
    }, [params.id]); 

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text: string, record: SongRecord) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                        src={record.image}
                        alt={record.name}
                        style={{ width: '40px', height: '40px', marginRight: '10px' }}
                    />
                    {text}
                </div>
            ),
        },
        {
            title: '',
            key: 'actions',
            render: () => (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <EditPlaylist />
                    <Bin />
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
