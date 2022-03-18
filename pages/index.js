import React, {useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import Fade from 'react-reveal/Fade';
import Shake from 'react-reveal/Shake';
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
  const titleRef = useRef();
  const bgOpacity = useAnimation();
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const [locModal, setLocModal] = useState(false);
  const [titleVis, setTitleVisible] = useState(true);
  const [background, setBackground] = useState('/background1.png');

  const country = useSelector(state => state.hotel.country);

  useEffect(() => {
    // dispatch(getCities(country));
    dispatch(getStates(country));
    return () => {};
  }, [country]);

  return (
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
                onClick={() => setLocModal(true)}
                className={styles.placeName}>
                <Shake delay={2000}>{country}</Shake>
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
