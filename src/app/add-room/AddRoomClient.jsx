"use client";

import {
  Button,
  Card,
  FieldError,
  Input,
  Label,
  TextArea,
  TextField,
} from "@heroui/react";

import Image from "next/image";
import { redirect } from "next/navigation";
import React, { useState } from "react";
 import { toast } from 'react-toastify';

const inputClass =
  "w-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white shadow-sm px-4 py-3 outline-none hover:border-olive-400 focus:border-olive-500 transition-colors placeholder:text-gray-400 dark:placeholder:text-gray-500";

const AddRoomClient = () => {

const onSubmit = async (e) => {
  e.preventDefault();

  // Handle form submission logic here
  const formData = new FormData(e.currentTarget);
  const roomData = Object.fromEntries(formData.entries());

  roomData.amenities = amenities; // ✅ manually add amenities array

  console.log("Submitting:", roomData);
 
   
   const response = await fetch("http://localhost:5002/rooms", {
     method: "POST",
     headers: {
       "Content-Type": "application/json"
     },
     body: JSON.stringify(roomData)
   });      
     const data = await response.json();
     toast.success(data.message);
     redirect("/rooms"); // Redirect to the My Rooms page after successful submission
  };
  const [amenities, setAmenities] = useState([]);
  const [imageUrl, setImageUrl] = useState("");

  const amenitiesList = [
    "Whiteboard",
    "Projector",
    "Wi-Fi",
    "Power Outlets",
    "Quiet Zone",
    "Air Conditioning",
  ];

  return (
    <div className="max-w-7xl mx-auto bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 py-8 sm:py-10 px-4 sm:px-6 min-h-screen">
      <Card className="overflow-hidden rounded-3xl border-2 border-gray-300 dark:border-gray-700 shadow-xl bg-white dark:bg-gray-900">

        {/* Header */}
        <div className="border-b border-gray-100 dark:border-gray-700 px-5 sm:px-10 py-6 bg-gray-50 dark:bg-gray-800">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Add New Room
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 font-semibold">
            Fill in the details below to list your study room on StudyNook.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="p-5 sm:p-8 lg:p-10 space-y-10 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Room Name */}
            <div className="lg:col-span-2 space-y-2">
              <TextField name="roomName" isRequired>
                <Label className="text-gray-700 dark:text-gray-300">
                  Room Name
                </Label>
                <Input
                  placeholder="Silent Study Room "
                  className={inputClass}
                />
                <FieldError className="text-red-500 text-sm" />
              </TextField>
            </div>

            {/* Room Type */}
            <div className="space-y-2">
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Room Type
              </label>
              <select
                name="roomType"
                className={inputClass}
              >
                <option className="dark:bg-gray-800">Private Room</option>
                <option className="dark:bg-gray-800">Conference Room</option>
                <option className="dark:bg-gray-800">Quiet Study Space</option>
                <option className="dark:bg-gray-800">Group Study Room</option>
              </select>
            </div>

            {/* Floor */}
            <div className="space-y-2">
              <TextField name="floor" isRequired>
                <Label className="text-gray-700 dark:text-gray-300">
                  Floor
                </Label>
                <Input
                  placeholder="3rd Floor"
                  className={inputClass}
                />
                <FieldError className="text-red-500 text-sm" />
              </TextField>
            </div>

            {/* Capacity */}
            <div className="space-y-2">
              <TextField name="capacity" type="number" isRequired>
                <Label className="text-gray-700 dark:text-gray-300">
                  Capacity
                </Label>
                <Input
                  type="number"
                  placeholder="4"
                  className={inputClass}
                />
                <FieldError className="text-red-500 text-sm" />
              </TextField>
            </div>

            {/* Hourly Rate */}
            <div className="space-y-2">
              <TextField name="hourlyRate" type="number" isRequired>
                <Label className="text-gray-700 dark:text-gray-300">
                  Hourly Rate ($)
                </Label>
                <Input
                  type="number"
                  placeholder="5"
                  className={inputClass}
                />
                <FieldError className="text-red-500 text-sm" />
              </TextField>
            </div>

            {/* Available From */}
            <div className="space-y-2">
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Available From
              </label>
              <input
                type="time"
                name="availableFrom"
                className={inputClass}
              />
            </div>

            {/* Available Until */}
            <div className="space-y-2">
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Available Until
              </label>
              <input
                type="time"
                name="availableUntil"
                className={inputClass}
              />
            </div>

            {/* Image URL */}
            <div className="lg:col-span-2 space-y-2">
              <TextField name="imageUrl" isRequired>
                <Label className="text-gray-700 dark:text-gray-300">
                  Image URL
                </Label>
                <Input
                  type="url"
                  placeholder="https://example.com/room.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className={inputClass}
                />
                <FieldError className="text-red-500 text-sm" />
              </TextField>

              {imageUrl && (
                <div className="mt-4 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
                  <Image
                    src={imageUrl}
                    alt="Room Preview"
                    width={600}
                    height={500}
                    className="w-full h-64 object-cover"
                  />
                </div>
              )}
            </div>

            {/* Description */}
            <div className="lg:col-span-2 space-y-2">
              <TextField name="description" isRequired>
                <Label className="text-gray-700 dark:text-gray-300">
                  Description
                </Label>
                <TextArea
                  placeholder="Describe the room..."
                  className={`${inputClass} min-h-30 resize-y`}
                />
                <FieldError className="text-red-500 text-sm" />
              </TextField>
            </div>

            {/* Amenities */}
            <div className="lg:col-span-2">
              <label className="block mb-4 text-lg font-semibold text-gray-800 dark:text-white">
                Amenities
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {amenitiesList.map((amenity) => (
                  <label
                    key={amenity}
                    className={`flex items-center gap-3 rounded-2xl px-4 py-3 border cursor-pointer transition-all ${
                      amenities.includes(amenity)
                        ? "border-olive-500 bg-olive-50 dark:bg-olive-900/30 dark:border-olive-400 text-black dark:text-white"
                        : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-olive-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    <input
                      type="checkbox"
                      name="amenities"
                      value={amenity}
                      checked={amenities.includes(amenity)}
                      onChange={(e) => {
                        const { value, checked } = e.target;
                        setAmenities((prev) =>
                          checked
                            ? [...prev, value]
                            : prev.filter((a) => a !== value)
                        );
                      }}
                      className="w-4 h-4 accent-olive-600"
                    />
                    <span className="text-sm font-medium">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full rounded-2xl bg-olive-600 hover:bg-olive-700 dark:bg-olive-600 dark:hover:bg-olive-500 active:scale-[0.99] text-white font-semibold py-7 text-lg shadow-lg transition-all"
          >
            Add Room
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AddRoomClient;