'use client';
import { useForm } from "react-hook-form";
import styles from "./AuthForm.module.scss";
import Image from 'next/image';
import ReusableInput from "../ReusableInput/ReusableInput";
import Button from "../Button/Button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { setCookie } from "@/app/helpers/cookies";
import { useState, useEffect } from "react";
import CryptoJS from 'crypto-js';

const secretKey = 'yourSecretKey123';

type FormValues = {
    email: string;
    password: string;
};

const AuthForm = () => {
    const [error, setError] = useState<string | null>(null);
    const [rememberMe, setRememberMe] = useState(false);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormValues>(); 
    const router = useRouter();

    useEffect(() => {
        const encryptedEmail = localStorage.getItem('rememberMeEmail');
        const encryptedPassword = localStorage.getItem('rememberMePassword');

        if (encryptedEmail && encryptedPassword) {
            const decryptedEmail = CryptoJS.AES.decrypt(encryptedEmail, secretKey).toString(CryptoJS.enc.Utf8);
            const decryptedPassword = CryptoJS.AES.decrypt(encryptedPassword, secretKey).toString(CryptoJS.enc.Utf8);

            setValue('email', decryptedEmail);
            setValue('password', decryptedPassword);
            setRememberMe(true);
        }
    }, [setValue]);

    const onSubmit = (values: FormValues) => { 
        axios.post('https://vibetunes-backend.onrender.com/auth/admin/signIn', values)
            .then(r => {
                setCookie('token', r.data.accessToken, 60);

                if (rememberMe) {
                    const encryptedEmail = CryptoJS.AES.encrypt(values.email, secretKey).toString();
                    const encryptedPassword = CryptoJS.AES.encrypt(values.password, secretKey).toString();

                    localStorage.setItem('rememberMeEmail', encryptedEmail);
                    localStorage.setItem('rememberMePassword', encryptedPassword);
                } else {
                    localStorage.removeItem('rememberMeEmail');
                    localStorage.removeItem('rememberMePassword');
                }

                router.push('/');
            })
            .catch(() => setError('you are not admin!'));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.mainContainer}>
            <div className={styles.authContainer}>
                <Image className={styles.logo} src='/whiteLogo.png' width={170} height={70} alt={"logo"} />

                <div className={styles.forms}>
                    <ReusableInput
                        type="email"
                        placeholder="Enter Email"
                        register={register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: 'Entered value does not match email format',
                            },
                        })}
                        mode={errors.email ? 'error' : 'standard'}
                    />
                    <ReusableInput
                        type="password"
                        placeholder="Enter Password"
                        register={register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 8,
                                message: 'Password must be at least 8 characters long',
                            },
                        })}
                        mode={errors.password ? 'error' : 'standard'}
                    />
                </div>

                {error && <div className={styles.error}>{error}</div>}

                <div className={styles.rememberMe}>
                    <input
                        className={styles.checkbox}
                        type="checkbox"
                        id="rememberMe"
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)}
                    />
                    <label htmlFor="rememberMe"> Remember password</label>
                </div>

                <div className={styles.buttonWrapper}>
                    <Button title="Sign in" type="primary" showIcon={true} />
                </div>
            </div>
        </form>
    );
};

export default AuthForm;