'use client'
import { useForm, SubmitHandler } from 'react-hook-form';
import React, { useState } from 'react';
import styles from './ChangePassword.module.scss';
import axios from 'axios';
import EditPen from '../EditPen/EditPen';
import Button from '../Button/Button';



const ChangePassword = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm<any>();

    const handleOpenModal = () => setIsOpen(true);
    const handleCloseModal = () => {
        setIsOpen(false);
        reset();
    };

    const handleDone = () => {
        setIsOpen(false);
        reset();
    };
    const onSubmit: SubmitHandler<any> = async (values: any) => {
        console.log(values);

        const data = new FormData();
        data.append('currentPassword', values.currentPassword);
        data.append('newPassword', values.newPassword);
        data.append('confirmPassword', values.confirmPassword);

        try {
            const token = document.cookie
                .split('; ')
                .find((row) => row.startsWith('token='))
                ?.split('=')[1];

            const response = await axios.patch(`https://vibetunes-backend.onrender.com/users/change-password`, data, {
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


    return (
        <>
            <div onClick={handleOpenModal}>
                <EditPen />
            </div>
            {isOpen && (
                <div className={styles.reausableModalContainer}>
                    <div className={styles.reusableModal} >
                        <div className={styles.addPlaylist}>
                            <span className={styles.addPlaylistText}>ChangePassword</span>
                            <button onClick={handleCloseModal} className={styles.addPlaylistIcon}>
                                <img src="/xicon.svg" alt="x" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className={styles.addname}>
                        <div className={styles.inputChange}>
                                <span className={styles.musicText}>Old Password</span>
                                <input
                                    className={styles.inputMusic}
                                    type="password"
                                    placeholder='Old password'
                                    {...register('currentPassword', { required: 'current Password is required' })}
                                />
                                {errors.oldPassword && <span className={styles.error}>Old password is required'</span>}
                            </div>

                            <div className={styles.inputChange}>
                                <span className={styles.musicText}>New Password</span>
                                <input
                                    className={styles.inputMusic}
                                    type="password"
                                    placeholder='New password'
                                    {...register('newPassword', { required: 'New password is required' })}
                                />
                                {errors.newPassword && <span className={styles.error}>New password is required</span>}
                            </div>

                            <div className={styles.inputChange}>
                                <span className={styles.musicText}>Confirm New Password</span>
                                <input
                                    className={styles.inputMusic}
                                    type="password"
                                    placeholder='Confirm new password'
                                    {...register('confirmPassword', { required: 'Confirm password is required' })}
                                />
                                {errors.confirmNewPassword && <span className={styles.error}>Confirm password is required</span>}
                            </div>
                            <div className={styles.modalButton}>
                                <div className={styles.cancel}>
                                    <Button title={'cancel'} type={'secondary'} showIcon={true} />
                                </div>
                                <div className={styles.done} >
                                    <Button title={'done'} type={'primary'} showIcon={true} />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChangePassword;
