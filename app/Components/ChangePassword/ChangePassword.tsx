'use client'
import { useForm, SubmitHandler } from 'react-hook-form';
import React, { useState } from 'react';
import styles from './ChangePassword.module.scss';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import axios from 'axios';
import EditPen from '../EditPen/EditPen';

type FormValues = {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
};

const ChangePassword = () => {
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
        data.append('oldPassword', values.oldPassword);
        data.append('newPassword', values.newPassword);
        data.append('confirmNewPassword', values.confirmNewPassword);

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
                <EditPen />
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
                            <div className={styles.inputChange}>
                                <span className={styles.musicText}>Edit playlist</span>
                                <input
                                    className={styles.inputMusic}
                                    type="password"
                                    placeholder='Old password'
                                    {...register('oldPassword', { required: true })}
                                />
                                {/* {errors.Name && <span className={styles.error}>old password is required</span>} */}
                            </div>

                            <div className={styles.inputChange}>
                                <span className={styles.musicText}>Edit playlist</span>
                                <input
                                    className={styles.inputMusic}
                                    type="password"
                                    placeholder='New password'
                                    {...register('newPassword', { required: true })}
                                />
                                {/* {errors.Name && <span className={styles.error}>new password is required</span>} */}
                            </div>

                            <div className={styles.inputChange}>
                                <span className={styles.musicText}>Edit playlist</span>
                                <input
                                    className={styles.inputMusic}
                                    type="password"
                                    placeholder='Confirm new password'
                                    {...register('confirmNewPassword', { required: true })}
                                />
                                {/* {errors.Name && <span className={styles.error}>confirm password is required</span>} */}
                            </div>

                        </Modal>
                    </form>

                </div>
            }
        </>
    );
}

export default ChangePassword;

