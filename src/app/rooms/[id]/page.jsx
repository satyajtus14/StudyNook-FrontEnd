
import RoomDetailsClient from "@/components/RoomDetailsClient";
import { getAuthToken } from "@/lib/auth-client";
import ErrorPage from "./ErrorPage";

const RoomDetailsPage = async ({ params }) => {  // ← removed error/reset, not valid here
  const { id } = await params;

  let roomData = null;  // ← declare OUTSIDE try so it's accessible everywhere

  try {
   

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/${id}`, {
      headers: {
       
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      return ("Internal Server Error"); 
    }

    roomData = await res.json();  // ← assign to outer variable

  } catch (err) {
    console.error("Fetch error:", err);
    return <ErrorPage error={{ message: "Something went wrong." }} />;  // ← return early on error
  }

  // ✅ Now roomData is accessible here
  if (!roomData || !roomData._id) {
    return (
      <h2 className="font-bold text-xl md:text-4xl text-[#244d3f] text-center my-5">
        No Rooms Found!
      </h2>
    );
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
     <RoomDetailsClient room={roomData}  />
        

      </div>
   
  );
};

export default RoomDetailsPage;
