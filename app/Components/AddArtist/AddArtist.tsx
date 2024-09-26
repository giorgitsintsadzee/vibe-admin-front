'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import React, { useState } from 'react';
import styles from './AddArtist.module.scss';
import Button from '../Button/Button';
import axios from 'axios';

interface ArtistFormData {
    name: string;
    lastName: string;
    Year?: number;
    AddBiography?: string;
}

const AddArtist = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [coverFileName, setCoverFileName] = useState('');

    const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm<ArtistFormData>();

    const toggleModal = () => setIsOpen(!isOpen);

    const handleDone = () => {
        if (!getValues().name) return console.error('Artist name is required');
        toggleModal();
        reset();
        setFile(null);
        setCoverFileName('');
    };

    const onSubmit: SubmitHandler<ArtistFormData> = async (values: ArtistFormData) => {
        const data = new FormData();

        data.append('musicName', values.name);
        data.append('lastName', values.lastName);
        data.append('Year', values.Year?.toString() || '');  
        data.append('AddBiography', values.AddBiography || '');

        if (file) {
            data.append('photo', file);  
        } else {
            return console.error("No photo file selected");
        }

        try {
            const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
            if (token) {
                await axios.post('https://vibetunes-backend.onrender.com/author', data, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                console.error("No token found");
            }
        } finally {
            handleDone();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        setFile(selectedFile || null);
        setCoverFileName(selectedFile?.name || '');
    };

    return (
        <>
            <div onClick={toggleModal}>
                <Button title='Add Artist' type='primary' showIcon={true} />
            </div>
            {isOpen && (
                <div className={styles.reausableModalContainer}>
                    <div className={styles.reusableModal}>
                        <div className={styles.addPlaylist}>
                            <span className={styles.addPlaylistText}>Add Artist</span>
                            <button onClick={toggleModal} className={styles.addPlaylistIcon}>
                                <img src="xicon.svg" alt="close" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className={styles.addmusicName}>
                            <div className={styles.userInfo}>
                                <div className={styles.names}>
                                    <input className={styles.inputMusic} type="text" placeholder="Artist Name" {...register('name', { required: true })} />
                                    <input className={styles.inputMusic} type="text" placeholder="Last Name" {...register('lastName', { required: true })} />
                                </div>
                                <div className={styles.errorName}>
                                    {errors.name && <span className={styles.error}>Artist name is required</span>}
                                    {errors.lastName && <span className={styles.error}>Last name is required</span>}
                                </div>
                            </div>

                            <div className={styles.info}>
                                <input className={styles.inputMusic} type="number" placeholder="Year" {...register('Year')} />
                                <input className={`${styles.inputB} ${styles.biography}`} type="text" placeholder="Add Biography" {...register('AddBiography')} />
                            </div>

                            <div className={styles.inputFile}>
                                <input id="upload-artist-photo" type="file" onChange={handleFileChange} />
                                <label htmlFor="upload-artist-photo" className={styles.uploadLabel}>
                                    <img className={styles.uploadIcon} src="/musiccover.svg" alt="cover" />
                                    {coverFileName || 'Upload artist photo'}
                                </label>
                            </div>

                            <div className={styles.modalButton}>
                                <Button title="Cancel" type="secondary" showIcon={true} />
                                <Button title="Done" type="primary" showIcon={true} />
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddArtist;
