// src/pages/BookingPage.tsx
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from "../components/Navbar/Navbar";
import Booking from '../components/Booking/Booking';
import styles from "./CommonBackground.module.scss"; 

const BookingPage: React.FC = () => {
  return (
    <div>
      <div>
        <header>
          <Navbar />
        </header>
      </div>
      <div className={styles.backgroundContainer}>
        <Booking />
      </div>
    </div>
  );
};

export default BookingPage;
