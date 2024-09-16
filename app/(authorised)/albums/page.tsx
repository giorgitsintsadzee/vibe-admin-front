'use client'
import styles from "./page.module.css"
import Albums from "@/app/Components/Albums/Albums"

const AlbumsPage = () => {

    return (
        <>
            <div className={styles.albumsPageM}>
                <div className={styles.albumsText}>Albums</div>
                <Albums/>
            </div>
        </>
    )
}

export default AlbumsPage