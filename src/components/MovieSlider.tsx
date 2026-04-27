"use client";
import { useRef } from "react";
import CardMovie from "./CardMovie";

export default function MovieSlider({ cuyProps, data, loading }: any) {
    const sliderRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (sliderRef.current) {
            const { clientWidth } = sliderRef.current;
            const scrollAmount = direction === "left" ? -clientWidth * 0.8 : clientWidth * 0.8;

            sliderRef.current.scrollBy({
                left: scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="relative group w-full max-w-[1400px] mx-auto overflow-hidden">
            <div className="flex justify-between items-center mb-4 px-4">
                <h2 className="text-2xl font-bold text-white">{cuyProps}</h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => scroll("left")}
                        className="p-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full transition shadow-md border border-zinc-700"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        className="p-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full transition shadow-md border border-zinc-700"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="flex gap-4 sm:gap-7 md:gap-12 px-4 overflow-hidden">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="min-w-[150px] md:min-w-[200px] aspect-[2/3] bg-zinc-800 animate-pulse rounded-lg" />
                    ))}
                </div>
            ) : (
                <div
                    ref={sliderRef}
                    style={{
                        msOverflowStyle: 'none',  /* IE and Edge */
                        scrollbarWidth: 'none',   /* Firefox */
                    }}
                    className="flex overflow-x-auto md:ml-0 ml-2 md:gap-28 gap-8 px-4 no-scrollbar scroll-smooth snap-x snap-mandatory pb-6"
                >
                    {data?.results?.map((d: any, i: number) => (
                        <div
                            key={d.id || i}
                            className="
                /* Responsif Sizing */
                min-w-[100%]       /* HP: 1.3 kartu */
                sm:min-w-[45%]    /* Tablet: 2.2 kartu */
                md:min-w-[30%]    /* Tablet Luas: 3.2 kartu */
                lg:min-w-[22%]    /* Laptop: 4.2 kartu */
                xl:min-w-[18.8%]  /* Desktop: Pas 5 kartu */
                snap-start
              "
                        >
                            <CardMovie
                                description={d.overview}
                                title={d.title || d.name}
                                idMovie={d.id}
                                image={`https://image.tmdb.org/t/p/w500${d.poster_path}`}
                                category={d.release_date?.split('-')[0]}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}