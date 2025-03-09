// src/pages/BookingPage.tsx
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from "../components/Navbar/Navbar";
import Booking from '../components/Booking/Booking';
import styles from "./BookingPage.module.scss"; 

const BookingPage: React.FC = () => {
  return (
    <div>
      <div>
        <header>
          <Navbar />
        </header>
      </div>
      <div className={styles.BookingPageContainer}>
        <Booking />
      </div>
    </div>
  );
};

export default BookingPage;
