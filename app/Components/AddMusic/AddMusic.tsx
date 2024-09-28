'use client'
import { useForm, SubmitHandler } from 'react-hook-form';
import React, { useState } from 'react';
import styles from './AddMusic.module.scss';
import Button from '../Button/Button';
import axios from 'axios';

type MusicFormData = {
    name: string;
    artistName: string;
    photo: FileList;
    mp3: FileList;
}


const AddMusic = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm<MusicFormData>();

    const [showFile, setShowFile] = useState<File | null>(null);
    const [musicFileName, setMusicFileName] = useState('');
    const [coverFileName, setCoverFileName] = useState('');

    const handleOpenModal = () => setIsOpen(true);
    const handleCloseModal = () => {
        setIsOpen(false);
        reset();
        setShowFile(null);
        setMusicFileName('');
        setCoverFileName('');
    };

    const handleDone = () => {
        setIsOpen(false);
        reset();
    };

    const onSubmit: SubmitHandler<MusicFormData> = async (values: MusicFormData) => {

        const data = new FormData();

        data.append('name', values.name);
        data.append('artistName', values.name);

        if (showFile) {
            data.append('mp3', showFile);
        } else {
            console.error("No file selected");
            return;
        }

        if (showFile) {
            data.append('photo', showFile);
        } else {
            console.error("No photo file selected");
            return;
        }

        try {
            const token = document.cookie
                .split('; ')
                .find((row) => row.startsWith('token='))
                ?.split('=')[1];

            await axios.post('https://vibetunes-backend.onrender.com/music/upload', data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            handleDone();
        } finally {
            setIsOpen(false);
        }
    };

    const handleMusicFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setMusicFileName(event.target.files[0].name);
            setShowFile(event.target.files[0]);
        }
    };

    const handleCoverFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setCoverFileName(event.target.files[0].name);
            setShowFile(event.target.files[0]);
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
                            <div className={styles.wrapper}>
                                <span className={styles.musicText}>Name</span>
                                <input
                                    className={styles.inputMusic}
                                    type="text"
                                    placeholder='Music Name'
                                    {...register('name', { required: true })}
                                />
                                {errors.name && <span className={styles.error}>Music name is required</span>}

                                <span className={styles.musicText}>Artist Name</span>
                                <input
                                    className={styles.inputMusic}
                                    type="text"
                                    placeholder='Artist Name'
                                    {...register('artistName', { required: true })}
                                />
                                {errors.name && <span className={styles.error}>artist name is required</span>}
                            </div>
                            <div className={styles.inputFile}>
                                <input
                                    id="file-upload"
                                    type="file"
                                    {...register('mp3', { required: true })}
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
                                    {...register('photo', { required: true })}
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
