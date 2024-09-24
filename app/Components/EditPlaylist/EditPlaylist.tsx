'use client'
import { useForm, SubmitHandler } from 'react-hook-form';
import React, { useState } from 'react';
import styles from './EditPlaylist.module.scss';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import axios from 'axios';

type FormValues = {
    Name: string;
};

const EditPlaylist = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm<FormValues>();

    const handleOpenModal = () => setIsOpen(true);
    const handleCloseModal = () => {
        setIsOpen(false);
        reset();
    };

    const handleDone = () => {
        const data = getValues();

    };


    const onSubmit: SubmitHandler<FormValues> = async (values: FormValues) => {
        console.log(values);


        const data = new FormData();

        data.append('Name', values.Name);

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
            console.error('Error', error);
        }
    };

    return (
        <>
            <div onClick={handleOpenModal}>
                <Button title={'edit playlist name'} type={'primary'} showIcon={false} />
            </div>
            {
                isOpen &&
                <div className={styles.reausableModalContainer}>
                    <form onSubmit={handleSubmit(onSubmit)} className={styles.addname}>
                        <Modal
                            isOpen={isOpen}
                            onClose={handleCloseModal}
                            onDone={handleDone}
                            title=' Add Music'>
                            <span className={styles.musicText}>Edit playlist</span>
                            <input
                                className={styles.inputMusic}
                                type="text"
                                placeholder='Name'
                                {...register('Name', { required: true })}
                            />
                            {errors.Name && <span className={styles.error}>name is required</span>}
                           
                        </Modal>
                    </form>

                </div>
            }
        </>
    );
}

export default EditPlaylist;

