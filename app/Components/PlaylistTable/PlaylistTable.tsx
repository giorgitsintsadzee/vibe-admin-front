'use client';
import { Table } from 'antd';
import React from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import EditPen from '../EditPen/EditPen';
import Bin from '../Bin/Bin';

type SongRecord = {
    key: string;
    name: string;
    image: string;
};

const PlaylistTable = () => {
    const dataSource: SongRecord[] = [
        {
            key: '1',
            name: 'Car songs',
            image: '/playlisttable.svg',
        },
        {
            key: '2',
            name: 'Birthday songs',
            image: '/playlisttable.svg',
        },
        {
            key: '3',
            name: 'Party songs',
            image: '/playlisttable.svg',
        },
        {
            key: '4',
            name: 'Sadly songs',
            image: '/playlisttable.svg',
        },
        {
            key: '5',
            name: 'Night',
            image: '/playlisttable.svg',
        },
        {
            key: '6',
            name: 'Dream',
            image: '/playlisttable.svg',
        },
        {
            key: '7',
            name: 'Good songs',
            image: '/playlisttable.svg',
        },
        
    ];

    const columns = [
        {
            title: 'name',
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
                    <EditPen/>
                    <Bin/>
                </div>
            ),
        },
    ];

    return (
        <Table 
            dataSource={dataSource} 
            columns={columns}
            pagination={false} 
            rowClassName="custom-row"
        />
    );
};

export default PlaylistTable;
