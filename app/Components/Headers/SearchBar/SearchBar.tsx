'use client';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import styles from './SearchBar.module.scss';
import ListOptions from './ListOptions/ListOptions';

type Option = {
    id: number;
    text: string;
    img: string;
    type: 'singer' | 'album';
    link: string;
};

const listOptions: Option[] = [
    { id: 1, text: 'Harry Styles', img: '/harryStyles.svg', type: 'singer', link: '/harry-styles' },
    { id: 2, text: 'Havana', img: '/havana.svg', type: 'album', link: '/havana' },
    { id: 3, text: 'Still Sane', img: '/', type: 'album', link: '/still-sane' },
];

const SearchBar = () => {
    const [query, setQuery] = useState<string>('');
    const [filteredOptions, setFilteredOptions] = useState<Option[]>([]);

    const filterOptions = useCallback(() => {
        if (query) {
            const filtered = listOptions.filter(option =>
                option.text.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredOptions(filtered);
        } else {
            setFilteredOptions([]);
        }
    }, [query]);

    useEffect(() => {
        filterOptions();
    }, [query, filterOptions]);

    return (
        <div className={styles.searchContainer}>
            <input
                className={styles.search}
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <Image
                src="/search icon.svg"
                width={24}
                height={24}
                alt="search icon"
                className={styles.icon}
            />
            <div className={styles.border}>
                {filteredOptions.length > 0 && (
                    <ListOptions options={filteredOptions} onOptionClick={setQuery} />
                )}
            </div>
        </div>
    );
};

export default SearchBar;
