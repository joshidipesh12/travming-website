import React from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import styles from '../styles/Home.module.css';

function Layout({children}) {
  return (
    <div>
      <Head>
        <title>TravMing - Round the World, Just A Few Clicks to Go ✈️</title>
        <meta name="description" content="Round the World, Just A Few Clicks" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#86989A" />
        <link rel="manifest" href="/manifest.json"></link>
        <link rel="apple-touch-icon" href="/icons/icon.png" />
        <link rel="icon" href="/icons/favicon.ico" />
      </Head>
      <Navbar />
      <main className={styles.main}>{children}</main>
    </div>
  );
}

export default Layout;
