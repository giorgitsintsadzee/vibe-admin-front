'use client'
import { useState } from 'react'
import styles from './Delete.module.scss'

const Padlock = () => {
    const [isLocked, setIsLocked] = useState(false)

    const handleClick = () => {
        setIsLocked(!isLocked) 
    }

    return (
        <div onClick={handleClick}>
            <img 
                src={isLocked ? "/icons/Lock.svg" : "/icons/Unlock.svg"} 
                alt={isLocked ? "lock" : "unlock"} 
                width={32} 
                height={32} 
            />
        </div>
    )
}

export default Padlock
