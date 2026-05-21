import React from 'react';
import { LuMapPin, LuUsers, LuClock } from "react-icons/lu"; // ✅ added LuUsers, LuClock
import Image from "next/image";
import { Button, Card } from "@heroui/react";
import Link from "next/link";

const AvailableRooms = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/available-rooms`);
  const rooms = await response.json();
  console.log("Fetched rooms:", rooms);

  return (
    <div className="mt-10 max-w-7xl mx-auto mb-16">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-1">Available Rooms</h1>
          <p className="text-lg text-gray-600 dark:text-white">
             Find the perfect space for solo study, group sessions, or team meetings ! 
        
          </p>
        </div>
        {/* <Link href="/rooms" className="text-blue-500 hover:underline">
          <Button
            variant="outline"
            size="lg"
            className="rounded-none border-2 text-white bg-blue-600 border-blue-500 hover:bg-blue-700 hover:text-white"
          >
            View Details
          </Button>
        </Link> */}
      </div>

      <Card className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 shadow border mt-6">
        {rooms.map((room) => {

          // Destructure inside map so each room gets its own values
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
          } = room;

          // ✅ amenitiesArray after amenities is defined
          const amenitiesArray = Array.isArray(amenities)
            ? amenities
            : typeof amenities === "string"
            ? amenities.split(",").filter(Boolean)
            : [];

          return (
            <div
              key={_id}
              className="border border-gray-300 text-gray-700 dark:border-gray-700 rounded-2xl shadow-md overflow-hidden bg-white dark:bg-gray-900 hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image */}
              <div className="relative w-full h-52">
                <Image
                  src={imageUrl}
                  alt={roomName}
                  fill
                  className="object-cover"
                />
                <span className="absolute top-3 left-3 bg-olive-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {roomType}
                </span>
                <span className="absolute top-3 right-3 bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow">
                  ${hourlyRate}/hr
                </span>
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                  {roomName}
                </h2>

                <div className="flex items-center gap-1 text-gray-600 text-sm dark:text-white">
                  <LuMapPin className="w-4 h-4" />
                  <span>{floor} Floor</span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-white">
                  <div className="flex items-center gap-1">
                    <LuUsers className="w-4 h-4" /> {/* ✅ now imported */}
                    <span>{capacity} people</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <LuClock className="w-4 h-4" /> {/* ✅ now imported */}
                    <span>{availableFrom} – {availableUntil}</span>
                  </div>
                </div>

                {/* Amenities */}
                {amenitiesArray.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {amenitiesArray.slice(0, 3).map((amenity) => (
                      <span
                        key={amenity}
                        className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-2 py-1 rounded-xl"
                      >
                        {amenity}
                      </span>
                    ))}
                    {amenitiesArray.length > 3 && ( // ✅ fixed from > 2 to > 3
                      <span className="text-xs bg-gray-100 text-gray-600 dark:text-white px-2 py-1 rounded-full">
                        +{amenitiesArray.length - 3} more
                      </span>
                    )}
                  </div>
                )}

                <div className="border-t border-gray-100 dark:border-gray-700 pt-3">
                  <Link href={`/rooms/${_id}`}>
                    <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-semibold transition-colors">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </Card>
    </div>
  );
};

export default AvailableRooms;