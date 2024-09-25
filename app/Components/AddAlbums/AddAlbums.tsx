'use client'
import { useForm, SubmitHandler } from 'react-hook-form';
import React, { useState } from 'react';
import styles from './AddAlbums.module.scss';
import axios from 'axios';
import Button from '../Button/Button';

const AddAlbums = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm<any>();

    const [albumCover, setAlbumCover] = useState('');

    const handleOpenModal = () => setIsOpen(true);
    const handleCloseModal = () => {
        setIsOpen(false);
        reset();
    };

    const handleDone = () => {
        const data = getValues();
        if (!data.name) {
            console.error('music name is required');
            return;
        }
        setIsOpen(false);
        reset();
    };


    const onSubmit: SubmitHandler<any> = async (values: any) => {
        console.log(values);

        const data = new FormData();
        data.append('musicName', values.name);
        data.append('Year', values.Year[0]);
        data.append('photo', values.photo[0]);


        try {
            const token = document.cookie
                .split('; ')
                .find((row) => row.startsWith('token='))
                ?.split('=')[1];

            const response = await axios.post('https://vibetunes-backend.onrender.com/playlist', data, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });

            // if (response.status !== 200) {
            //     throw new Error('Network response was not ok');
            // }
            handleDone();
        } finally {
            // handleDone() ;
            setIsOpen(false);
        }
    };

    const handleAlbumCover = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setAlbumCover(event.target.files[0].name);
        }
    };


    return (
        <>
            <div onClick={handleOpenModal}>
                <img src='/icons/addAlbum.svg' />
            </div>
            {
                isOpen &&
                <div className={styles.reausableModalContainer}>
                    <div className={styles.reusableModal}>
                        <div className={styles.addPlaylist}>
                            <span className={styles.addPlaylistText}>Add Artist</span>
                            <button onClick={handleCloseModal} className={styles.addPlaylistIcon}>
                                <img src="xicon.svg" alt="x" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className={styles.addmusicName}>
                            <div className={styles.userInfo}>
                                <div className={styles.names}>
                                    <span className={styles.musicText}>Album Name</span>
                                </div>
                                <div className={styles.artistName}>
                                    <input
                                        className={styles.inputMusic}
                                        type="text"
                                        placeholder='Album Name'
                                        {...register('name', { required: 'Artist name is required' })}
                                    />
                                </div>
                                <div className={styles.names}>
                                    <span className={styles.musicText}>Artist Name</span>
                                </div>
                                <div className={styles.artistName}>
                                    <input
                                        className={styles.inputMusic}
                                        type="text"
                                        placeholder='Artist Name'
                                        {...register('name', { required: 'Artist name is required' })}
                                    />
                                </div>
                                <div className={styles.errorName}>
                                    {errors.name && <span className={styles.error}>artist name is required</span>}
                                </div>
                            </div>

                            <div className={styles.info}>
                                <div className={styles.yearbio}>
                                    <span className={styles.musicText}>Year</span>
                                    <input
                                        className={styles.inputMusic}
                                        type="text"
                                        placeholder='Year'
                                        {...register('Year')}
                                    />
                                </div>
                            </div>

                            <div className={styles.inputFile}>
                                <input
                                    id="upload-album-cover"
                                    type="file"
                                    {...register('photo', { required: 'Photo is required' })}
                                    onChange={handleAlbumCover}
                                />

                                <label className={styles.uploadLabel} htmlFor="upload-album-cover">
                                    <img className={styles.uploadIcon} src="/musiccover.svg" alt="cover" />
                                    {albumCover || 'Upload album cover'}
                                </label>
                                {errors.photo && <span className={styles.error}>album cover is required</span>}

                            </div>
                            <div className={styles.modalButton}>
                                <div className={styles.cancel}>
                                    <Button title={'cancel'} type={'secondary'} showIcon={true} />
                                </div>
                                <div className={styles.done} >
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

export default AddAlbums;