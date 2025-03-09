import React from "react";
import styles from "./AboutUs.module.scss";

const AboutUs: React.FC = () => {
  return (
    <div className={styles.aboutUs}>
      <section className={styles.logoSection} style={{ marginTop: "3rem" }}>
        <img
          src="/assets/Logo.jpg"
          alt="Restaurant Logo"
          className={styles.logo}
        />
      </section>

      <section className={styles.historySection}>
        <h2 className={styles.sectionTitle}>History</h2>
        <p>
          Since opening in 2000, our restaurant has been committed to delivering
          authentic Chinese cuisine to every customer. Over the years, we've
          continuously innovated our dishes, blending traditional flavors with
          modern culinary techniques.
        </p>
      </section>

      <section className={styles.chefSection}>
        <h2 className={styles.sectionTitle}>Chef Infomation</h2>
        <img src="/assets/Chef.jpg" alt="chef" className={styles.chefImage} />
        <p className={styles.chefBio}>
          Our chef, Zhang Wei, has over 20 years of cooking experience,
          specializing in a fusion of traditional Chinese culinary arts and
          innovative methods, bringing you a unique dining experience.
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
