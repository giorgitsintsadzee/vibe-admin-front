'use client';
import { useState } from 'react';
import styles from './Bin.module.scss'
import axios from 'axios';
import Button from '../Button/Button';
import { useParams } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { clickState } from '@/app/state';

type Props = {
    playlistId?: number;
};

const Bin = ({ playlistId }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [click, setClick] = useRecoilState(clickState);
    const params = useParams();

    const handleOpenModal = () => setIsOpen(true);
    const handleCloseModal = () => setIsOpen(false);

    const handleDone = () => {
        setIsOpen(false);
        setClick(!click);
    };

    const handleDelete = async () => {
        try {
            const token = document.cookie
                .split('; ')
                .find((row) => row.startsWith('token='))
                ?.split('=')[1];

            await axios.delete(`https://vibetunes-backend.onrender.com/playlist/${params.id}/admin/${playlistId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            });

            handleDone();
        } catch (error) {
            console.error('Failed to delete the playlist:', error);
        }
    };

    return (
        <>
            <div onClick={handleOpenModal}>
                <img src='/bin.svg' alt='bin' className={styles.trash} width={32} height={32} />
            </div>
            {isOpen && (
                <div className={styles.wrap}>
                    <div className={styles.reusableModalContainer}>
                        <div className={styles.addPlaylist}>
                            <span className={styles.addPlaylistText}>Are you sure?</span>
                            <button onClick={handleCloseModal} className={styles.addPlaylistIcon}>
                                <img src="/xicon.svg" alt="x" />
                            </button>
                        </div>

                        <div className={styles.modalButton}>
                            <div className={styles.cancel} onClick={handleCloseModal}>
                                <Button title={'Cancel'} type={'secondary'} showIcon={true} />
                            </div>
                            <div className={styles.delete} onClick={handleDelete}>
                                <Button title={'Delete'} type={'primary'} showIcon={true} />
                            </div>
                        </div>
                    </div>
                 </div>
            )}
        </>
    );
};

export default Bin;
