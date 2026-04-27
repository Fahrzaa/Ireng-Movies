import Image from 'next/image';
import Link from 'next/link';

interface CardProps {
    image: string;
    title: string;
    description: string;
    idMovie: string;
    category?: string;
}

const CardMovie = ({ idMovie, image, title, description, category }: CardProps) => {
    return (
        <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 transition-all duration-300 hover:border-zinc-700 hover:shadow-2xl hover:shadow-blue-500/10 w-80 h-100">

            <div className="aspect-video w-full overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    width={400}
                    height={225}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
            </div>

            <div className="flex flex-1 flex-col p-5">
                {category && (
                    <span className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-500">
                        {category}
                    </span>
                )}

                <h3 className="mb-2 text-xl font-bold text-zinc-100 transition-colors group-hover:text-white">
                    {title}
                </h3>

                <p className="mb-6 line-clamp-2 text-sm leading-relaxed text-zinc-400">
                    {description}
                </p>

                <div className="mt-auto">
                    <Link href={`/detail/${idMovie}`} className="inline-flex items-center justify-center gap-2 rounded-lg bg-zinc-100 px-4 py-2.5 text-sm font-medium text-zinc-950 transition-all duration-200 hover:bg-white hover:ring-4 hover:ring-white/10 active:scale-95">
                        Detail Selengkapnya
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CardMovie;