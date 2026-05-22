import { Separator } from "@heroui/react";
import Link from "next/link";

const Banner = () => {
  return (
    <div className="bg-[url('/banner.png')] bg-no-repeat bg-cover bg-center text-white  flex justify-between flex-col items-center  gap-5 h-150">
      <div className="p-10 text-center flex justify-center flex-col items-center gap-3.5 flex-1">
        <h1  className="text-7xl text-blue-500 font-bold">
          Find Your Perfect<span className="text-7xl text-red-500 font-bold"> Study Room</span> 
        </h1>

        <p className="text-2xl">
          Browse and book quiet, private study rooms in your library. List your own room and earn.
        </p>

        <div className="flex gap-5">
         <Link href={"/rooms"}>
        <button className="uppercase bg-blue-400 px-5 py-3 cursor-pointer">
            Explore Room
          </button>
         </Link>

          {/* <button className="uppercase px-5 py-3 bg-white/50 cursor-pointer">
            View Destination
          </button> */}
        </div>
      </div>


    </div>
  );
};

export default Banner;