import ArtistTable from "@/app/Components/ArtistTable/ArtistTable"
import styles from './page.module.css'

const ArtistPage = () => {
    return (
        <div>
            <h4 className={styles.artist}>All Artists</h4>
            <ArtistTable />
        </div>
    )
}

export default ArtistPage