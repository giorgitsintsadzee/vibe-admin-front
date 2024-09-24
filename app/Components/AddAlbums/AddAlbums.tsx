'use client'
import { useForm, SubmitHandler } from 'react-hook-form';
import React, { useState } from 'react';
import styles from './AddAlbums.module.scss';
import Modal from '../Modal/Modal';
import axios from 'axios';

type FormValues = {
    name: string;
    photo: FileList;
    Year: string;
    artistName: string
};

const AddAlbums = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm<FormValues>();

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

    };


    const onSubmit: SubmitHandler<FormValues> = async (values: FormValues) => {
        console.log(values);


        const data = new FormData();

        data.append('musicName', values.name);

        if (values.Year.length > 0) {
            data.append('Year', values.Year[0]);
        }
        if (values.photo.length > 0) {
            data.append('photo', values.photo[0]);
        }

        try {
            const token = document.cookie
                .split('; ')
                .find((row) => row.startsWith('token='))
                ?.split('=')[1];

            await axios.post('https://vibetunes-backend-prrr.onrender.com/files/upload', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            })
            setIsOpen(false);
        } catch (error) {
            console.error('Error uploading files:', error);
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
                    <form onSubmit={handleSubmit(onSubmit)} className={styles.addmusicName}>
                        <Modal
                            isOpen={isOpen}
                            onClose={handleCloseModal}
                            onDone={handleDone}
                            title=' Add Artist'>

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
                                    {...register('photo', { required: 'Photo is required' })} />
                                <img className={styles.uploadIcon} src="/musiccover.svg" alt="cover" />
                                <label className={styles.uploadLabel} htmlFor="upload-album-cover">
                                    Upload album cover
                                </label>
                                {errors.photo && <span className={styles.error}>{errors.photo.message}</span>}

                            </div>
                        </Modal>
                    </form>

                </div>
            }
        </>
    );
}

export default AddAlbums;