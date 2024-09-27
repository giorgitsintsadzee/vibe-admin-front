import PlaylistTable from "@/app/Components/PlaylistTable/PlaylistTable";
import styles from './page.module.css'



const Id = () => {
    return (
        <>
            <h3 className={styles.playlist}>Playlist</h3>
            <PlaylistTable/>
        </>
    );
};

export default Id;
