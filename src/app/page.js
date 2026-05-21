import AvailableRooms from "@/components/AvailableRooms";
import HowItWorks from "@/components/HowItWorks";
import Banner from "@/components/shared/Banner";
import WhyChooseUs from "@/components/WhyChooseUs";

export const metadata = {
  title: "StudyNook | Home",
};

export default function Home() {
  return (
     <div>
      <Banner />
      <AvailableRooms />
      <HowItWorks /> 
      <WhyChooseUs /> 
     </div>
  );
}
