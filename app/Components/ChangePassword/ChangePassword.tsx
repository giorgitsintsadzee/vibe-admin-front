'use client'
import { useForm, SubmitHandler } from 'react-hook-form';
import React, { useState } from 'react';
import styles from './ChangePassword.module.scss';
import axios from 'axios';
import EditPen from '../EditPen/EditPen';
import Button from '../Button/Button';

type PasswordFormData = {
    newPassword: string;
    confirmPassword: string;
}

type Props = {
    id: number
}



const ChangePassword = (props: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm<PasswordFormData>();

    const handleOpenModal = () => setIsOpen(true);
    const handleCloseModal = () => {
        setIsOpen(false);
        reset();
    };

    const handleDone = () => {
        setIsOpen(false);
        reset();
    };
    const onSubmit: SubmitHandler<PasswordFormData> = async (values: PasswordFormData) => {
        console.log(values);

        const data = new FormData();
        data.append('newPassword', values.newPassword);
        data.append('confirmPassword', values.confirmPassword);

        try {
            const token = document.cookie
                .split('; ')
                .find((row) => row.startsWith('token='))
                ?.split('=')[1];

            await axios.patch(`https://vibetunes-backend.onrender.com/users/${props.id}/change-password`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });

            handleDone();
        } finally {
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
                                {errors.confirmPassword && <span className={styles.error}>Confirm password is required</span>}
                            </div>
                            <div className={styles.modalButton}>
                                <div className={styles.cancel} onClick={handleCloseModal}>
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
