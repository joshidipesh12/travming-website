import {useEffect, useState} from 'react';
import styles from '../styles/Home.module.css';
import {MdOutlineHotel, MdOutlineAirplaneTicket} from 'react-icons/md';
import {TbPlaneInflight} from 'react-icons/tb';
import {motion} from 'framer-motion';
import {FiSend, FiMapPin, FiStar} from 'react-icons/fi';
import {BiMapPin} from 'react-icons/bi';
import config from '@f/config.json';
import {Navbar, ImageCarousel, HomeLoader, AnimatedCube} from '@f/components';

export default function Home() {
  const [loadingImages, setLoadingImages] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoadingImages(false), 5000);
  }, []);

  return (
    <main className={styles.main}>
      {loadingImages ? (
        <HomeLoader onLoadComplete={() => setLoadingImages(false)} />
      ) : (
        <>
          <Navbar />
          <section className={styles.carousel_container}>
            <ImageCarousel />
          </section>
          <section className={`${styles.section} ${styles.section_1}`}>
            <h2 className={styles.h2}>Top Services</h2>
            <div className={styles.div_1}>
              <motion.div
                initial={{x: -100, opacity: 0}}
                {...whileInView(1)}
                className={styles.card}>
                <MdOutlineAirplaneTicket size={30} color="#32DF8F" />
                <h3>Ticket Booking</h3>
                <p>
                  Book all kind of national or international ticket for your
                  next destinaion.
                </p>
              </motion.div>
              <motion.div
                initial={{x: -100, opacity: 0}}
                {...whileInView(2)}
                className={styles.card}>
                <MdOutlineHotel size={30} color="#00B8E0" />
                <h3>Hotel Searching</h3>
                <p>
                  Easily surf your according to your budget hotel from top
                  websites.
                </p>
              </motion.div>
              <motion.div
                initial={{x: -100, opacity: 0}}
                {...whileInView(3)}
                className={styles.card}>
                <FiSend size={30} color="#E48B78" />
                <h3>Planing Your Vacation</h3>
                <p>
                  Find yourself the best plan within a short time explore more.
                </p>
              </motion.div>
            </div>
          </section>
          <section className={`${styles.section} ${styles.section_2}`}>
            <h2 className={styles.h2}>
              There is so much more to explore, just step outside and we are
              there to facilitate.
            </h2>
            <p style={{maxWidth: '30rem', marginTop: -10}}>
              We always try to make our customer Happy. We provide all kind of
              facilities. Your Satisfaction is our main priority.
            </p>
            <div className={styles.div_2}>
              <motion.div
                initial={{opacity: 0, y: 50}}
                {...whileInView(1)}
                className={styles.card}>
                <FiMapPin size={40} color="#12CE31" />
                <h2>50+</h2>
                <p>Countries to Travel</p>
              </motion.div>
              <motion.div
                initial={{opacity: 0, y: 50}}
                {...whileInView(2)}
                className={styles.card}>
                <TbPlaneInflight size={40} color="#12CE31" />
                <h2>120+</h2>
                <p>Arilines Partners</p>
              </motion.div>
              <motion.div
                initial={{opacity: 0, y: 50}}
                {...whileInView(3)}
                className={styles.card}>
                <BiMapPin size={40} color="#12CE31" />
                <h2>750+</h2>
                <p>Locations to Visit</p>
              </motion.div>
              <motion.div
                initial={{opacity: 0, y: 50}}
                {...whileInView(4)}
                className={styles.card}>
                <FiStar size={40} color="#12CE31" />
                <h2>400+</h2>
                <p>Vacation Stories</p>
              </motion.div>
            </div>
          </section>
          <section className={`${styles.section} ${styles.section_3}`}>
            <h2>Things To Do When Your Are Out There</h2>
            <div className={styles.div_3}>
              {config.activities.map(item => (
                <motion.article key={item.name} className={styles.card}>
                  <img src={`${item.img}?width=400`} />
                  <div className={styles.card_img_cover}>{item.name}</div>
                </motion.article>
              ))}
            </div>
          </section>
          <section className={`${styles.section} ${styles.section_4}`}>
            <AnimatedCube />
          </section>
        </>
      )}
    </main>
  );
}

const whileInView = i => ({
  whileInView: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {delay: 0.2 * i},
  },
});
