import { useState } from 'react';
import styles from './Bin.module.scss';
import Button from '../Button/Button';

const Bin = () => {
    const [isActive, setIsActive] = useState(false);

    const onClick = () => {
        setIsActive(!isActive);
    };

    return (
        <div className={styles.conteiner}>
            <img src='/bin.svg' alt='bin' onClick={onClick} className={styles.trash} />
            {isActive && (
                <div onClick={onClick} className={styles.wrap}>
                    <div className={styles.delete}>
                        <div className={styles.close}>
                            <span>Are you sure to delete the song?</span>
                            <img src="/xxxx.svg" alt="close" width={24} height={24} />
                        </div>
                        <div className={styles.buttons}>
                            <Button title={'no'} type={'secondary'} />
                            <Button title={'yes'} type={'primary'} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Bin;
