'use client'
import { useState } from 'react'
import styles from './UserAvatar.module.scss'
import Image from 'next/image'

type Props = {
    gmail: string
}

const UserAvatar = (props: Props) => {
    const [userIn, setUserIn] = useState(false)
    const onClick = () => {
        setUserIn(!userIn)
    }
    return (
        <>
            <div className={styles.container}>
                <Image src='/user avatar.svg' onClick={onClick} width={32} height={32} alt='user avatar' className={styles.userAvatar} />
                {userIn &&
                    <div className={styles.wrapper} onClick={onClick}>
                        <div className={styles.userWindow} >
                            {props.gmail}
                            <div className={styles.longOut}>
                                <img src='/longout icoon.svg' alt='long out button' width={24} height={24} />
                                <a href='/authorisation'> <span>Log out</span> </a>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default UserAvatar