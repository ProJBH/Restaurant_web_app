import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./FindUsOnline.module.scss";


const FindUsOnline: React.FC = () => {
  return (
    <div className={styles.findUsOnline}>
      {/* 上部分：描述信息 */}
      <div className={styles.topSection}>
        <p>
        Du kan finne oss online via følgende plattformer for å lære mer eller legge inn en bestilling!
        </p>
      </div>
      {/* 下部分：图标链接 */}
      <div className={styles.bottomSection}>
        <a
          href="http://foodora.no/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.iconLinkFoodora}
        >
          <img
            src={'/assets/Foodora.png'}
            alt="Foodora"
            className={styles.iconFoodora}
          />
        </a>
        <a
          href="https://wolt.com/en/nor"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.iconLinkWolt}
        >
          <img
            src={'/assets/Wolt.jpg'}
            alt="Wolt"
            className={styles.iconWolt}
          />
        </a>
      </div>
    </div>
  );
};

export default FindUsOnline;
