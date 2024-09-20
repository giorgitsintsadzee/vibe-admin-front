'use client'

import React, { useState } from 'react';
import styles from './Modal.module.scss';
import Button from '../Button/Button';

type Props = {
    title: string;
    isOpen: boolean;
    onClose?: () => void;
    onDone?: () => void;
    children: React.ReactNode;
}

const Modal = (props: Props) => {


    return (
        <>
            <div className={styles.reusableModal}>
                <div className={styles.addPlaylist}>
                    <span className={styles.addPlaylistText}>{props.title}</span>
                    <button onClick={props.onClose} className={styles.addPlaylistIcon}>
                        <img src="xicon.svg" alt="x" />
                    </button>
                </div>
                {props.children}
                <div className={styles.modalButton}>
                    <div className={styles.cancel} onClick={props.onClose}>
                        <Button title={'cancel'} type={'secondary'} showIcon={true} />
                    </div>
                    <div className={styles.done} onClick={props.onDone}>
                        <Button title={'done'} type={'primary'} showIcon={true} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Modal;
