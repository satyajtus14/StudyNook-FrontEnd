"use client";

import useBooking from "@/hook/useBooking"; // ✅ import hook here only
import { LuClock } from "react-icons/lu";

const BookingCard = ({ room }) => {

  // ✅ Guard check before anything else
  if (!room) return <p className="text-center text-gray-500">Loading...</p>;

  const { roomName, hourlyRate, availableFrom, availableUntil } = room;

  // ✅ All state and logic comes from useBooking
  const {
    date, setDate,
    startTime, setStartTime,
    endTime, setEndTime,
    totalHours, totalCost,
    error,
    handleBooking
  } = useBooking(room);

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-6 sticky top-24 space-y-5">

      {/* Price Header */}
      <div className="flex items-end gap-1">
        <span className="text-3xl font-bold text-gray-800 dark:text-white">
          ${hourlyRate}
        </span>
        <span className="text-gray-500 dark:text-gray-400 mb-1">/ hour</span>
      </div>

      {/* Availability Info */}
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-xl px-4 py-3">
        <LuClock className="text-olive-600 flex-shrink-0" />
        <span>Available: <strong>{availableFrom} – {availableUntil}</strong></span>
      </div>

      {/* Date Picker */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Select Date
        </label>
        <input
          type="date"
          value={date}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => setDate(e.target.value)} // ✅ now defined
          className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 bg-white dark:bg-gray-800 dark:text-white outline-none focus:border-olive-500 transition-colors"
        />
      </div>

      {/* Time Pickers */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Start Time
          </label>
          <input
            type="time"
            value={startTime}
            min={availableFrom}
            max={availableUntil}
            onChange={(e) => setStartTime(e.target.value)} // ✅ now defined
            className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 bg-white dark:bg-gray-800 dark:text-white outline-none focus:border-olive-500 transition-colors"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            End Time
          </label>
          <input
            type="time"
            value={endTime}
            min={startTime || availableFrom}
            max={availableUntil}
            onChange={(e) => setEndTime(e.target.value)} // ✅ now defined
            className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 bg-white dark:bg-gray-800 dark:text-white outline-none focus:border-olive-500 transition-colors"
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-sm bg-red-50 dark:bg-red-900/20 px-4 py-3 rounded-xl">
          {error}
        </p>
      )}

      {/* Cost Breakdown */}
      {totalHours > 0 && (
        <div className="bg-olive-50 dark:bg-olive-900/20 border border-olive-200 dark:border-olive-700 rounded-xl p-4 space-y-2">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>${hourlyRate} × {totalHours.toFixed(1)} hrs</span>
            <span>${totalCost.toFixed(2)}</span>
          </div>
          <div className="border-t border-olive-200 dark:border-olive-700 pt-2 flex justify-between font-bold text-gray-800 dark:text-white">
            <span>Total</span>
            <span>${totalCost.toFixed(2)}</span>
          </div>
        </div>
      )}

      {/* Book Button */}
      <button
        onClick={handleBooking}
        className="w-full bg-olive-600 hover:bg-olive-700 active:scale-[0.99] text-white font-semibold py-4 rounded-xl transition-all text-lg shadow-md"
      >
        Book Now
      </button>

      <p className="text-xs text-center text-gray-400">
        You won't be charged yet
      </p>
    </div>
  );
};

export default BookingCard;