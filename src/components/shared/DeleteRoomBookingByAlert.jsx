"use client";

import { getAuthToken } from "@/lib/auth-client";
// import { authClient } from "@/lib/auth-client";
import {AlertDialog, Button} from "@heroui/react";
import { useRouter } from "next/navigation";


import { BiTrash } from "react-icons/bi";
import { toast } from "react-toastify";

export function DeleteRoomBookingByAlert({ room }) {
 
      const {_id,roomId, imageUrl, roomName, roomType, floor,
    availableFrom, availableUntil,
    capacity, hourlyRate, description,
  } = room;
  
  // _id      = listingsCollection document id
  // roomId   = roomsCollection document id
      const router = useRouter()
      // const { data: session } = authClient.useSession();
    
     const onDelete = async () => {
      
      // const token = session?.session?.token; 
    

      // const {data:tokenData} = await authClient.token()
      //      console.log(tokenData);  

        try { 
          const token = await getAuthToken();
                console.log("Token:", token);
                
                
        // Call your API Delete from roomsCollection from the database 
         await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/${roomId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            // Authorization: `Bearer ${tokenData?.token}`
          }
        }); 


      // Delete from listingsCollection
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/listings/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
         
      toast.success("Room deleted successfully!");
      router.refresh();
      router.push("/rooms");
   
    } catch(error) {
      console.error("Error deleting room:", error);
      toast.error("Failed to delete the room. Please try again.");
    }
  };

  return (

        <AlertDialog> 
      <Button variant="danger-soft" className="flex-1 bg-red-600 hover:bg-red-700 active:scale-[0.99] text-white font-semibold py-2 px-3 rounded-xl transition-all text-sm shadow-md"> 
          <BiTrash /> Delete
        </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete Room Information permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>{roomName}</strong> and all of its
                data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button slot="close" variant="danger" onClick={onDelete}>
                Delete
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
        
  );
}