import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./FindUsOnline.module.scss";
import foodora from "../../assets/Foodora.png";
import wolt from "../../assets/Wolt.jpg";

const FindUsOnline: React.FC = () => {
  return (
    <div className={styles.findUsOnline}>
      {/* 上部分：描述信息 */}
      <div className={styles.topSection}>
        <p>
          您可以通过以下平台在线找到我们，了解更多信息或下单订餐！
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
            src={foodora}
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
            src={wolt}
            alt="Wolt"
            className={styles.iconWolt}
          />
        </a>
      </div>
    </div>
  );
};

export default FindUsOnline;
