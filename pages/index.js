import Head from "next/head";
// import Image from "next/image";
import styles from "../styles/Home.module.css";
import HeaderBar from "../components/Header";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>TravMing - Across the World, A Few Clicks Away!</title>
        <meta
          name="description"
          content="TravMing - Across the World, Just a Few Clicks Away!"
        />
        <meta name="theme-color" content="#77898e"/>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="manifest.json"/>
      </Head>
      <header className={styles.header}>
        <HeaderBar />
      </header>

      <main className={styles.main}></main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
