"use client";
import { DeleteRoomBookingByAlert } from '@/components/shared/DeleteRoomBookingByAlert';
import { EditRoomInfoByModal } from '@/components/shared/EditRoomInfoByModal';
import { Button, Card } from '@heroui/react';
import Image from 'next/image';
import React from 'react';
import { FaRegCalendar } from 'react-icons/fa';
import { LuClock, LuMapPin, LuUsers } from 'react-icons/lu';

const MyListingClientPage = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-10" >
            <Card className="border-2 border-gray-300 dark:border-gray-700 rounded-2xl p-6">
                
                    {/* Hero Section */}
                      <div className="relative w-full h-100 rounded-3xl overflow-hidden">
                        <Image
                          src= "/placeholder.jpg"
                          alt= "Room"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-end">
                          <div className="p-8 text-white">
                            <div className="flex items-center gap-2 mb-2">
                              <LuMapPin />
                              <span>roomType</span>
                              <span>•</span>
                              <span>floor</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold">roomName</h1>
                          </div>
                        </div>
                      </div>
                
                      {/* Main Content */}
                      <div className="flex flex-col items-center gap-8 mt-10 border-2 border-gray-300 dark:border-gray-700 rounded-2xl mx-auto p-6 w-full">
                
                        
                        <div className="w-full max-w-3xl space-y-6">
                
                          {/* Description header */}
                          <div className="bg-white flex flex-col justify-center items-center border-2 border-gray-300 dark:bg-gray-900 shadow-md rounded-2xl p-6">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                              About Study Room Booking Confirmation Details
                            </h2>
                
                          </div>
                
                          {/* Description body */}
                          <div className="bg-white mx-auto border-2 border-gray-300 dark:bg-gray-900 shadow-md rounded-2xl p-6">
                            <h2 className="text-gray-600 dark:text-gray-400 leading-8">
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 leading-8">
                              description
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
                                  <p className="font-medium">availableFrom – availableUntil</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                                <LuUsers className="text-olive-600 flex-shrink-0" />
                                <div>
                                  <p className="text-xs text-gray-400">Capacity</p>
                                  <p className="font-medium">capacity people</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                                <LuMapPin className="text-olive-600 flex-shrink-0" />
                                <div>
                                  <p className="text-xs text-gray-400">Location</p>
                                  <p className="font-medium">floor</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                                <FaRegCalendar className="text-olive-600 flex-shrink-0" />
                                <div>
                                  <p className="text-xs text-gray-400">Hourly Rate</p>
                                  <p className="font-medium">$hourlyRate/ hr</p>
                                </div>
                              </div>
                            </div>
                       
                          </div>
                               {/* <div className=" flex justify-center items-center gap-3 mt-6">
                                <EditRoomInfoByModal   />
                
                                <DeleteRoomBookingByAlert />
                               
                            </div> */}
                        </div>
                </div>
             {/*  — Pass full room object */}
        <div className=" flex-1 justify-center items-center gap-4 mt-6 w-full max-w-sm mx-auto">
          <Button variant="primary" className="w-40 gap-3">Edit </Button>
           {/* <EditRoomInfoByModal   /> */}
          <Button variant="danger" className="w-40 mt-4">Delete </Button>
            {/* <DeleteRoomBookingByAlert /> */}
        </div>
            </Card>

        </div>
    );
};

export default MyListingClientPage;