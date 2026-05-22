

import LoadingPage from "@/app/LoadingPage";
import ErrorPage from "./ErrorPage";
import RoomDetailsClient from "@/components/RoomDetailsClient";





const RoomDetailsPage = async ({ params,error, reset }) => {
  const { id } = await params;

  console.log(id);

 
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/${id}`);
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



  return (
         <div className="max-w-7xl mx-auto px-4 py-10">
              {/* Edit and Delete buttons */}
  {/*    <div className="flex justify-end gap-2 mt-5 mb-3">
        <EditRoomInfoByModal  room={roomData}/>  
        <DeleteRoomBookingByAlert  room={roomData} />    
      </div>
  */}
       

       {/* Pass data down to client component */}
     <RoomDetailsClient room={roomData} />
        

      </div>
   
  );
};

export default RoomDetailsPage;
