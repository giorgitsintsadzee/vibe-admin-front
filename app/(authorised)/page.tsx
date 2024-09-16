import AlbumCard from '../Components/AlbumCard/AlbumCard';
import ArtistCard from '../Components/ArtistCard/ArtistCard';
import Button from '../Components/Button/Button';
import NavBarMenu from '../Components/NavBarMenu/NavBarMenu';
import styles from './page.module.css'
import Headers from '../Components/Headers/Headers';
import MusicCard from '../Components/MusicCard/MusicCard';
export default function Home() {
    return (
        <>
        <MusicCard imageUrl={'/musicCard.svg'} songName={'yellow'} artistName={'ghju'} showBin={true} />
        </>
    );
}