"use client";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaRegCalendar } from "react-icons/fa";
import { IoCaretBack } from "react-icons/io5";
import { LuClock, LuHash, LuMapPin, LuUsers } from "react-icons/lu";
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

    if (!user?.id) {
      setLoading(false);
      return;
    }

    const fetchListings = async () => {
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
  }, [user?.id, isPending]);

  if (isPending || loading) return <LoadingPage />;

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <p className="text-center text-red-400 py-20">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-white">
          My Listings
        </h1>
        <p className="text-gray-400 mt-1 text-sm sm:text-base">
          Manage and view your listed rooms
        </p>
      </div>

      {/* Empty State */}
      {listings.length === 0 && (
        <p className="text-center text-gray-400 py-20">
          You have no listings yet.{" "}
          <Link href="/add-room" className="text-indigo-500 underline">
            Add a room
          </Link>
        </p>
      )}

      {/* Listing Cards Grid — matches /rooms UI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {listings.map((listing) => (
          <div
            key={listing._id}
            className="flex flex-col rounded-2xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm bg-white dark:bg-gray-900 hover:shadow-md transition-shadow"
          >
            {/* Room Image */}
            <div className="relative w-full h-48 shrink-0">
              {/* Room Type Badge */}
              <span className="absolute top-3 left-3 z-10 bg-white/80 dark:bg-gray-900/80 text-gray-700 dark:text-gray-300 text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm">
                {listing.roomType}
              </span>

              {/* Hourly Rate Badge */}
              <span className="absolute top-3 right-3 z-10 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                ${listing.hourlyRate}/hr
              </span>

              {listing.imageUrl ? (
                <Image
                  src={listing.imageUrl}
                  alt={listing.roomName}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">No image</span>
                </div>
              )}
            </div>

            {/* Card Body */}
            <div className="flex flex-col flex-1 p-4 gap-3">
              
              {/* Room Name */}
              <Link href={`/rooms/${listing.roomId || listing._id}`}>
                <h2 className="text-base font-bold text-gray-800 dark:text-white hover:underline line-clamp-1">
                  {listing.roomName}
                </h2>
              </Link>

              {/* Floor */}
              <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1.5">
                <LuMapPin className="text-olive-600 shrink-0" />
                {listing.floor}
              </p>

              {/* Capacity */}
              <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1.5">
                <LuUsers className="text-olive-600 shrink-0" />
                {listing.capacity} people
              </p>

              {/* Available Hours */}
              <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1.5">
                <LuClock className="text-olive-600 shrink-0" />
                {listing.availableFrom} – {listing.availableUntil}
              </p>

              {/* Date Listed */}
              <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1.5">
                <FaRegCalendar className="text-olive-600 shrink-0" />
                {listing.date ||
                  (listing.createdAt &&
                    new Date(listing.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    }))}
              </p>

              {/* Listing ID */}
              <p className="text-gray-400 text-xs flex items-center gap-1.5">
                <LuHash className="shrink-0" />
                ID: {listing._id?.slice(0, 8)}
              </p>

              {/* Amenities */}
              {listing.amenities?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {listing.amenities.slice(0, 2).map((a) => (
                    <span
                      key={a}
                      className="text-xs border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-full"
                    >
                      {a}
                    </span>
                  ))}
                  {listing.amenities.length > 2 && (
                    <span className="text-xs text-gray-400 px-2 py-0.5">
                      +{listing.amenities.length - 2} more
                    </span>
                  )}
                </div>
              )}

              {/* Divider */}
              <hr className="border-gray-200 dark:border-gray-700 mt-1" />

              {/* ── User Info Section ── */}
              <div className="flex items-center gap-3">
                <p className="text-sm font-semibold text-gray-800 dark:text-white">Room Owner:</p>
                {listing.userImage ? (
                  <Image
                    src={listing.userImage}
                    alt={listing.userName}
                    width={36}
                    height={36}
                    className="rounded-full object-cover shrink-0 border-2 border-gray-200 dark:border-gray-700"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center shrink-0">
                    <span className="text-indigo-600 dark:text-indigo-300 text-sm font-bold">
                      {listing.userName?.charAt(0) || "?"}
                    </span>
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">
                    {listing.userName}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {listing.userEmail}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex gap-2 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 w-full">
                {/* <CancelBookingItem listingId={listing._id} /> */}
               
                  <EditRoomInfoByModal room={listing} />

                  <DeleteRoomBookingByAlert room={listing} />
                
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Back Button */}
      <div className="flex justify-end mt-8">
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
