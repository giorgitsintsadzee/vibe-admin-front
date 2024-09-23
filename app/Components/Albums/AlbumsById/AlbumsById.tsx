'use client'
import AlbumCard from "../../AlbumCard/AlbumCard";
import MusicCard from "../../MusicCard/MusicCard";
import styles from './AlbumsById.module.scss'

type Props = {
    albumSong: string;
    albumSinger: string;
    albumDate: string;
}


const AlbumsById = (props: Props) => {

    const albomsmusic = [
        {
            id: 1,
            songName: 'Watermelon',
            artistName: 'kaxidze',
            imgUrl: '/jansulKaxize.jpg'
        },
        {
            id: 2,
            songName: 'Watermelon',
            artistName: 'kaxidze',
            imgUrl: '/jansulKaxize.jpg'
        },
        {
            id: 3,
            songName: 'Watermelon',
            artistName: 'kaxidze',
            imgUrl: '/jansulKaxize.jpg'
        },

        {
            id: 4,
            songName: 'Watermelon',
            artistName: 'kaxidze',
            imgUrl: '/jansulKaxize.jpg'
        },
        {
            id: 5,
            songName: 'Watermelon',
            artistName: 'kaxidze',
            imgUrl: '/jansulKaxize.jpg'
        },
        {
            id: 6,
            songName: 'Watermelon',
            artistName: 'kaxidze',
            imgUrl: '/jansulKaxize.jpg'
        },
        {
            id: 7,
            songName: 'Watermelon',
            artistName: 'kaxidze',
            imgUrl: '/jansulKaxize.jpg'
        },
        {
            id: 7,
            songName: 'Watermelon',
            artistName: 'kaxidze',
            imgUrl: '/jansulKaxize.jpg'
        },
    ]
    return (
        <>
            <div className={styles.container}>
                <div className={styles.title}>Albums</div>
                <div className={styles.albumContainer}>
                    <div className={styles.albumImg}>
                        <img className={styles.img} src='/albumcardimg.svg' />
                    </div>
                </div>
                <div className={styles.albumText}>
                    <div className={styles.albums}>
                       <div>
                       <span className={styles.albumSong}>{props.albumSong}</span>
                       <span className={styles.albumSingerdate}>{props.albumSinger}</span>
                       </div>
                    
                    </div>
                    <span className={styles.albumSingerdate}>{props.albumDate}</span>
                </div>
                <div className={styles.musicCards}>
                    {albomsmusic.map((music) => (
                        <MusicCard
                            imageUrl={music.imgUrl}
                            songName={music.songName}
                            artistName={music.artistName}
                            key={music.id}
                            showBin={false}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}


export default AlbumsById