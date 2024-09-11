import Link from 'next/link';
import styles from './ListOptions.module.scss';

type Props = {
    id: number;
    text: string;
    img: string;
    type: 'singer' | 'album';
    link: string;
};

interface ListOptionsProps {
    options: Props[];
    onOptionClick?: (text: string) => void;
}

const ListOptions = ({ options, onOptionClick }: ListOptionsProps) => {
    return (
        <ul className={styles.listOptions}>
            {options.map(option => (
                <Link href={option.link} key={option.id}>
                    <li className={styles.option}>
                        <a
                            onClick={() => {
                                if (onOptionClick) {
                                    onOptionClick(option.text);
                                }
                            }}
                        >
                            <img
                                src={option.img}
                                alt={option.text}
                                className={`${styles.optionImage} ${styles[option.type]}`}
                            />
                            <span>{option.text}</span>
                        </a>
                    </li>
                </Link>
            ))}
        </ul>
    );
};

export default ListOptions;
