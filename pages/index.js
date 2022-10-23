import {useEffect, useState} from 'react';
import styles from '../styles/Home.module.css';
import ImageCarousel from '@f/components/ImageCarousel';
import {IconButton} from '@material-ui/core';
import {MdMenu} from 'react-icons/md';

export default function Home() {
  useEffect(() => {}, []);

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <span style={{color: '#12CE31'}}>Trav</span>Ming
        </div>
        <IconButton aria-label="menu">
          <MdMenu color="white" size={20} />
        </IconButton>
      </header>
      <section className={styles.carousel_container}>
        <ImageCarousel />
      </section>
    </main>
  );
}
