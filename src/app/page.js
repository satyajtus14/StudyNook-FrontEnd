import AvailableRooms from "@/components/AvailableRooms";
import Banner from "@/components/shared/Banner";

export const metadata = {
  title: "StudyNook | Home",
};

export default function Home() {
  return (
     <div>
      <Banner />
      <AvailableRooms />
     </div>
  );
}
