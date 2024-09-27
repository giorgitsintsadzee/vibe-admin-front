'use client'
import { useForm, SubmitHandler } from 'react-hook-form';
import React, { useState } from 'react';
import styles from './EditPlaylist.module.scss';
import axios from 'axios';
import EditPen from '../EditPen/EditPen';
import Button from '../Button/Button';

type EditListFormData = {
    name: string;
}

type Props = {
    playlistId: number;
    userId: number;
}


const EditPlaylist = (props: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm<EditListFormData>();

    const handleOpenModal = () => setIsOpen(true);
    const handleCloseModal = () => {
        setIsOpen(false);
        reset();
    };

    const handleDone = () => {
        setIsOpen(false);
        reset();
    };


    const onSubmit: SubmitHandler<EditListFormData> = async (values: EditListFormData) => {
        console.log(values);

        const data = new FormData();
        data.append('name', values.name);

        try {
            const token = document.cookie
                .split('; ')
                .find((row) => row.startsWith('token='))
                ?.split('=')[1];

            await axios.patch(`https://vibetunes-backend.onrender.com/playlist/${props.userId}/edit/${props.playlistId}`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });

            handleDone();
        } finally {
            setIsOpen(false);
        }
    };

    return (
        <>
            <div onClick={handleOpenModal}>
                <EditPen />
            </div>
            {
                isOpen &&
                <div className={styles.reausableModalContainer}>
                    <div className={styles.reusableModal}>
                    <div className={styles.addPlaylist}>
                            <span className={styles.addPlaylistText}>EditPlaylist</span>
                            <button onClick={handleCloseModal} className={styles.addPlaylistIcon}>
                                <img src="/xicon.svg" alt="x" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className={styles.addname}>
                            <span className={styles.musicText}>Name</span>
                            <input
                                className={styles.inputMusic}
                                type="text"
                                placeholder='Playlist name'
                                {...register('name', { required: true })}
                            />
                            {errors.name && <span className={styles.error}>Name is required</span>}
                            <div className={styles.modalButton}>
                                <div className={styles.cancel} onClick={handleCloseModal}>
                                    <Button title={'cancel'} type={'secondary'} showIcon={true} />
                                </div>
                                <div className={styles.done}>
                                    <Button title={'done'} type={'primary'} showIcon={true} />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </>
    );
}

export default EditPlaylist;
