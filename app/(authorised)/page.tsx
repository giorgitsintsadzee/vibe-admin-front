
import styles from './page.module.css'
import TrendHits from '../Components/TrendHits/TrendHits';
import Albums from '../Components/Albums/Albums';
import PopularArtist from '../Components/PopularArtist/PopularArtist';
export default function Home() {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.musicCard}>
                    {/* <span className={styles.musicCardTitle}>Recently add music</span> */}
                    <TrendHits  limit={6}  />
                </div>
                <div className={styles.ArtistCard}>
                    <div className={styles.albumsText}>Recently add artist</div>
                    <PopularArtist />
                </div>
                <div className={styles.albumsPage}>
                    <div className={styles.albumsText}>Recently add Album</div>
                    <Albums />
                </div>
            </div>
        </>
    );
}