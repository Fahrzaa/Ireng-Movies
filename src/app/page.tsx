"use client"

import api from "@/api/api";
import CardMovie from "@/components/CardMovie";
import MovieSlider from "@/components/MovieSlider";
import SearchModal from "@/components/SearchModal";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsArrowDown, BsArrowUpCircle } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";

export default function Home() {

  const [modal, setModal] = useState(false)
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [upcomingDate, setUpcomingDate] = useState([]);
  const [loading, setLoading] = useState(true);
  const gtwProps = {
    popular: "Popular Movies",
    rated: "Top Rated Movies",
    tv: "TV Movies",
  }
  useEffect(() => {
    const fetching = async () => {
      setLoading(true);
      try {
        const [resPopular, resTopRated, resUpcoming] = await Promise.all([
          api.get("/movie/popular"),
          api.get("/movie/top_rated"),
          api.get("/tv/popular")
        ]);

        setPopular(resPopular.data)
        setTopRated(resTopRated.data)
        setUpcoming(resUpcoming.data)
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetching();
  }, []);
  return (
    <>
      <div
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.46) 0%, rgb(1, 1, 1) 60%), url('/jir.jpg')`
        }}
        className="flex items-center flex-col gap-5 bg-black/60 bg-blend-multipy bg-[url('/jir.jpg')] bg-center bg-cover h-screen w-full sm:px-10 px-3">

        {modal ? < SearchModal isOpen={modal} onClose={() => setModal(!modal)} /> : ""}

        <div className='flex items-center justify-between w-full p-4 px-5'>
          <div className="flex items-center">
            <img src="./icon.png" className="h-8 md:h-12" alt="" /> <h1 className='text-lg md:text-2xl tracking-tighter font-extrabold font-sm' >IRENG<span className='text-red-600 font-bold'>MOVIES</span> </h1>
          </div>

          <button onClick={() => {
            setModal(!modal)
          }} className="flex items-center rounded-full gap-2 hover:scale-107 transition-all tracking-tight rounded-lg bg-red-600 px-4 py-2 duration-300 hover:gap-3 text-sm md:text-md font-bold">SEARCH < FaSearch /></button>

        </div>

        <div id="cihuy1" className="flex px-5 pt-6 flex-col justify-start w-full">
          <span className="font-playfair italic mb[-19px]">EXPLORE ANY MOVIES</span>
          <h1 className="text-7xl tracking-tighter font-extrabold">FINAL <span className="text-red-600 underline">VERDICT</span></h1>
          <span className="max-w-200 mt-4 mb-2">This website was meticulously crafted as a professional portfolio and a dedicated learning space to explore modern web technologies. Built with passion and continuous growth by : <Link href={"https://www.instagram.com/fahrezachill"} className="text-blue-500 font-bold underline hover:text-blue-600">-Rezaa.</Link></span>
        </div>

        <div className="w-full no-scrollbar">
          <h1 className="flex justify-end mb-6 px-3">

          </h1>
          < MovieSlider cuyProps={gtwProps.popular} data={popular} loading={loading} />
        </div>
        <div className="w-full no-scrollbar">
          < MovieSlider cuyProps={gtwProps.rated} data={topRated} loading={loading} />
        </div>
        <div className="w-full no-scrollbar">
          < MovieSlider data={upcoming} cuyProps={gtwProps.tv} date={upcomingDate} loading={loading} />
        </div>
        <div className="flex w-full p-15 justify-center items-center">
          <a onClick={handleScroll} href="#cihuy1">< BsArrowUpCircle size={"40"} className="animate-bounce" /></a>
        </div>
      </div>
    </>
  );
}
