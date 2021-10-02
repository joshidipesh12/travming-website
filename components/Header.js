import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Header.module.css";

const HeaderBar = () => {
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
          <Link href="https://www.instagram.com/_joshi_dipesh_/">Contact</Link>
        </h2>
      </div>
      <div className={styles.links}>
        <h2 className={styles.link}>
          <Link href="https://linkedin.com/in/joshidipesh12">Sign In</Link>
        </h2>
        <h2 className={styles.link}>
          <Link href="https://www.instagram.com/_joshi_dipesh_/">Sign Up</Link>
        </h2>
        <img
          className={styles.searchIcon}
          src={require("../icons/search.png")}
        />
        <img
          className={styles.menuIcon}
          src={require("../icons/search.png")}
          onClick={() => alert("Hello!")}
        />
      </div>
    </div>
  );
};

export default HeaderBar;
