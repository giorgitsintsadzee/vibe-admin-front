'use client'
import React from 'react';
import styles from "./TrendHits.module.scss";
import MusicCard from '../MusicCard/MusicCard';

type Props = {
    limit?: number;
}

const TrendHits = (props: Props) => {
    const trendHitsData = [
        {
            id: 1,
            songName: 'Believer',
            artistName: 'Imagine Dragons',
            imageUrl: '/backImageFullScreeen.jpg',
        },
        {
            id: 2,
            songName: 'Believer',
            artistName: 'Imagine Dragons',
            imageUrl: '/backImageFullScreeen.jpg',
        },
        {
            id: 3,
            songName: 'Believer',
            artistName: 'Imagine Dragons',
            imageUrl: '/backImageFullScreeen.jpg',
        },
        {
            id: 4,
            songName: 'Believer',
            artistName: 'Imagine Dragons',
            imageUrl: '/backImageFullScreeen.jpg',
        },
        {
            id: 5,
            songName: 'Believer',
            artistName: 'Imagine Dragons',
            imageUrl: '/backImageFullScreeen.jpg',
        },
        {
            id: 6,
            songName: 'Believer',
            artistName: 'Imagine Dragons',
            imageUrl: '/backImageFullScreeen.jpg',
        },
        {
            id: 7,
            songName: 'Believer',
            artistName: 'Imagine Dragons',
            imageUrl: '/backImageFullScreeen.jpg',
        },
        {
            id: 8,
            songName: 'Believer',
            artistName: 'Imagine Dragons',
            imageUrl: '/backImageFullScreeen.jpg',
        },
        {
            id: 9,
            songName: 'Believer',
            artistName: 'Imagine Dragons',
            imageUrl: '/backImageFullScreeen.jpg',
        },
        {
            id: 10,
            songName: 'Believer',
            artistName: 'Imagine Dragons',
            imageUrl: '/backImageFullScreeen.jpg',
        },
        {
            id: 11,
            songName: 'Believer',
            artistName: 'Imagine Dragons',
            imageUrl: '/backImageFullScreeen.jpg',
        },
        {
            id: 12,
            songName: 'Believer',
            artistName: 'Imagine Dragons',
            imageUrl: '/backImageFullScreeen.jpg',
        },
        {
            id: 13,
            songName: 'Believer',
            artistName: 'Imagine Dragons',
            imageUrl: '/backImageFullScreeen.jpg',
        },
        {
            id: 14,
            songName: 'Believer',
            artistName: 'Imagine Dragons',
            imageUrl: '/backImageFullScreeen.jpg',
        },
        {
            id: 15,
            songName: 'Believer',
            artistName: 'Imagine Dragons',
            imageUrl: '/backImageFullScreeen.jpg',
        },
        {
            id: 16,
            songName: 'Believer',
            artistName: 'Imagine Dragons',
            imageUrl: '/backImageFullScreeen.jpg',
        },
    ];

    const trendHits = props.limit ? trendHitsData.slice(0, props.limit) : trendHitsData;

    return (
      <>
        <div className={styles.trendHitsContainer}>
            {trendHits.map((trendHit) => (
                <MusicCard
                    key={trendHit.id}
                    imageUrl={trendHit.imageUrl}
                    songName={trendHit.songName}
                    artistName={trendHit.artistName}
                    showBin={true}
                />
            ))}
        </div>
      </>
    );
}

export default TrendHits;
