"use client"
import api from '@/api/api'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import YouTube from 'react-youtube'
import { FaPlay, FaStar, FaCalendarAlt, FaFire, FaExternalLinkAlt } from 'react-icons/fa'
import { SiNetflix } from 'react-icons/si'
import { IoArrowBack } from 'react-icons/io5'
import Link from 'next/link'
interface Video {
    type: string;
    key: string;
}

interface Genre {
    id: number;
    name: string;
}

interface MovieData {
    id: number;
    title: string;
    backdrop_path: string;
    poster_path: string;
    status: string;
    runtime: number;
    tagline: string;
    vote_average: number;
    release_date: string;
    popularity: number;
    overview: string;
    homepage: string;
    genres: Genre[];
    videos: {
        results: Video[];
    };
}

export default function Page() {
    const [loading, setLoading] = useState<boolean>(true)
    const param = useParams()
    const [data, setData] = useState<MovieData | null>(null)
    const [showTrailer, setShowTrailer] = useState<boolean>(false)
    useEffect(() => {
        const fetching = async () => {
            try {
                setLoading(true)
                const res = await api.get(`/movie/${param.id}?append_to_response=videos,credits`);
                setData(res.data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        if (param.id) fetching()
    }, [param.id])

    if (loading) return (
        <div className='h-screen bg-black flex flex-col items-center justify-center'>
            <div className='w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin'></div>
            <p className='text-white mt-4 font-medium animate-pulse'>PREPARING YOUR VERDICT...</p>
        </div>
    )
    if (!data) return <div className='h-screen bg-black flex items-center justify-center text-white'>Movie not found.</div>
    const trailer = data.videos?.results?.find((vid: Video) => vid.type === "Trailer") || data.videos?.results[0];
    const genres = data.genres?.map((g: Genre) => g.name).join(", ");

    return (
        <div className="relative min-h-screen bg-[#000000] text-white overflow-x-hidden font-sans">
            <div className="absolute inset-0 h-[70vh] w-full z-0">
                <img
                    src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
                    className="w-full h-full object-cover opacity-30"
                    alt="backdrop"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#000000]/80 to-[#000000]"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#000000] via-transparent to-transparent"></div>
            </div>

            <nav className="relative z-20 p-6 lg:px-12 flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-all group">
                    <IoArrowBack className="group-hover:-translate-x-1 transition-transform" /> BACK TO EXPLORE
                </Link>
                <div className="flex items-center gap-2">
                    <img src="/icon.png" className="h-8" alt="logo" />
                    <span className="font-bold tracking-tighter text-xl">IRENG<span className="text-red-600">LIST</span></span>
                </div>
            </nav>

            <main className="relative z-10 container mx-auto px-6 lg:px-12 py-8 lg:py-16">
                <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-start">
                    <div className="flex-1 space-y-6 animate-fade-in-left">
                        <div className="space-y-2">
                            <span className="text-red-600 font-bold tracking-[0.2em] text-sm uppercase animate-pulse">
                                {data.status} • {data.runtime} MIN
                            </span>
                            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-none">
                                {data.title.toUpperCase()}
                            </h1>
                            {data.tagline && <p className="text-xl text-gray-400 italic font-light">"{data.tagline}"</p>}
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm font-medium">
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/5">
                                <FaStar className="text-yellow-500" /> {data.vote_average.toFixed(1)} / 10
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/5">
                                <FaCalendarAlt className="text-red-500" /> {data.release_date.split('-')[0]}
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/5">
                                <FaFire className="text-orange-500" /> {Math.round(data.popularity)}
                            </div>
                        </div>

                        <div className="space-y-1">
                            <span className="text-gray-500 uppercase text-xs block tracking-widest">GENRES</span>
                            <p className="text-gray-300 font-medium">{genres}</p>
                        </div>

                        <div className="space-y-3">
                            <span className="text-gray-500 uppercase text-xs block tracking-widest">STORYLINE</span>
                            <p className="text-gray-300 leading-relaxed text-lg max-w-2xl">
                                {data.overview}
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-3">
                            <button
                                onClick={() => setShowTrailer(true)}
                                className="flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white md:px-14 px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105 active:scale-95 shadow-xl"
                            >
                                <FaPlay /> WATCH TRAILER
                            </button>

                            <Link
                                href={data.homepage || `https://www.netflix.com/search?q=${data.title}`}
                                target="_blank"
                                className="flex items-center justify-center gap-3 bg-white hover:bg-gray-200 text-black px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105 active:scale-95"
                            >
                                <SiNetflix className="text-red-600 text-xl" /> VIEW ON NETFLIX <FaExternalLinkAlt className="text-xs" />
                            </Link>
                        </div>
                    </div>

                    <div className="w-full ml-0 md:ml-35 max-w-[400px] lg:w-[450px] group animate-fade-in-right">
                        <div className="relative group transition-all duration-500">
                            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                            <div className="relative aspect-[2/3] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    alt={data.title}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {showTrailer && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm animate-fade-in">
                    <div className="relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(220,38,38,0.3)]">
                        <button
                            onClick={() => setShowTrailer(false)}
                            className="absolute top-4 right-4 z-[110] bg-white text-black w-10 h-10 rounded-full flex items-center justify-center font-bold hover:bg-red-600 hover:text-white transition-colors"
                        >
                            ✕
                        </button>
                        <YouTube
                            videoId={trailer?.key}
                            opts={{ height: '100%', width: '100%', playerVars: { autoplay: 1 } }}
                            className="w-full h-full"
                        />
                    </div>
                </div>
            )}

            <style jsx global>{`
                @keyframes fade-in-left { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }
                @keyframes fade-in-right { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }
                @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
                .animate-fade-in-left { animation: fade-in-left 0.8s ease-out forwards; }
                .animate-fade-in-right { animation: fade-in-right 0.8s ease-out forwards; }
                .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
            `}</style>
        </div>
    )
}
