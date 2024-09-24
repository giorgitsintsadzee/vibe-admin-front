'use client'
import { useState } from 'react';
import styles from './ReusableInput.module.scss';
import { UseFormRegisterReturn } from 'react-hook-form';
import Image from 'next/image';

type Props = {
    type: 'email' | 'password';
    placeholder: string;
    error?: string;
    mode?: 'standard' | 'error' | 'success';
    register: UseFormRegisterReturn;
};

const ReusableInput = ({ type, placeholder, error, mode = 'standard', register }: Props) => {
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const handleToggleVisibility = () => {
        setPasswordVisible(!isPasswordVisible);
    };

    return (
        <div className={styles.inputMain}>
            <span className={styles.inputText}>{placeholder}</span>
            <div className={styles.inputWrapper}>
                <input
                    className={`${styles.input} ${styles[mode]}`}
                    type={type === 'password' ? (isPasswordVisible ? 'text' : 'password') : type}
                    placeholder={placeholder}
                    {...register}
                />

                {type === 'password' && (
                    <button
                        type="button"
                        className={styles.toggleButton}
                        onClick={handleToggleVisibility}
                        aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
                    >
                        <Image
                            src={isPasswordVisible ? '/icons/eyeopen.svg' : '/icons/eyeclose.svg'}
                            alt={isPasswordVisible ? 'Hide password' : 'Show password'}
                            width={30}
                            height={30}
                            className={styles.eyeIcon}
                        />
                    </button>
                )}
            </div>

            {error && <p className={styles.errorText}>{error}</p>} 
        </div>
    );
};

export default ReusableInput;
