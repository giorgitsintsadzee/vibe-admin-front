'use client';

import { Table } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'; // Import Ant Design icons
import React from 'react';

type ArtistRecord = {
    key: string;
    name: string;
    year: number;
    address: string;
    image: string;
};

const ArtistTable: React.FC = () => {
    const dataSource: ArtistRecord[] = [
        {
            key: '1',
            name: 'Imany',
            year: 1979,
            address: '04.07.2024',
            image: 'imany.svg',
        },
        {
            key: '2',
            name: 'Coldplay',
            year: 1997,
            address: '04.07.2024',
            image: 'imany.svg',
        },
        {
            key: '3',
            name: 'The Beatles',
            year: 1960,
            address: '03.07.2024',
            image: 'imany.svg',
        },
        {
            key: '4',
            name: 'Harry Styles',
            year: 1994,
            address: '01.07.2024',
            image: 'imany.svg',
        },
        {
            key: '5',
            name: 'Queen',
            year: 1970,
            address: '01.07.2024',
            image: 'imany.svg',
        },
        {
            key: '6',
            name: 'Billie Eilish',
            year: 2001,
            address: '01.07.2024',
            image: 'imany.svg',
        },
    ];

    const columns = [
        {
            title: 'Name, surname',
            dataIndex: 'name',
            key: 'name',
            render: (text: string, record: ArtistRecord) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                        src={record.image}
                        alt={record.name}
                        style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
                    />
                    {text}
                </div>
            ),
        },
        {
            title: 'Year',
            dataIndex: 'year',
            key: 'year',
        },
        {
            title: 'Added date',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (record: ArtistRecord) => (
                <div style={{ display: 'flex', gap: '10px' }}>
                    <EditOutlined style={{ fontSize: '20px', }} />
                    <DeleteOutlined style={{ fontSize: '20px' }} />
                </div>
            ),
        },
    ];

    return <Table dataSource={dataSource} columns={columns} />;
};

export default ArtistTable;
