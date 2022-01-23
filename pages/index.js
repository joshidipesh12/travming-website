import React, {useEffect, useRef, useState} from 'react';
import {
  RiHomeLine,
  RiMapPinLine,
  RiUserLine,
  RiCalendarLine,
} from 'react-icons/ri';
import Head from 'next/head';
import Image from 'next/image';
import {Fade} from 'react-reveal';
import {motion} from 'framer-motion';
import {BiChevronDown} from 'react-icons/bi';
import {useDispatch, useSelector} from 'react-redux';

import Layout from '../components/Layout';
import {getCities, getStates} from '../store/locations';
import styles from '../styles/Home.module.css';
import ScrollList from '../components/ScrollList';
import useWindowDimensions from '../hooks/useWindowDimensions';

export default function Home() {
  const titleRef = useRef(null);
  const dispatch = useDispatch();
  const {height, width} = useWindowDimensions();
  const [titleVis, setTitleVisible] = useState(true);
  const [date, setDate] = useState('19-06-2019');
  const [guests, setGuests] = useState({a: 3, k: 0});
  const [background, setBackground] = useState('/background.webp');
  const [accomodation, setAccomodation] = useState(
    '6730 Luna Land North Rhiannonmouth',
  );

  const country = useSelector(state => state.hotel.country);
  const city = useSelector(state => state.hotel.city);

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
    <div className={styles.container}>
      <Head>
        <title>TravMing - Round the World, Just A Few Clicks to Go ✈️</title>
        <meta name="description" content="Round the World, Just A Few Clicks" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div className={styles.background}>
          <div style={{position: 'relative', flex: 1}}>
            <Image
              priority={true}
              layout="fill"
              objectFit="cover"
              alt="background image"
              loading="eager"
              src={background}
            />
          </div>
        </div>
        <div className={styles.background_cover} />
        <Layout>
          <ScrollList onScroll={toggleTitleVisibility} />
          <div ref={titleRef} className={styles.titleText}>
            <Fade left when={titleVis}>
              <div className={styles.mainText}>
                Beautiful Places of{' '}
                <span className={styles.placeName}>{country}</span>
              </div>
              <div className={styles.subTitle}>
                Plan your vacation on the most beatiful places.
              </div>
            </Fade>
          </div>
          <form className={styles.locOptions}>
            <div className={styles.optionsTitle}>Plan Your Vacation</div>
            <div className={styles.optionsMain}>
              <div className={styles.menus} style={{borderWidth: '2px'}}>
                <div className={styles.menu} style={{width: '35%'}}>
                  <RiHomeLine size={20} color={iconColor} />
                  <div style={{flex: 1, paddingInline: '10px'}}>
                    <div className={styles.label}>Accomodation</div>
                    <div className={styles.selection}>{accomodation}</div>
                  </div>
                  <BiChevronDown size={20} color={iconColor} />
                </div>
                <Divider />
                <div className={styles.menu} style={{width: '25%'}}>
                  <RiMapPinLine size={20} color={iconColor} />
                  <div style={{flex: 1, paddingInline: '10px'}}>
                    <div className={styles.label}>City</div>
                    <div className={styles.selection}>{city}</div>
                  </div>
                  <BiChevronDown size={20} color={iconColor} />
                </div>
                <Divider />
                <div className={styles.menu} style={{width: '20%'}}>
                  <RiCalendarLine size={20} color={iconColor} />
                  <div style={{flex: 1, paddingInline: '10px'}}>
                    <div className={styles.label}>Date</div>
                    <div className={styles.selection}>{date}</div>
                  </div>
                  <BiChevronDown size={20} color={iconColor} />
                </div>
                <Divider />
                <div className={styles.menu} style={{width: '20%'}}>
                  <RiUserLine size={20} color={iconColor} />
                  <div style={{flex: 1, paddingInline: '10px'}}>
                    <div className={styles.label}>Guests</div>
                    <div className={styles.selection}>
                      {guests.a > 0
                        ? `${guests.a}${guests.k > 0 ? 'A' : ' Adults'} `
                        : null}
                      {guests.k > 0
                        ? `${guests.k}${guests.a > 0 ? 'U' : ' Kids'}`
                        : null}
                    </div>
                  </div>
                  <BiChevronDown size={20} color={iconColor} />
                </div>
              </div>
              <motion.button
                whileTap={{scale: 0.9}}
                className={styles.submit}
                type="button"
                onClick={() => {}}>
                Search
              </motion.button>
            </div>
          </form>
        </Layout>
      </div>
      {/* <footer className={styles.footer}>
        <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer">
        Powered by{' '}
        <span className={styles.logo}>
        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </span>
        </a>
      </footer> */}
    </div>
  );
}

const iconColor = 'rgba(231, 231, 242, 0.5)';

const Divider = () => (
  <div
    style={{
      backgroundColor: 'rgba(231, 231, 242, 0.3)',
      height: '100%',
      width: '2px',
    }}></div>
);
