'use client'
import { useForm, SubmitHandler } from 'react-hook-form';
import React, { useState } from 'react';
import styles from './AddMusic.module.scss';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import axios from 'axios';

type FormValues = {
    musicName: string;
    file: FileList;
    cover: FileList;
};

const AddMusic = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm<FormValues>();

    const handleOpenModal = () => setIsOpen(true);
    const handleCloseModal = () => {
        setIsOpen(false);
        reset();
    };

    const handleDone = () => {
        const data = getValues();
        if (!data.musicName) {
            console.error('music name is required');
            return;
        }

    };


    const onSubmit: SubmitHandler<FormValues> = async (values: FormValues) => {
        console.log(values);


        const data = new FormData();

        if (values.file.length > 0) {
            data.append('file', values.file[0]);
            console.log(values.file[0])
        }

        if (values.cover.length > 0) {
            data.append('cover', values.cover[0]);
        }

        data.append('musicName', values.musicName);

        try {
            const token = document.cookie
                .split('; ')
                .find((row) => row.startsWith('token='))
                ?.split('=')[1];

            await axios.post('https://vibe-backend-prrr.onrender.com/files', data, {
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
                <Button title={'Add Music'} type={'primary'} showIcon={false} />
            </div>
            {
                isOpen &&
                <div className={styles.reausableModalContainer}>
                    <form onSubmit={handleSubmit(onSubmit)} className={styles.addmusicName}>
                        <Modal
                            isOpen={isOpen}
                            onClose={handleCloseModal}
                            onDone={handleDone}
                            title=' Add Music'>
                            <span className={styles.musicText}>Name</span>
                            <input
                                className={styles.inputMusic}
                                type="text"
                                placeholder='Music name'
                                {...register('musicName', { required: true })}
                            />
                            {errors.musicName && <span className={styles.error}>Music name is required</span>}
                            <div className={styles.inputFile}>
                                <input
                                    id="file-upload"
                                    type="file"
                                    {...register('file', { required: true })} />
                                <img className={styles.uploadIcon} src="/uploadfile.svg" alt="file" />
                                <label className={styles.uploadLabel} htmlFor="file-upload">
                                    Upload music - Mp3
                                </label>
                            </div>
                            <div className={styles.inputFile}>
                                <input
                                    id="file-upload-cover"
                                    type="file"
                                    {...register('cover', { required: true })} />
                                <img className={styles.uploadIcon} src="/musiccover.svg" alt="cover" />
                                <label className={styles.uploadLabel} htmlFor="file-upload-cover">
                                    Upload music  cover
                                </label>
                            </div>
                        </Modal>
                    </form>

                </div>
            }
        </>
    );
}

export default AddMusic;

