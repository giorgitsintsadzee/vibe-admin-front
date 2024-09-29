'use client'
import { useForm, SubmitHandler } from 'react-hook-form';
import React, { useState } from 'react';
import styles from './AddArtist.module.scss';
import Button from '../Button/Button';
import axios from 'axios';

type ArtistFormData = {
    firstName: string;
    lastName: string;
    releaseDate: string;
    biography: string;
    file: FileList;
}

const AddArtist = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm<ArtistFormData>();

    const [files, setFiles] = useState<File | null>(null);
    const [coverFileName, setCoverFileName] = useState('');

    const handleOpenModal = () => setIsOpen(true);
    const handleCloseModal = () => {
        setIsOpen(false);
        reset();
        setFiles(null);
        setCoverFileName('');
    };

    const handleDone = () => {
        setIsOpen(false);
        setCoverFileName('');
        reset();
    };

    const onSubmit: SubmitHandler<ArtistFormData> = async (values: ArtistFormData) => {
        const data = new FormData();
        data.append('firstName', values.firstName);
        data.append('lastName', values.lastName);
        data.append('releaseDate', values.releaseDate.toString() || '');
        data.append('biography', values.biography);


        if (files) {
            data.append('file', files);
        } else {
            console.error("No photo file selected");
            return;
        }

        try {
            const token = document.cookie
                .split('; ')
                .find((row) => row.startsWith('token='))
                ?.split('=')[1];

            await axios.post('https://vibetunes-backend.onrender.com/author/upload', data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

        } finally {
            handleDone();
        }
    };

    const handleCoverFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFiles(event.target.files[0]);
            setCoverFileName(event.target.files[0].name);
        }
    };

    return (
        <>
            <div onClick={handleOpenModal}>
                <Button title={'Add Artist'} type={'primary'} showIcon={false} />
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
                                    <span className={styles.musicText}>Name</span>
                                    <span className={styles.musicText}>last name</span>
                                </div>
                                <div className={styles.artistName}>
                                    <input
                                        className={styles.inputMusic}
                                        type="text"
                                        placeholder='artist name'
                                        {...register('firstName', { required: 'Artist name is required' })}
                                    />

                                    <input
                                        className={styles.inputMusic}
                                        type="text"
                                        placeholder='artist last name'
                                        {...register('lastName')}
                                    />
                                </div>
                                <div className={styles.errorName}>
                                    {errors.firstName && <span className={styles.error}>artist name is required</span>}
                                </div>
                            </div>

                            <div className={styles.info}>
                                <div className={styles.yearbio}>
                                    <span className={styles.musicText}>Year</span>
                                    <input
                                        className={styles.inputMusic}
                                        type="number"
                                        placeholder='Year (4 digits)'
                                        {...register('releaseDate', {
                                            required: 'Year is required',
                                            pattern: {
                                                value: /^\d{4}$/,
                                                message: 'Year must be exactly 4 digits'
                                            }
                                        })}
                                    />
                                    {errors.releaseDate && <span className={styles.error}>{errors.releaseDate.message}</span>}
                                </div>

                                <div className={styles.yearbio}>
                                    <span className={styles.musicText}>Add Biography</span>
                                    <div className={styles.inputWrapper}>
                                        <input
                                            className={`${styles.inputB} ${styles.biography}`}
                                            type="text"
                                            placeholder='Add Biography'
                                            {...register('biography')}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className={styles.inputFile}>
                                <input
                                    id="upload-artist-photo"
                                    type="file"
                                    {...register('file', { required: 'Photo is required' })}
                                    onChange={handleCoverFileChange}
                                />

                                <label className={styles.uploadLabel} htmlFor="upload-artist-photo">
                                    <img className={styles.uploadIcon} src="/musiccover.svg" alt="cover" />
                                    {coverFileName || 'Upload artist photo'}
                                </label>
                                {errors.file && <span className={styles.error}>artist photo is required</span>}
                            </div>
                            <div className={styles.modalButton}>
                                <div className={styles.cancel} onClick={handleCloseModal} >
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

export default AddArtist;
