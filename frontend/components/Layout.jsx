import React from 'react';
import Navbar from './Navbar';
import styles from '../../styles/Home.module.css';

function Layout({children}) {
  return (
    <div>
      <Navbar />
      <main className={styles.main}>{children}</main>
    </div>
  );
}

export default Layout;
