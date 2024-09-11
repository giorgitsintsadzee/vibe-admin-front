'use client'
import Image from 'next/image'
import styles from './Headers.module.scss'
import UserAvatar from './UserAvatar/UserAvatar'
import Link from 'next/link'
import SearchBar from './SearchBar/SearchBar'


const Headers = () => {
    return (
        <div className={styles.container} >
            <div className={styles.searchLogoContainer}>
                <div className={styles.searchLogo}>
                    <Link href='/'>
                        <Image src='/logo.png' alt='logo' width={150} height={60} className={styles.logo} />
                    </Link>
                </div>
            </div>
            <div className={styles.wrapper}>
                <div className={styles.searchContainer}>
                    <SearchBar />
                </div>
                <UserAvatar gmail={'G.sanikidze@gmail.com'} />
            </div>
        </div>
    )
}

export default Headers