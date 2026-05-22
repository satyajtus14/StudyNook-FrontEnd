"use client";


import { getAuthToken } from "@/lib/auth-client";
import { AlertDialog, Button } from "@heroui/react";
import { FaRegTrashCan } from "react-icons/fa6";
import { toast } from "react-toastify";

export function CancelBookingItem({ bookingId }) {


  const handleCancelBooking = async () => {
  try {
    const token = await getAuthToken();
    console.log("Token:", token);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${bookingId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "cancelled" }),
      }
    );

      if (response.ok) {
        console.log("Booking cancelled successfully");
        toast.success("Booking cancelled successfully");

        // Wait 2 seconds so toast is visible, then reload
        setTimeout(() => {
          window.location.reload();
        }, 2000);

        // Optionally, you can add code here to update the UI after cancellation
      } else {
        console.error("Failed to cancel booking");
        toast.error("Failed to cancel booking");

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
      toast.error("Something went wrong.");
    }

   
  };

  return (
    <AlertDialog>
      <Button
        variant="outline"
        className="flex items-center gap-2 border border-red-400 text-red-400 hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-medium transition"
      >
        <span>
          <FaRegTrashCan />
        </span>{" "}
        Cancel
      </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>
                Cancel Booking Item permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently <strong>cancel the booking</strong> and
                all of its data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              {/* <Button slot="close" variant="tertiary">
                Cancel
              </Button> */}
              <Button
                onClick={handleCancelBooking}
                slot="close"
                variant="danger"
              >
                Cancel Booking
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
