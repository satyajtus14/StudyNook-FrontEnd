import MyBookingsClientPage from "./MyBookingsClientPage";

export const metadata = {
  title: "StudyNook | My Bookings",
};

//  No session check needed — client handles it
const MyBookingsPage = () => {
  return <MyBookingsClientPage />;
};

export default MyBookingsPage;