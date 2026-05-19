"use client";

// import { authClient } from "@/lib/auth-client";
import {AlertDialog, Button} from "@heroui/react";
import { useRouter } from "next/navigation";


import { BiTrash } from "react-icons/bi";
import { toast } from "react-toastify";

export function DeleteRoomBookingByAlert({room}) {
 
      const {
   _id, imageUrl, roomName, roomType, floor,
    availableFrom, availableUntil,
    capacity, hourlyRate, description,
  } = room;

      const router = useRouter()
      // const { data: session } = authClient.useSession();
    
     const onDelete = async () => {
      
      // const token = session?.session?.token; 
    

      // const {data:tokenData} = await authClient.token()
      //      console.log(tokenData);  

           
        // Call your API to delete the destination from the database here
        const response = await fetch(`http://localhost:5002/rooms/${_id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${tokenData?.token}`
          }
        }); 
        const result = await response.json();
        toast.success("Room deleted successfully!");
        console.log('Delete Result:', result);
        router.push('/rooms'); // Redirect to rooms list after deletion
      };

  return (

        <AlertDialog> 
      <Button variant="danger-soft" className="w-1/4  bg-red-600 hover:bg-red-900 active:scale-[0.99] text-white font-semibold py-4 rounded-xl transition-all text-lg shadow-md"> 
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