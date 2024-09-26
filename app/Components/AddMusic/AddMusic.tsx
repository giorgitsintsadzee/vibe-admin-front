'use client'
import { useForm, SubmitHandler } from 'react-hook-form';
import React, { useState } from 'react';
import styles from './AddMusic.module.scss';
import Button from '../Button/Button';
import axios from 'axios';

type MusicFormData = {
    name: string;
    musicPhotos: FileList;
    file: FileList;
}


const AddMusic = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm<MusicFormData>();

    const [musicFileName, setMusicFileName] = useState('');
    const [coverFileName, setCoverFileName] = useState('');

    const handleOpenModal = () => setIsOpen(true);
    const handleCloseModal = () => {
        setIsOpen(false);
        reset();
        setMusicFileName('')
        setCoverFileName('');
    };

    const handleDone = () => {
        setIsOpen(false);
        reset();
    };

    const onSubmit: SubmitHandler<MusicFormData> = async (values: MusicFormData) => {
        console.log(values);

        const data = new FormData();

        data.append('name', values.name);

        if (values.file.length > 0) {
            data.append('file', values.file[0]);
            console.log(values.file[0])
        }

        if (values.musicPhotos.length > 0) {
            data.append('musicPhotos', values.musicPhotos[0]);
            console.log(values.musicPhotos[0]);

        }

        try {
            const token = document.cookie
                .split('; ')
                .find((row) => row.startsWith('token='))
                ?.split('=')[1];

           await axios.post('https://vibetunes-backend.onrender.com/music/upload', data, {
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

    const handleMusicFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setMusicFileName(event.target.files[0].name);
        }
    };

    const handleCoverFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setCoverFileName(event.target.files[0].name);
        }
    };

    return (
        <>
            <div onClick={handleOpenModal}>
                <Button title={'Add Music'} type={'primary'} showIcon={false} />
            </div>
            {
                isOpen &&
                <div className={styles.reausableModalContainer}>
                    <div className={styles.reusableModal}>
                        <div className={styles.addPlaylist}>
                            <span className={styles.addPlaylistText}>Add Music</span>
                            <button onClick={handleCloseModal} className={styles.addPlaylistIcon}>
                                <img src="/xicon.svg" alt="x" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className={styles.addname}>
                            <span className={styles.musicText}>Name</span>
                            <input
                                className={styles.inputMusic}
                                type="text"
                                placeholder='Music name'
                                {...register('name', { required: true })}
                            />
                            {errors.name && <span className={styles.error}>Music name is required</span>}
                            <div className={styles.inputFile}>
                                <input
                                    id="file-upload"
                                    type="file"
                                    {...register('file', { required: true })}
                                    onChange={handleMusicFileChange}
                                    style={{ display: 'none' }}
                                />
                                <label className={styles.uploadLabel} htmlFor="file-upload">
                                    <img className={styles.uploadIcon} src="/uploadfile.svg" alt="file" />
                                    {musicFileName || 'Upload music - Mp3'}
                                </label>
                            </div>
                            <div className={styles.inputFile}>
                                <input
                                    id="file-upload-cover"
                                    type="file"
                                    {...register('musicPhotos', { required: true })}
                                    onChange={handleCoverFileChange}
                                    style={{ display: 'none' }}
                                />
                                <label className={styles.uploadLabel} htmlFor="file-upload-cover">
                                    <img className={styles.uploadIcon} src="/musiccover.svg" alt="cover" />
                                    {coverFileName || 'Upload music cover'}
                                </label>
                            </div>

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

export default AddMusic;
