import ArtistTable from "@/app/Components/ArtistTable/ArtistTable"
import styles from './page.module.css'
import AddArtist from "@/app/Components/AddArtist/AddArtist"

const ArtistPage = () => {
    return (
        <>
            <div className={styles.conteiner}>
                <div className={styles.addArtist}>
                    <AddArtist />
                </div>
            </div>
            <h4 className={styles.artist}>All Artists</h4>
            <ArtistTable />
        </>
    )
}

export default ArtistPage