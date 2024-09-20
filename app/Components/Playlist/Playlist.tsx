import Link from 'next/link'
import styles from './Playlist.module.scss'

type Props = {
    id: string;
}

const Playlist = (props: Props) => {
    return (
        <Link href={`/usermanagement/${props.id}`}>
            <img src="icons/playlist.svg" alt="playlistpage" />
        </Link>
    )
}

export default Playlist;
