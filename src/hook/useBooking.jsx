"use client";

import { useState } from "react";
import { toast } from "react-toastify";


const useBooking = (room,user) => {
  const { id, roomName, hourlyRate, availableFrom, availableUntil } = room;

  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState("");

  // Convert "HH:MM" to minutes
  const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  // Calculate total hours
  const calculateHours = () => {
    if (!startTime || !endTime) return 0;
    const diff = timeToMinutes(endTime) - timeToMinutes(startTime);
    return diff > 0 ? diff / 60 : 0;
  };

  const totalHours = calculateHours();
  const totalCost = totalHours * hourlyRate;

  // Validate booking time against room availability
  const validateBooking = () => {
    setError("");

    if (!date) {
      setError("Please select a date.");
      return false;
    }

    if (!startTime || !endTime) {
      setError("Please select start and end time.");
      return false;
    }

    if (timeToMinutes(endTime) <= timeToMinutes(startTime)) {
      setError("End time must be after start time.");
      return false;
    }

    const roomStart = timeToMinutes(availableFrom);
    const roomEnd = timeToMinutes(availableUntil);
    const bookStart = timeToMinutes(startTime);
    const bookEnd = timeToMinutes(endTime);

    if (bookStart < roomStart || bookEnd > roomEnd) {
      setError(`Room is only available between ${availableFrom} – ${availableUntil}.`);
      return false;
    }

    return true;
  };

  // Handle booking submission
  const handleBooking = async () => {
    if (!validateBooking()) return;

    const bookingData = {

      userId: user?.id || "anonymous", // Use user ID if available, otherwise "anonymous" 
      userName: user?.name || "Anonymous User",
      userEmail: user?.email || "No email provided",
      userImage: user?.image || null,
      roomId: id,
      imageUrl: room.imageUrl || null,
      roomName: roomName,
      date: date,
      startTime: startTime,
      endTime: endTime,
      totalHours: totalHours,
      totalCost: totalCost,
    };
    console.log("Booking data to send:", bookingData);
    try {
      const response = await fetch("http://localhost:5002/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        toast.error("Booking failed. Please try again.");
        return;
      }

      const data = await response.json();
      toast.success("Room booked successfully!");
      console.log("Booking confirmed:", data);

    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Something went wrong on booking.");
    }
  };

  return {
    date, setDate,
    startTime, setStartTime,
    endTime, setEndTime,
    error,
    totalHours,
    totalCost,
    handleBooking,
  };
};

export default useBooking;