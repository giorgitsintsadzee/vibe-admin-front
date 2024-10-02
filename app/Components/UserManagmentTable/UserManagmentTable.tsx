'use client';

import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import Padlock from '../Padlock/Padlock';
import Playlist from '../Playlist/Playlist';
import ChangePassword from '../ChangePassword/ChangePassword';
import axios from 'axios';

type EmailRecord = {
    id: number;
    email: string;
    createdAt: Date;
};

const UserManagmentTable = () => {
    const [dataSource, setDataSource] = useState<EmailRecord[]>([]);
    const [loading, setLoading] = useState(false);

    console.log(dataSource,'data');
    

    useEffect(() => {
        const fetchEmails = async () => {
            setLoading(true);
            try {
                const token = document.cookie
                    .split('; ')
                    .find((row) => row.startsWith('token='))
                    ?.split('=')[1];

                if (!token) {
                    throw new Error('No token found');
                }
                const response = await axios.get('https://vibetunes-backend.onrender.com/users', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                setDataSource(response.data);
            } catch (error) {
                console.error('Failed to fetch users:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEmails();
    }, []);

    const columns = [
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (text: string) => <span>{text}</span>,
        },
        {
            title: 'Added date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text: string) => <span style={{ color: '#fff' }}>{text}</span>,
        },

        {
            render: (record: EmailRecord) => (
                console.log(record,'fsafasfsgf'),
                
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                
                    <Playlist id={record.id} />
                    <Padlock id={record.id} />
                    <ChangePassword id={record.id} />
                </div>
            ),
        },
    ];

    return (
        <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            rowClassName={() => 'custom-row'}
            style={{ backgroundColor: '#333', borderRadius: '8px', overflow: 'auto' }}
            loading={loading}
        />
    );
};

export default UserManagmentTable;

