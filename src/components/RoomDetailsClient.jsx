"use client";

import BookingCard from "@/components/BookingCard";
import useBooking from "@/hook/useBooking";
import Image from "next/image";
import { LuMapPin, LuUsers, LuClock } from "react-icons/lu";
import { FaRegCalendar } from "react-icons/fa";
import { Button, Spinner } from "@heroui/react";
import { Delete } from "lucide-react";
import { DeleteRoomBookingByAlert } from "./shared/DeleteRoomBookingByAlert";
import { EditRoomInfoByModal } from "./shared/EditRoomInfoByModal";
import LoadingPage from "@/app/LoadingPage";

const RoomDetailsClient = ({ room }) => {

  // ✅ Guard check
  if (!room) return <LoadingPage />;
  
  const {
    _id, imageUrl, roomName, roomType, floor,
    availableFrom, availableUntil,
    capacity, hourlyRate, description,
  } = room;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* Hero Section */}
      <div className="relative w-full h-100 rounded-3xl overflow-hidden">
        <Image
          src={imageUrl || '/placeholder.jpg'}
          alt={roomName || 'Room'}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-end">
          <div className="p-8 text-white">
            <div className="flex items-center gap-2 mb-2">
              <LuMapPin />
              <span>{roomType}</span>
              <span>•</span>
              <span>{floor}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">{roomName}</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10 border-2 border-gray-300 dark:border-gray-700 rounded-2xl p-6">

        {/* Left Side */}
        <div className="lg:col-span-2 space-y-6">

          {/* Description */}
          <div className="bg-white border-2 border-gray-300 dark:bg-gray-900 shadow-md rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
              About Study Room Booking Confirmation Details
            </h2>

          </div>

          {/* Room Info */}
          <div className="bg-white border-2 border-gray-300 dark:bg-gray-900 shadow-md rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-8">
              {description}
            </p>
          </div>

          {/* Room Info */}
          <div className="bg-white border-2 border-gray-300 dark:bg-gray-900 shadow-md rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
              Room Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <LuClock className="text-olive-600 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-400">Available Hours</p>
                  <p className="font-medium">{availableFrom} – {availableUntil}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <LuUsers className="text-olive-600 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-400">Capacity</p>
                  <p className="font-medium">{capacity} people</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <LuMapPin className="text-olive-600 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-400">Location</p>
                  <p className="font-medium">{floor}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <FaRegCalendar className="text-olive-600 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-400">Hourly Rate</p>
                  <p className="font-medium">${hourlyRate} / hr</p>
                </div>
              </div>
            </div>
       
          </div>
               {/* <div className=" flex justify-center items-center gap-3 mt-6">
                <EditRoomInfoByModal room={room} />

                <DeleteRoomBookingByAlert room={room}/>
            </div> */}
        </div>

        {/* Right Side — ✅ Pass full room object */}
        <div>
          <BookingCard room={room} />
        </div>
      </div>
    </div>
  );
};

export default RoomDetailsClient;