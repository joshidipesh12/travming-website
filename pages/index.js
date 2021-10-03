import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { HeaderBar, FooterBar } from "../components";
import config from "../dest-config.json";
import { useState } from "react";

export default function Home() {
  const [country, setCountry] = useState("england");
  const [province, setProvince] = useState("eastbourn");

  return (
    <div className={styles.container}>
      <Head>
        <title>TravMing - Across the World, A Few Clicks Away!</title>
        <meta
          name="description"
          content="TravMing - Across the World, Just a Few Clicks Away!"
        />
        <meta name="theme-color" content="#77898e" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="manifest.json" />
      </Head>
      <header className={styles.header}>
        <HeaderBar />
      </header>

      <div className={styles.background}>
        <Image
          src={`${config[country][province]}1920x1080`}
          layout="fill"
          placeholder="blur"
          blurDataURL={`${config[country][province]}96x54`}
        />
      </div>

      <main className={styles.main}></main>

      <footer className={styles.footer}>
        <FooterBar country="england" />
      </footer>
    </div>
  );
}
