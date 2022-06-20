import React from 'react';
import Navbar from './Navbar';
import Head from './Head';
import styles from '../styles/Home.module.css';

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
