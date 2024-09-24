import Link from 'next/link'

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
