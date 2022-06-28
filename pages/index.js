import React, {useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import Fade from 'react-reveal/Fade';
import Pulse from 'react-reveal/Pulse';
import {useDispatch, useSelector} from 'react-redux';
import {setCity} from '../store/hotels';

import {getCities, getStates} from '../store/locations';
import {
  ScrollList,
  BottomMenu,
  LocSelector,
  Layout,
  Background,
} from '../components';
import styles from '../styles/Home.module.css';
import {useIsMobile} from '../hooks';

export default function Home() {
  const titleRef = useRef();
  const dispatch = useDispatch();
  const [locModal, setLocModal] = useState(false);
  const [titleVis, setTitleVisible] = useState(true);

  const {country, state, city} = useSelector(state => state.hotel);
  const {states, cities} = useSelector(state => state.location);

  useEffect(() => {
    dispatch(getStates(country));
    return () => {};
  }, [country]);

  useEffect(() => {
    dispatch(getCities(country, state));
  }, [state]);

  useEffect(() => {}, []);

  return (
    <Background>
      <Layout>
        <LocSelector visible={locModal} closeModal={() => setLocModal(false)} />
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
    </Background>
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
