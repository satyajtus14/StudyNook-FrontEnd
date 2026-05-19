import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaRegCalendar } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { LuMapPin, LuUsers, LuClock } from "react-icons/lu";

const RoomCards = ({ roomInfo }) => {
  const {
    _id,
    imageUrl,
    roomName,
    roomType,
    floor,
    availableFrom,
    availableUntil,
    capacity,
    hourlyRate,
    amenities = [],
  } = roomInfo;

  const amenitiesArray = Array.isArray(amenities)
  ? amenities
  : typeof amenities === "string"
  ? amenities.split(",").filter(Boolean)
  : [];

  return (
    <div className="border border-gray-300 dark:border-gray-700 rounded-2xl shadow-md overflow-hidden bg-white dark:bg-gray-900 hover:shadow-xl transition-shadow duration-300">

      {/* Image */}
      <div className="relative w-full h-52">
        <Image
          src={imageUrl}
          alt={roomName}
          fill
          className="object-cover"
        />
        {/* Room Type Badge */}
        <span className="absolute top-3 left-3 bg-olive-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
          {roomType}
        </span>
        {/* Price Badge */}
        <span className="absolute top-3 right-3 bg-green-500 dark:bg-green-600 text-white dark:text-white text-sm font-bold px-3 py-1 rounded-full shadow">
          ${hourlyRate}/hr
        </span>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">

        {/* Room Name */}
        <h2 className="text-lg font-bold text-gray-800 dark:text-white leading-tight">
          {roomName}
        </h2>

        {/* Floor */}
        <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm">
          <LuMapPin className="w-4 h-4 flex-shrink-0" />
          <span>{floor} Floor</span>
        </div>

        {/* Capacity + Availability */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <LuUsers className="w-4 h-4" />
            <span>{capacity} people</span>
          </div>
          <div className="flex items-center gap-1">
            <LuClock className="w-4 h-4" />
            <span>{availableFrom} – {availableUntil}</span>
          </div>
        </div>

        {/* Amenities */}
        {amenitiesArray.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {amenitiesArray.slice(0, 3).map((amenity) => (
              <span
                key={amenity}
                className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full"
              >
                {amenity}
              </span>
            ))}
            {amenitiesArray.length > 2 && (
              <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-2 py-1 rounded-full">
                +{amenitiesArray.length - 2} more
              </span>
            )}
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-gray-100 dark:border-gray-700 pt-3">
          <Link href={`/rooms/${_id}`}>
            <Button className="w-full bg-olive-600 hover:bg-olive-700 text-white rounded-xl font-semibold transition-colors">
              Book Now <FiExternalLink className="ml-1" />
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default RoomCards;