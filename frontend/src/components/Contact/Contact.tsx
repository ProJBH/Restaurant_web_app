import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Contact.module.scss";

const Contact: React.FC = () => {
  const address = "123 Main Street, City, Country";
  const phone = "123-456-7890";
  const email = "contact@example.com";

  const openHours = [
    { days: "周一到周五", hours: "11:00-22:00" },
    { days: "周六日", hours: "11:00-24:00" },
  ];

  return (
    <div className={styles.contact}>
      <div className={styles.contactContainer}>
        {/* 左侧：地址、电话、邮件 */}
        <div className={styles.leftColumn}>
          <div className={styles.contactItem}>
            <h4>Address</h4>
            <a 
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {address}
            </a>
          </div>
          <div className={styles.contactItem}>
            <h4>Phone</h4>
            <a href={`tel:${phone}`}>
              {phone}
            </a>
          </div>
          <div className={styles.contactItem}>
            <h4>Email</h4>
            <a href={`mailto:${email}`}>
              {email}
            </a>
          </div>
        </div>

        {/* 右侧：营业时间 */}
        <div className={styles.rightColumn}>
          <h4>营业时间</h4>
          <ul className={styles.hoursList}>
            {openHours.map((item, index) => (
              <li key={index} className={styles.hoursItem}>
                <span className={styles.days}>{item.days}</span>
                <span className={styles.hours}>{item.hours}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Contact;
