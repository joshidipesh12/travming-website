import React, {useEffect, useState} from 'react';
import config from '@f/config.json';
import {motion, AnimatePresence, useTransform, useScroll} from 'framer-motion';
import styles from '../../styles/Home.module.css';

function Carousel() {
  const {places} = config;
  const [currIndex, setCurrIndex] = useState(0);
  const {scrollY: Y} = useScroll();
  const opacity = useTransform(Y, [0, 50], [0, 1]);

  const nextImage = () => setCurrIndex(p => (p + 1) % places.length);

  useEffect(() => {
    let imageTimeout = setInterval(nextImage, 10000);
    return () => clearTimeout(imageTimeout);
  }, []);

  useEffect(() => {
    let img = new Image();
    img.src = places[(currIndex + 1) % places.length].img;
    return () => {};
  }, [currIndex]);

  return (
    <motion.div initial={{x: 0}} className={styles.inner_carousel_container}>
      <AnimatePresence mode="popLayout">
        <motion.div
          initial={{y: '100vh'}}
          animate={{y: '0vh'}}
          exit={{y: '-120vh'}}
          transition={{easings: 10}}
          className={styles.image_item}
          key={`${currIndex}_container`}
          style={{
            backgroundImage: `url("${places[currIndex].img}?width=auto")`,
          }}>
          <motion.div
            key="blur_cover"
            style={{opacity}}
            className={styles.blur_cover}
          />
          <div className={styles.image_cover}>
            <motion.h1
              className={styles.place_quote}
              key={`${currIndex}_quote`}
              transition={{delay: 0.5}}
              {...textAnim}>
              {places[currIndex].desc}
            </motion.h1>
            <motion.h4
              className={styles.place_name}
              key={`${currIndex}_country`}
              transition={{delay: 0.8}}
              {...textAnim}>
              {places[currIndex].name}
            </motion.h4>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

const textAnim = {
  initial: {y: 30, opacity: 0},
  animate: {y: 0, opacity: 1},
  exit: {y: 30, opacity: 0},
};

export default Carousel;
