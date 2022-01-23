import Link from 'next/link';
import React from 'react';
import styles from '../styles/Navbar.module.css';

import {MdSearch} from 'react-icons/md';

function Navbar() {
  return (
    <header className={styles.container}>
      <section className={styles.links}>
        <div className={styles.link}>
          <Link href="https://joshidipesh12.github.io">About</Link>
        </div>
        <div className={styles.link}>
          <Link href="https://linkedin.com/in/joshidipesh12">Contact</Link>
        </div>
      </section>
      <div className={styles.name}>
        <Link href="/">TRAVMING</Link>
      </div>
      <section className={styles.links}>
        <div className={styles.link}>
          <Link href="/explore">Explore</Link>
        </div>
        <div className={styles.link}>
          <MdSearch
            className={styles.searchIcon}
            onClick={() => {}}
            size={20}
          />
        </div>
      </section>
    </header>
  );
}

export default Navbar;
