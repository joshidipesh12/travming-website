import React, {useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import Fade from 'react-reveal/Fade';
import Pulse from 'react-reveal/Pulse';
import {motion, useAnimation} from 'framer-motion';
import {useDispatch, useSelector} from 'react-redux';

import {getCities, getStates} from '../store/locations';
import styles from '../styles/Home.module.css';
import ScrollList from '../components/ScrollList';
import {useIsMobile} from '../hooks';
import BottomMenu from '../components/BottomMenu';
import LocSelector from '../components/LocSelector';
import Layout from '../components/Layout';
import config from '../config.json';

export default function Home() {
  const titleRef = useRef();
  const bgOpacity = useAnimation();
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const [locModal, setLocModal] = useState(false);
  const [titleVis, setTitleVisible] = useState(true);
  const [background, setBackground] = useState(config.countries['Australia']);

  const country = useSelector(state => state.hotel.country);

  useEffect(() => {
    // dispatch(getCities(country));
    dispatch(getStates(country));
    setBackground(config.countries[country]);
    // bgOpacity.start({opacity: 0})
    return () => {};
  }, [country]);

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <motion.div animate={bgOpacity} style={{position: 'relative', flex: 1}}>
          {/* <Image
            priority={true}
            layout="fill"
            objectFit="cover"
            alt={`${country} Image`}
            src={background}
            onLoadingComplete={() => bgOpacity.start({opacity: 1})}
          /> */}
        </motion.div>
      </div>
      <div className={styles.background_cover} />
      <LocSelector visible={locModal} closeModal={() => setLocModal(false)} />
      <Layout>
        <ScrollList
          titleCurr={
            (titleRef.current?.clientHeight ?? 0) +
            (titleRef.current?.offsetTop ?? 0)
          }
          onScroll={setTitleVisible}
        />
        <div ref={titleRef} className={styles.titleText}>
          <Fade collapse duration={400} appear when={titleVis}>
            <div className={styles.mainText}>
              Beautiful Places of{' '}
              <span
                data-width={country.length}
                onClick={() => setLocModal(true)}
                className={styles.placeName}>
                <Pulse delay={2000}>{country}</Pulse>
              </span>
            </div>
            <div className={styles.subTitle}>
              Plan your vacation at the most beatiful places.
            </div>
          </Fade>
        </div>
        <BottomMenu />
      </Layout>
    </div>
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
