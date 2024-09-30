'use client'
import React from 'react';
import styles from '../MusicCard/MusicCard.module.scss';
import AlbumsMusicDelete from '../AlbumsMusicDelete/AlbumsMusicDelete';

type Props = {
    imageUrl: string;
    songName: string;
    artistName: string;
    showBin: boolean;
    albumsMusicId?: number;
}

const MusicCard = (props: Props) => {

    return (
        <div className={styles.musicCard}>
            <div className={styles.musicCardComp}>
                <div className={styles.musiccardList}>
                    <img
                        className={styles.musicCardImage}
                        src={props.imageUrl}
                        alt='image'
                    />
                    <div className={styles.musicCardInfo} >
                        <h3 className={styles.songName}>{props.songName}</h3>
                        <p className={styles.artistName}>{props.artistName}</p>
                    </div>
                </div>
                <div className={styles.musicCardHeart}>
                {props.showBin ? '' : props.albumsMusicId && <AlbumsMusicDelete albumsMusicId={props.albumsMusicId} />}

                </div>
            </div>
        </div>
    );
}

export default MusicCard;   