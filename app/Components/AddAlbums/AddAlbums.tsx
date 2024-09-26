'use client'
import { useForm, SubmitHandler } from 'react-hook-form';
import React, { useState } from 'react';
import styles from './AddAlbums.module.scss';
import axios from 'axios';
import Button from '../Button/Button';

type AlbumsFormData = {
    artistName: string;
    albumName: string;
    Year: number;
    photo: FileList;
}

const AddAlbums = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { register, handleSubmit, reset,  formState: { errors } } = useForm<AlbumsFormData>();

    const [file, setFile] = useState<File | null>(null);
    const [albumCover, setAlbumCover] = useState('');

    const handleOpenModal = () => setIsOpen(true);
    const handleCloseModal = () => {
        setIsOpen(false);
        reset();
        setFile(null);
        setAlbumCover('');

    };

    const handleDone = () => {
        setIsOpen(false);
        setAlbumCover('');
        reset();
    };


    const onSubmit: SubmitHandler<AlbumsFormData> = async (values: AlbumsFormData) => {

        const data = new FormData();
        data.append('artistName', values.artistName);
        data.append('albumName', values.albumName);
        data.append('Year', values.Year.toString() || '');
      

        if (file) {
            data.append('photo', file);
        } else {
            console.error("No photo file selected");
            return;
        }


        try {
            const token = document.cookie
                .split('; ')
                .find((row) => row.startsWith('token='))
                ?.split('=')[1];

            await axios.post('https://vibetunes-backend.onrender.com/album', data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            handleDone();
        } finally {
            setIsOpen(false);
        }
    };

    const handleAlbumCover = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
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
                            <span className={styles.addPlaylistText}>Add Album</span>
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
                                        {...register('albumName', { required: 'Artist name is required' })}
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
                                        {...register('artistName', { required: 'Artist name is required' })}
                                    />
                                </div>
                                <div className={styles.errorName}>
                                    {errors.artistName && <span className={styles.error}>artist name is required</span>}
                                </div>
                            </div>

                            <div className={styles.info}>
                                <div className={styles.yearbio}>
                                    <span className={styles.musicText}>Year</span>
                                    <input
                                        className={styles.inputMusic}
                                        type="number"
                                        placeholder='Year (4 digits)'
                                        {...register('Year', {
                                            required: 'Year is required',
                                            pattern: {
                                                value: /^\d{4}$/,
                                                message: 'Year must be exactly 4 digits'
                                            }
                                        })}
                                    />
                                    {errors.Year && <span className={styles.error}>{errors.Year.message}</span>}
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
                                <div className={styles.cancel} onClick={handleCloseModal}>
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
