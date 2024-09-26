'use client';

import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import Padlock from '../Delete/Padlock';
import Playlist from '../Playlist/Playlist';
import ChangePassword from '../ChangePassword/ChangePassword';
import axios from 'axios';

type EmailRecord = {
    key: string;
    email: string;
    createdAt: Date;
};

const EmailTable = () => {
    const [dataSource, setDataSource] = useState<EmailRecord[]>([]);
    const [loading, setLoading] = useState(false);


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
                const users = response.data;
                const formattedData = users.map((user: any, index: number) => ({
                    key: String(index + 1),
                    email: user.email,
                    createdAt: new Date(user.createdAt).toLocaleDateString(),                    
                }));
                
                setDataSource(formattedData);
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
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                    <Playlist id={record.key} />
                    <Padlock />
                    <ChangePassword />
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

export default EmailTable;
