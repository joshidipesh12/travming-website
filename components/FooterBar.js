import React from "react";
import styles from "../styles/Footer.module.css";

const FooterBar = ({ country, setCountry }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Book Your Vacation</h2>
      <div className={styles.main}>
        <div style={{}}></div>
        <button className={styles.button} title="Search">
          <h2 className={styles.title}>Search</h2>
        </button>
      </div>
    </div>
  );
};

export default FooterBar;
