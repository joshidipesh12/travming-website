import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { HeaderBar, FooterBar, Main } from "../components";
import config from "../dest-config.json";
import { useEffect, useState } from "react";

export default function Home() {
  const [country, setCountry_call] = useState("england");
  const [province, setProvince] = useState("cambridge");

  const setCountry = (newVal) => {
    setProvince(Object.keys(config[newVal].provinces)[0]);
    setCountry_call(newVal);
  };

  useEffect(() => {
    // console.log(Object.keys(config[country].provinces)[0]);
    return () => {};
  }, [country]);

  const destProps = {
    country,
    setCountry,
    province,
    setProvince,
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <HeaderBar {...destProps} />
      </header>

      <div className={styles.background}>
        <Image
          src={`${config[country].image}1920x1080`}
          blurDataURL={`${config[country].image}96x54`}
          layout="fill"
          objectFit="cover"
          placeholder="blur"
        />
      </div>

      <main className={styles.main}>
        <Main {...destProps} />
      </main>

      <footer className={styles.footer}>
        <FooterBar {...destProps} />
      </footer>

      <Head>
        <title>TravMing - Across the World, A Few Clicks Away!</title>
        <meta
          name="description"
          content="TravMing - Across the World, Just a Few Clicks Away!"
        />
        <meta name="theme-color" content="#77898e" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
      </Head>
    </div>
  );
}
