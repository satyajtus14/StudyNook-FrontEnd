import RoomCards from '@/components/RoomCards';
import React from 'react';

export const metadata = {
  title: "StudyNook | Available Rooms",
};

const AvailableAllRoomsPage = async({roomInfo}) => {
  
/*     const [rooms, setRooms] = React.useState([]);

    React.useEffect(() => {
        fetch('http://localhost:5002/rooms')
            .then(response => response.json())
            .then(data => setRooms(data))
            .catch(error => console.error('Error fetching rooms:', error));
    }, []);    */          

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/rooms`);
    const AllRoomsData = await res.json();
    console.log(AllRoomsData);

    return (
        <div className='max-w-7xl mx-auto'>
            <h1 className='text-2xl font-bold mt-5 mb-4'>Available Rooms</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                
                {AllRoomsData.map((room) => (
                    <div key={room._id} className=' overflow-hidden p-3'>
                        <RoomCards roomInfo={room} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AvailableAllRoomsPage;