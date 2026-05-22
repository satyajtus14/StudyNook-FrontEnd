"use client"; // ✅ authClient.useSession() needs this

import React from "react";
import { SlCalender } from "react-icons/sl";
import { LuClock, LuHash } from "react-icons/lu";
import { CancelBookingItem } from "@/components/shared/CancelBookingItem";
import Image from "next/image";

import { useEffect, useState } from "react";
import Link from "next/link";
import LoadingPage from "../LoadingPage";
import { IoCaretBack } from "react-icons/io5";
import { authClient, getAuthToken } from "@/lib/auth-client";



const MyBookingsClientPage = ({ initialBookings = [] }) => {
  const { data: session, isPending } = authClient.useSession(); // ✅ correct client-side way
  const user = session?.user;

  const [bookings, setBookings] = useState(initialBookings);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isPending) return; //  wait for session to finish loading

    // Only fetch when user is available
    if (!user?.id) {
      setLoading(false); // no user = stop loading, show empty state
      return;
    }

    

   const fetchBookings = async () => {
 
    try {
          const token = await getAuthToken(); // ✅ get token
              console.log("Token:", token);

        const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings?userId=${user.id}`, // ✅ /bookings not /listings
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ send token
            "Content-Type": "application/json",
          },
        }
      );

    if (!res.ok) {
      setError("Failed to load bookings.");
      return;
    }

    const data = await res.json();
    setBookings(data);

  } catch (err) {
    console.error("Fetch error:", err);
    setError("Something went wrong.");
  } finally {
    setLoading(false); // ✅ always runs whether success, error, or early return
  }
};

    fetchBookings();
  }, [user?.id, isPending]); // re-runs when user loads

  // Loading state
  if (loading) {
    return <LoadingPage />;
  }

  // Error state
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
        My Bookings
      </h1>
      <p className="text-gray-700 mt-1 mb-8 text-sm sm:text-base dark:text-white">
        Manage and view your upcoming study plans
      </p>


      {/* Empty state */}
      {bookings.length === 0 && (
        <p className="text-center font-semibold text-3xl text-gray-700 py-20 dark:text-white">
          You have no study room booking yet.
        </p>
      )}

      {/* Booking Cards */}
      <div className="flex flex-col gap-4">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="flex flex-col sm:flex-row border-2 border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm bg-white dark:bg-gray-900"
          >
            {/* Left — Room Image */}
            {booking.imageUrl ? (
              <Image
                src={booking.imageUrl}
                alt={booking.roomName}
                width={200}
                height={160}
                className="object-cover w-full sm:w-[200px] h-48 sm:h-auto shrink-0"
              />
            ) : (
              <div className="w-full sm:w-[200px] h-48 sm:h-auto bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0">
                <span className="text-gray-400 text-sm">No image</span>
              </div>
            )}

            {/* Right — Booking Details */}
            <div className="flex flex-col justify-between w-full p-5">
              <div>
                {/* Status Badge */}
                <span
                  className={`inline-flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full mb-3
                    ${
                      booking.status === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-600"
                    }`}
                >
                  {booking.status === "confirmed"
                    ? "✓ Confirmed"
                    : "❌ Cancelled"}
                </span>

                {/* Room Name */}
                <Link href={`/rooms/${booking?._id}`}>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    {booking.roomName}
                  </h2>
                </Link>

                {/* Date */}
                <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-2">
                  <SlCalender /> Date: {booking.date}
                </p>

                {/* Time + Hours */}
                <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-2 mt-1">
                  <LuClock />
                  {booking.startTime} – {booking.endTime}
                  &nbsp;·&nbsp; {booking.totalHours} hrs
                </p>

                {/* Booking ID */}
                <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-2 mt-1">
                  <LuHash /> Booking ID: {booking._id?.slice(0, 8)}
                </p>
              </div>

              {/* Price + Action Buttons */}
              <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
                <span className="text-2xl font-bold text-orange-700">
                  ${booking.totalCost?.toFixed(2)}
                </span>

                <div className="flex gap-3">
                  <CancelBookingItem bookingId={booking._id} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
            <div className="flex justify-end mb-6 gap-4 mt-5">
        {/* Future: View Details button */}
        <Link href={`/rooms/`}>
          <button className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
            <IoCaretBack /> Back to Rooms
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MyBookingsClientPage;
