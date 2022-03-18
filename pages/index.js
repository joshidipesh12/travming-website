import React, {useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import Fade from 'react-reveal/Fade';
import {motion, useAnimation} from 'framer-motion';
import {useDispatch, useSelector} from 'react-redux';

import {getCities, getStates} from '../store/locations';
import styles from '../styles/Home.module.css';
import ScrollList from '../components/ScrollList';
import useIsMobile from '../hooks/useIsMobile';
import BottomMenu from '../components/BottomMenu';
import LocSelector from '../components/LocSelector';
import Layout from '../components/Layout';

export default function Home() {
  const titleRef = useRef(null);
  const bgOpacity = useAnimation();
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const [locModal, setLocModal] = useState(false);
  const [titleVis, setTitleVisible] = useState(true);
  const [background, setBackground] = useState('/background1.png');

  const country = useSelector(state => state.hotel.country);

  const toggleTitleVisibility = hide => {
    if (hide) {
      setTitleVisible(false);
      titleRef.current.style.zIndex = -1;
    } else {
      titleRef.current.style.zIndex = 2;
      setTitleVisible(true);
    }
  };

  useEffect(() => {
    // dispatch(getCities(country));
    dispatch(getStates(country));
    return () => {};
  }, [country]);

  return (
    <html lang="en">
      <div className={styles.container}>
        <div className={styles.background}>
          <motion.div
            animate={bgOpacity}
            style={{position: 'relative', flex: 1, opacity: 0}}>
            <Image
              priority={true}
              layout="fill"
              objectFit="cover"
              alt={`${country} Image`}
              loading="eager"
              src={background}
              onLoadingComplete={() => bgOpacity.start({opacity: 1})}
            />
          </motion.div>
        </div>
        <div className={styles.background_cover} />
        <LocSelector locModal={locModal} setLocModal={setLocModal} />
        <Layout>
          <ScrollList onScroll={toggleTitleVisibility} />
          <div ref={titleRef} className={styles.titleText}>
            <Fade duration={400} appear when={titleVis}>
              <div className={styles.mainText}>
                Beautiful Places of{' '}
                <span
                  onClick={() => setLocModal(true)}
                  className={styles.placeName}>
                  {country}
                </span>
              </div>
              <div className={styles.subTitle}>
                Plan your vacation on the most beatiful places.
              </div>
            </Fade>
          </div>
          <BottomMenu />
        </Layout>
      </div>
    </html>
  );
}

{
  /* <footer className={styles.footer}>
  <a
  href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
  target="_blank"
  rel="noopener noreferrer">
  Powered by{' '}
  <span className={styles.logo}>
  <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
  </span>
  </a>
</footer> */
}
