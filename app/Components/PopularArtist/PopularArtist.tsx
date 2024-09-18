import React from 'react'
import styles from './PopularArtist.module.scss'
import ArtistCard from '../ArtistCard/ArtistCard'

const PopularArtist = () => {

    const artistsData = [
        {
            id: 1,
            title: 'Coldplay',
            year: 1997,
            url: '/COldplay.svg',
        },
        {
            id: 2,
            title: 'Rihhana',
            year: 1988,
            url: '/rihhana.svg',
        },
        {
            id: 3,
            title: 'Coldplay',
            year: 1997,
            url: '/COldplay.svg',
        },
        {
            id: 4,
            title: 'Rihhana',
            year: 1988,
            url: '/rihhana.svg',
        },
        {
            id: 5,
            title: 'Rihhana',
            year: 1988,
            url: '/rihhana.svg',
        },
        {
            id: 6,
            title: 'Rihhana',
            year: 1988,
            url: '/rihhana.svg',
        },
        {
            id: 7,
            title: 'Rihhana',
            year: 1988,
            url: '/rihhana.svg',
        },
        {
            id: 8,
            title: 'Rihhana',
            year: 1988,
            url: '/rihhana.svg',
        },
    ]
    
    return (
        <div className={styles.container}>
            {artistsData.map(artistCard=>(
                <ArtistCard
                key={artistCard.id}
                title={artistCard.title}
                url={artistCard.url}
                year={artistCard.year}/>
            ))}
        </div>
    )
}

export default PopularArtist