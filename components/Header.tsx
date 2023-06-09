'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/24/solid';

import trello from '../public/logo/trello.png';
import Avatar from 'react-avatar';
import useBoardStore from '@/store/BoardStore';

import getSuggestion from '@/libs/getSuggestion';

export default function Header() {
    const [board, searchString, setSearchString] = useBoardStore((state) => [
        state.board,
        state.searchString,
        state.setSearchString,
    ]);

    const [loading, setLoading] = useState<boolean>(false);
    const [suggestion, setSuggestion] = useState<string>('');

    useEffect(() => {
        if (board.columns.size === 0) return;
        setLoading(true);
        const fetchSuggestion = async () => {
            const response = await getSuggestion(board);
            setSuggestion(response);
            setLoading(false);
        };
        fetchSuggestion();
    }, [board]);

    return (
        <header>
            <div className='flex flex-col items-center justify-between p-5 bg-gray-500/10 backdrop:blur-xl md:flex-row'>
                <section className='absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-pink-300 to-[#0055D1] rounded-md filter blur-3xl opacity-50 -z-50' />
                <Image
                    src={trello}
                    alt='Trello Logo'
                    width={300}
                    height={100}
                    className='object-contain pb-10 w-44 md:w-36 md:pb-0'
                />
                <div className='flex items-center justify-end flex-1 w-full gap-5'>
                    {/* Search Box */}
                    <form className='flex items-center flex-1 p-2 space-x-1 bg-white rounded-md shadow-md md:flex-initial'>
                        <MagnifyingGlassIcon className='w-6 h-6 text-gray-400' />
                        <input
                            type='text'
                            placeholder='Search'
                            value={searchString}
                            onChange={(e) => setSearchString(e.target.value)}
                            className='flex-1 p-2 text-sm outline-none'
                        />
                        <button type='submit' hidden>
                            Search
                        </button>
                    </form>

                    {/* Avatar */}
                    <Avatar
                        name='Luigi Lupini'
                        size='50'
                        round={true}
                        color='#0055D1'
                    />
                </div>
            </div>

            {/* AI Suggestion Box */}
            <div className='flex items-center justify-center px-5 py-2 md:py-5'>
                <p className='flex items-center text-sm font-light pr-5 shadow-xl rounded-xl w-fit bg-white max-w-3xl text-[#0055D1] py-4 px-5'>
                    {/* <UserCircleIcon /> */}
                    <Image
                        src='chatgpt-icon.svg'
                        width={40}
                        height={40}
                        priority
                        alt='chatgpt'
                        className={`inline-block w-10 h-10 mr-3 text-[#0055D1] rounded-full transition-all duration-300 ${
                            loading && 'animate-spin p-1'
                        }`}
                    />
                    {suggestion && !loading
                        ? suggestion
                        : 'OpenAI is summarizing your tasks for you!'}
                </p>
            </div>
        </header>
    );
}
