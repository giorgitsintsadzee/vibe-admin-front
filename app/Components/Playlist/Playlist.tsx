import Link from 'next/link'
import styles from './Playlist.module.scss'

const Playlist = () => {

    return (
        <Link href='/playlist'>
            <img src="icons/playlist.svg" alt="playlistpage" />
        </Link>
    )
}

export default Playlist