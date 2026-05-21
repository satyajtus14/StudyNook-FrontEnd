"use client";

// import { authClient } from "@/lib/auth-client";
import {
  Input,
  Select,
  Label,
  Modal,
  Surface,
  TextField,
  ListBox,
  TextArea,
  Button,
  FieldError,
} from "@heroui/react";
import { useRouter } from "next/navigation";

import { BiEdit, BiEnvelope } from "react-icons/bi";
import { toast } from "react-toastify";

export function EditRoomInfoByModal({ room }) {
  const {
    _id,roomId,imageUrl, roomName, roomType, floor,
    availableFrom, availableUntil,
    capacity, hourlyRate, description,
  } = room;

const router = useRouter()

  const onSubmit = async (e) => {
    e.preventDefault();

    // Handle form submission logic here
    // You can access form values using e.target.elements
    const formData = new FormData(e.currentTarget);
     const roomInfoCollect = Object.fromEntries(formData.entries());

    // Log the collected data
     console.log("Submitting update:", roomInfoCollect);


    //  const {data:tokenData} = await authClient.token()
    //      console.log(tokenData); 



    //Call your API to edit the data in the database here
    try {
    // 1. Update roomsCollection by roomId
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/${roomId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(roomInfoCollect),
    });

    // 2. Update listingsCollection by listing's own _id
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/listings/${_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(roomInfoCollect),
    });

    toast.success("Room information updated successfully!");
    router.refresh();
    router.push("/my-listings");
  } catch (err) {
    console.error("Update error:", err);
    toast.error("Something went wrong.");
  }
};

  return (
     <Modal>
      <Button variant="outline" className="flex-1 bg-olive-600 hover:bg-olive-700 active:scale-[0.99] text-white font-semibold py-2 px-3 rounded-xl transition-all text-sm shadow-md">
        <BiEdit /> Edit
      </Button>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-2xl">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Edit Room Information</Modal.Heading>
            </Modal.Header>

            <Modal.Body className="p-6">
              <Surface variant="default">
                <form
                  id="edit-room-form"
                  onSubmit={onSubmit}
                  className="flex flex-col gap-4 p-10 space-y-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Room Name */}
                    <div className="md:col-span-2">
                      <TextField defaultValue={roomName} name="roomName" isRequired>
                        <Label>Room Name</Label>
                        <Input placeholder="Creative Workspace" className="rounded-2xl" />
                        <FieldError />
                      </TextField>
                    </div>

                    {/* Room Type */}
                    <div>
                      <Select defaultSelectedKey={roomType} name="roomType" isRequired className="w-full">
                        <Label>Room Type</Label>
                        <Select.Trigger className="rounded-2xl">
                          <Select.Value />
                          <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover>
                          <ListBox>
                            <ListBox.Item id="Private Room" textValue="Private Room">
                              Private Room
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item id="Meeting Room" textValue="Meeting Room">
                              Meeting Room
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item id="Conference Room" textValue="Conference Room">
                              Conference Room
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item id="Open Space" textValue="Open Space">
                              Open Space
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                          </ListBox>
                        </Select.Popover>
                      </Select>
                    </div>

                    {/* Floor */}
                    <TextField defaultValue={floor} name="floor" isRequired>
                      <Label>Floor</Label>
                      <Input placeholder="2nd" className="rounded-2xl" />
                      <FieldError />
                    </TextField>

                    {/* Capacity */}
                    <TextField defaultValue={capacity} name="capacity" isRequired>
                      <Label>Capacity</Label>
                      <Input type="number" placeholder="6" className="rounded-2xl" />
                      <FieldError />
                    </TextField>

                    {/* Hourly Rate */}
                    <TextField defaultValue={hourlyRate} name="hourlyRate" isRequired>
                      <Label>Hourly Rate (USD)</Label>
                      <Input type="number" placeholder="14" className="rounded-2xl" />
                      <FieldError />
                    </TextField>

                    {/* Available From */}
                    <TextField defaultValue={availableFrom} name="availableFrom" isRequired>
                      <Label>Available From</Label>
                      <Input type="time" className="rounded-2xl" />
                      <FieldError />
                    </TextField>

                    {/* Available Until */}
                    <TextField defaultValue={availableUntil} name="availableUntil" isRequired>
                      <Label>Available Until</Label>
                      <Input type="time" className="rounded-2xl" />
                      <FieldError />
                    </TextField>

                    {/* Image URL */}
                    <div className="md:col-span-2">
                      <TextField defaultValue={imageUrl} name="imageUrl" isRequired>
                        <Label>Image URL</Label>
                        <Input type="url" placeholder="https://example.com/room.jpg" className="rounded-2xl" />
                        <FieldError />
                      </TextField>
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                      <TextField defaultValue={description} name="description" isRequired>
                        <Label>Description</Label>
                        <TextArea placeholder="Describe the room..." className="rounded-3xl" />
                        <FieldError />
                      </TextField>
                    </div>

                  </div>
                </form>
              </Surface>
            </Modal.Body>

            <Modal.Footer>
              {/* ✅ form id matches the form above */}
              <Button type="submit" form="edit-room-form">Save Changes</Button>
            </Modal.Footer>

          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
