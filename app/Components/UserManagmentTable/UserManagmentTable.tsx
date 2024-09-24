'use client';

import { Table } from 'antd';
import { DeleteOutlined, EditOutlined, FolderOutlined } from '@ant-design/icons';
import React from 'react';
import Padlock from '../Delete/Padlock';
import EditPen from '../EditPen/EditPen';
import Playlist from '../Playlist/Playlist';
import ChangePassword from '../ChangePassword/ChangePassword';

type EmailRecord = {
    key: string;
    email: string;
    addedDate: string;
};

const EmailTable = () => {
    const dataSource: EmailRecord[] = [
        {
            key: '1',
            email: 'g.sanikidze@gmail.com',
            addedDate: '03.07.2024',
        },
        {
            key: '2',
            email: 'n.gventsadze@gmail.com',
            addedDate: '03.07.2024',
        },
        {
            key: '3',
            email: 't.urushadze@gmail.com',
            addedDate: '03.07.2024',
        },
        {
            key: '4',
            email: 'g.gogitidze@gmail.com',
            addedDate: '03.07.2024',
        },
        {
            key: '5',
            email: 'm.sabanadze@gmail.com',
            addedDate: '03.07.2024',
        },
        {
            key: '6',
            email: 'l.beruashvili@gmail.com',
            addedDate: '03.07.2024',
        },
        {
            key: '7',
            email: 'm.oniani@gmail.com',
            addedDate: '03.07.2024',
        },
        {
            key: '8',
            email: 'a.kakhadze@gmail.com',
            addedDate: '03.07.2024',
        },
        {
            key: '9',
            email: 'k.khutsishvili@gmail.com',
            addedDate: '03.07.2024',
        },
        {
            key: '10',
            email: 't.lomidze@gmail.com',
            addedDate: '03.07.2024',
        },
        {
            key: '11',
            email: 'v.kvintradze@gmail.com',
            addedDate: '03.07.2024',
        },
        {
            key: '12',
            email: 'i.gabedava@gmail.com',
            addedDate: '03.07.2024',
        },
        {
            key: '13',
            email: 'o.tsiklauri@gmail.com',
            addedDate: '03.07.2024',
        },
    ];

    const columns = [
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (text: string) => <span>{text}</span>,
        },
        {
            title: 'Added date',
            dataIndex: 'addedDate',
            key: 'addedDate',
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
        />
    );
};

export default EmailTable;
