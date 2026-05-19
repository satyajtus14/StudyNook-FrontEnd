import React from "react";
import ErrorPage from "./ErrorPage";


const RoomDetailsPage = async ({ params,error, reset }) => {
  const { id } = await params;

  console.log(id);

  const res = await fetch(`http://localhost:5002/rooms/${id}`);
  const roomData = await res.json();
  console.log(roomData);


    // ✅ Check if the request actually succeeded
  if (!res.ok) {
    // const error = new Error("Failed to fetch room data");
  return <ErrorPage error={error} reset={reset} />;  // Show error page if fetch failed
}

  // ✅ Check if destination data exists
  if (!roomData || !roomData._id) {
    return (
      <h2 className="font-bold text-xl md:text-4xl text-[#244d3f] text-center my-5">
        No Rooms Found!
      </h2>
    ); // if destination not found
  }

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


  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-bold mb-2">{roomData.name}</h2>
          <p className="text-gray-600 dark:text-gray-400">
            {roomData.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailsPage;
