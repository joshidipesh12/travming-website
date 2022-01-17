import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Header.module.css";

const HeaderBar = ({}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth > 750 ? false : true);
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <Link href="#">TravMing</Link>
      </h1>
      <div className={styles.links}>
        <h2 className={styles.link}>
          <Link href="https://linkedin.com/in/joshidipesh12">About</Link>
        </h2>
        <h2 className={styles.link}>
          <Link href="https://linkedin.com/in/joshidipesh12">Contact</Link>
        </h2>
      </div>
      <div className={styles.links}>
        <h2 className={styles.link} onClick={() => alert("Coming Soon!")}>
          <Link href="#">Sign In</Link>
        </h2>
        <h2 className={styles.link} onClick={() => alert("Coming Soon!")}>
          <Link href="#">Sign Up</Link>
        </h2>
        {!isMobile ? (
          <Image
            src={require("../icons/search.png")}
            id="search-icon"
            height={20}
            width={20}
            layout="fixed"
            onClick={() =>
              alert(`i: ${window.innerWidth}  o: ${window.outerWidth}`)
            }
          />
        ) : (
          <Image
            src={require("../icons/menu.svg")}
            id="menu-icon"
            onClick={() => alert("Hello!")}
          />
        )}
      </div>
      <style jsx>
        {`
          @media (max-width: 750px) {
          }
        `}
      </style>
    </div>
  );
};

export default HeaderBar;
