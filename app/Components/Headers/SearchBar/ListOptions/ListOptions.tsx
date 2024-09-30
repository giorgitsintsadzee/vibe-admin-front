import Link from 'next/link';
import styles from './ListOptions.module.scss';

type Props = {
    id: number;
    text: string;
    photo?: string;
    file?: string;
    type: 'albums' | 'author' | 'music';
    link?: string;
    musicSrc?: string;
    artistName?: string;
};

interface ListOptionsProps {
    options: Props[];
    onOptionClick?: (text: string) => void;
}

const ListOptions = ({ options, onOptionClick }: ListOptionsProps) => {
    const playMusic = (musicSrc: string) => {
        const audio = new Audio(musicSrc);
        audio.play();
    };


    return (
        <ul className={styles.listOptions}>
            {options.map(option => (
                <li className={styles.option} key={option.id}>
                    {option.type === 'music' ? (
                        <div className={styles.songStyle} onClick={() => playMusic(option.musicSrc!)}>
                            {option.photo && (
                                <img
                                    src={option.photo}
                                    width={50}
                                    height={50}
                                    className={`${styles.optionImage} ${styles[option.type]}`}
                                />
                            )}
                            <div>
                                <div>
                                    <span className={styles.optionText}>{option.text}</span>
                                </div>
                                <div className={styles.artistName}>
                                    <span className={styles.names}>{option.artistName}</span>
                                    <span className={styles.alm}>~song</span>
                                </div>
                            </div>
                        </div>
                    ) : option.type === 'albums' ? (
                        <Link href={`/albums/${option.id}`}  onClick={() => onOptionClick && onOptionClick(option.text)}>
                            <div className={styles.artistAlbums}>
                                {option.file && (
                                    <img
                                        src={option.file}
                                        width={50}
                                        height={50}
                                        className={`${styles.optionImage} ${styles[option.type]}`}
                                    />
                                )}
                                <div>
                                    <div>
                                        <span className={styles.optionText}>{option.text}</span>
                                    </div>
                                    <div>
                                        <span className={styles.names}>{option.artistName}</span>
                                        <span className={styles.alm}>~album</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ) : (
                        <Link href={`/artist`}  onClick={() => onOptionClick && onOptionClick(option.text)}>
                            <div className={styles.artistAlbums}>
                                {option.file && (
                                    <img
                                        src={option.file}
                                        width={50}
                                        height={50}
                                        className={`${styles.optionImage} ${styles[option.type]}`}
                                    />
                                )}
                                <div>
                                    <span className={styles.optionText}>{option.text}</span>
                                    <span className={styles.alm}>~artist</span>
                                </div>
                            </div>
                        </Link>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default ListOptions;
