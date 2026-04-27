"use client"
import React, { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { FiSearch } from 'react-icons/fi';
import api from '@/api/api'; // Pastikan path api lo bener
import Link from 'next/link';

export default function SearchModal({ onClose, isOpen }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const searchMovies = async () => {
            if (searchTerm.length < 3) {
                setResults([]);
                return;
            }

            setLoading(true);
            try {
                const res = await api.get(`/search/movie?query=${searchTerm}`);
                setResults(res.data.results || []);
            } catch (err) {
                console.error("Search error:", err);
            } finally {
                setLoading(false);
            }
        };

        // DEBOUNCING: Nunggu user berenti ngetik 500ms baru fetch
        const delayDebounceFn = setTimeout(() => {
            searchMovies();
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[999] flex justify-center items-start pt-[10vh] px-4 overflow-y-auto animate-fade-in"
            onClick={onClose}
        >
            <div
                className="bg-zinc-950 border border-zinc-800 w-full max-w-3xl rounded-2xl shadow-2xl p-6 relative animate-fade-in-down"
                onClick={(e) => e.stopPropagation()}
            >
                {/* HEADER */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-zinc-100 tracking-tight">Search <span className='text-red-600'>Movies</span></h2>
                    <button onClick={onClose} className="p-2 rounded-full text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors">
                        <IoClose size={24} />
                    </button>
                </div>

                {/* INPUT SEARCH */}
                <div className="relative mb-8">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
                    <input
                        type="text"
                        placeholder="Search Avatar, Oppenheimer, etc..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-700 text-white pl-12 pr-6 py-4 rounded-xl text-lg focus:ring-2 focus:ring-red-600 outline-none placeholder:text-zinc-600 transition-all"
                        autoFocus
                    />
                    {loading && <div className='absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin'></div>}
                </div>

                {/* HASIL PENCARIAN */}
                <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                    {results.length > 0 ? (
                        results.map((movie) => (
                            <Link
                                href={`/detail/${movie.id}`}
                                key={movie.id}
                                onClick={onClose} // Tutup modal pas pindah halaman
                                className="grid grid-cols-12 gap-4 items-center bg-zinc-900/40 hover:bg-zinc-900 border border-zinc-800/50 hover:border-red-600/50 p-3 rounded-xl cursor-pointer transition-all group"
                            >
                                {/* Poster Kecil */}
                                <div className="col-span-2 md:col-span-1 aspect-[2/3] bg-zinc-800 rounded-md overflow-hidden">
                                    {movie.poster_path && (
                                        <img
                                            src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                                            alt={movie.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                        />
                                    )}
                                </div>

                                {/* Judul & Info */}
                                <div className="col-span-7 md:col-span-8">
                                    <h4 className="font-semibold text-zinc-100 group-hover:text-red-500 transition-colors truncate">{movie.title}</h4>
                                    <p className="text-xs text-zinc-500">{movie.release_date?.split('-')[0] || 'N/A'}</p>
                                </div>

                                {/* Rating */}
                                <div className="col-span-3 md:col-span-3 text-right">
                                    <span className="inline-flex items-center gap-1 text-yellow-500 text-sm font-bold bg-yellow-500/10 px-2 py-1 rounded-lg">
                                        ⭐ {movie.vote_average?.toFixed(1)}
                                    </span>
                                </div>
                            </Link>
                        ))
                    ) : (
                        searchTerm.length >= 3 && !loading && (
                            <div className='text-center py-10 text-zinc-600'>
                                No movies found for "{searchTerm}"
                            </div>
                        )
                    )}

                    {searchTerm.length < 3 && (
                        <div className='text-center py-10 text-zinc-700 italic text-sm'>
                            Start typing at least 3 characters...
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}