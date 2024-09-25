'use client'
import { useForm, SubmitHandler } from 'react-hook-form';
import React, { useState } from 'react';
import styles from './AddArtist.module.scss';
import Button from '../Button/Button';
import axios from 'axios';


const AddArtist = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm<any>();

    const [coverFileName, setCoverFileName] = useState('');

    const handleOpenModal = () => setIsOpen(true);
    const handleCloseModal = () => {
        setIsOpen(false);
        reset();
        setCoverFileName('');
    };

    const handleDone = () => {
        const data = getValues();
        if (!data.name) {
            console.error('music name is required');
            return;
        }
        setIsOpen(false);
        setCoverFileName('');
        reset();
    };


    const onSubmit: SubmitHandler<any> = async (values: any) => {
        console.log(values);


        const data = new FormData();

        data.append('musicName', values.name);
        data.append('lastName', values.lastName[0]);
        data.append('Year', values.Year[0]);
        data.append('AddBiography', values.AddBiography[0]);
        data.append('photo', values.photo[0]);

        try {
            const token = document.cookie
                .split('; ')
                .find((row) => row.startsWith('token='))
                ?.split('=')[1];

            const response = await axios.post('https://vibetunes-backend.onrender.com/files/upload', data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // if (response.status !== 200) {
            //     throw new Error('Network response was not ok');
            // }
            // handleDone();
           
        } 
        finally {
            handleDone();
            // setIsOpen(false);
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
                                        {...register('name', { required: 'Artist name is required' })}
                                    />

                                    <input
                                        className={styles.inputMusic}
                                        type="text"
                                        placeholder='artist last name'
                                        {...register('lastName', { required: 'Last name is required' })}
                                    />


                                </div>
                                <div className={styles.errorName}>
                                    {errors.name && <span className={styles.error}>artist name is required</span>}
                                    {errors.lastName && <span className={styles.error}>last name is required</span>}
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

                                <div className={styles.yearbio}>
                                    <span className={styles.musicText}>Add Biography</span>
                                    <div className={styles.inputWrapper}>
                                        <input
                                            className={`${styles.inputB} ${styles.biography}`}
                                            type="text"
                                            placeholder='Add Biography'
                                            {...register('AddBiography')}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className={styles.inputFile}>
                                <input
                                    id="upload-artist-photo"
                                    type="file"
                                    {...register('photo', { required: 'Photo is required' })}
                                    onChange={handleCoverFileChange}
                                />

                                <label className={styles.uploadLabel} htmlFor="upload-artist-photo">
                                    <img className={styles.uploadIcon} src="/musiccover.svg" alt="cover" />
                                    {coverFileName || 'Upload artist photo'}
                                </label>
                                {errors.photo && <span className={styles.error}>artist photo is required</span>}

                            </div>
                            <div className={styles.modalButton}>
                                <div className={styles.cancel} >
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