import React from 'react';
import Navbar from './Navbar';
import styles from '../styles/Home.module.css';
import Head from './Head';

function Layout({children}) {
  return (
    <div>
      <Head />
      <Navbar />
      <main className={styles.main}>{children}</main>
    </div>
  );
}

export default Layout;
