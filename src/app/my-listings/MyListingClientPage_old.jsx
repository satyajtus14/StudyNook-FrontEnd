"use client";

import { authClient } from "@/lib/auth-client"; // adjust path
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaRegCalendar } from "react-icons/fa";
import { IoCaretBack } from "react-icons/io5";
import { LuClock, LuHash, LuMapPin, LuUsers } from "react-icons/lu";
import { SlCalender } from "react-icons/sl";
import LoadingPage from "../LoadingPage";
import { EditRoomInfoByModal } from "@/components/shared/EditRoomInfoByModal";
import { DeleteRoomBookingByAlert } from "@/components/shared/DeleteRoomBookingByAlert";

const MyListingClientPage = ({ initialListings = [] }) => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [listings, setListings] = useState(initialListings);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isPending) return;

    console.log("user:", user);
    console.log("user.id:", user?.id);

    if (!user?.id) {
      setLoading(false);
      return;
    }

    const fetchListings = async () => {
      console.log("user object:", user); // 👈 add this
      console.log("user.id:", user?.id);
      console.log("user._id:", user?._id);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/listings?userId=${user.id}`,
        );

        if (!res.ok) {
          setError("Failed to load listings.");
          return;
        }

        const data = await res.json();
        setListings(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [user?.id, isPending]); // ✅ use user?.id not entire user object

  if (isPending || loading) return <LoadingPage />;

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <p className="text-center text-red-400 py-20">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-white">
        My Listings
      </h1>
      <p className="text-gray-400 mt-1 mb-8 text-sm sm:text-base">
        Manage and view your listed rooms
      </p>

      {/* Empty state */}
      {listings.length === 0 && (
        <p className="text-center text-gray-400 py-20">
          You have no listings yet.{" "}
          <Link href="/add-room" className="text-indigo-500 underline">
            Add a room
          </Link>
        </p>
      )}

      {/* Listing Cards */}
      <div className="flex flex-col gap-4">
        {listings.map((listing) => (
          <div
            key={listing._id}
            className="flex flex-col sm:flex-row border-2 border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm bg-white dark:bg-gray-900"
          >
            {/* Left — Room Image */}
            {listing.imageUrl ? (
              <Image
                src={listing.imageUrl}
                alt={listing.roomName}
                width={200}
                height={160}
                className="object-cover w-full sm:w-[200px] h-48 sm:h-auto shrink-0"
              />
            ) : (
              <div className="w-full sm:w-[200px] h-48 sm:h-auto bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0">
                <span className="text-gray-400 text-sm">No image</span>
              </div>
            )}

            {/* Right — Listing Details */}
            <div className="flex flex-col justify-between w-full p-5">
              <div>
                {/* Room Name */}
                <Link href={`/rooms/${listing._id}`}>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-2 hover:underline">
                    {listing.roomName}
                  </h2>
                </Link>

                {/* Room Type */}
                <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-2">
                  <LuMapPin /> {listing.roomType}
                </p>

                {/* Date */}
                <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-2 mt-1">
                  <SlCalender /> Listed:{" "}
                  {listing.date ||
                    new Date(listing.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                </p>

                {/* Available Hours */}
                <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-2 mt-1">
                  <LuClock />
                  {listing.availableFrom} – {listing.availableUntil}
                </p>

                {/* Listing ID */}
                <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-2 mt-1">
                  <LuHash /> Listing ID: {listing._id?.slice(0, 8)}
                </p>
              </div>

              {/* Hourly Rate + Actions */}
              <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
                <span className="text-2xl font-bold text-orange-700">
                  ${listing.hourlyRate}/hr
                </span>
                <div className=" flex justify-center items-center gap-3 mt-6">
                  {/* <CancelBookingItem listingId={listing._id} /> */}
                  <EditRoomInfoByModal room={listing}/>

                  <DeleteRoomBookingByAlert room={listing} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Back Button */}
      <div className="flex justify-end mb-6 gap-4 mt-5">
        <Link href="/rooms">
          <button className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
            <IoCaretBack /> Back to Rooms
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MyListingClientPage;
