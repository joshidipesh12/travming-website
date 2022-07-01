import React, {useEffect, useRef, useState} from 'react';
import {Layout, Background, LocSelector} from '../../components';
import {useWindowDimensions} from '../../hooks';
import styles from '../../styles/Explore.module.css';
import {motion} from 'framer-motion';
import {
  MdSearch,
  MdSettings,
  MdOutlinePinDrop,
  MdOutlineMobiledataOff,
  MdOutlineVerticalAlignBottom,
} from 'react-icons/md';
import {IconButton} from '@material-ui/core';
import {useSelector} from 'react-redux';

export default function Home() {
  const containerRef = useRef();
  const [locModal, setLocModal] = useState(false);
  const {nearbys, hotels, country, city, state} = useSelector(
    state => state.hotel,
  );
  const {height, width} = useWindowDimensions();
  const [search, setSearch] = useState('');

  useEffect(() => {}, [state, country, city]);

  return (
    <div ref={containerRef} className={styles.container}>
      <LocSelector visible={locModal} closeModal={() => setLocModal(false)} />
      <Background>
        <Layout>
          <div className={styles.main}>
            <motion.button
              onClick={() => {
                containerRef?.current?.scrollBy({
                  top: height,
                  left: 0,
                  behavior: 'smooth',
                });
              }}
              className={styles.see_all}>
              <MdOutlineVerticalAlignBottom color="white" size={20} />
            </motion.button>
            <motion.div
              initial={{scaleX: 0}}
              animate={{scaleX: 1, transition: {delay: 1, duraion: 0.8}}}
              style={{translateY: '120%'}}
              whileHover={{scale: 0.98}}
              className={styles.search_container}>
              <MdSearch color="grey" style={{marginRight: 10}} />
              <motion.input
                type="text"
                placeholder="Search Nearby"
                className={styles.search_input}
              />
              <IconButton onClick={() => setLocModal(true)}>
                <MdOutlinePinDrop size={15} color="grey" />
              </IconButton>
              <IconButton onClick={() => setLocModal(true)}>
                <MdSettings size={15} color="grey" />
              </IconButton>
            </motion.div>
            <motion.div
              drag="x"
              dragConstraints={{left: 0, right: 0}}
              className={styles.top_card_container}>
              {[1, 2, 3, 4].map((i, _) => (
                <motion.div
                  transition={{delay: 0.5}}
                  initial={{scale: 0, translateY: -100}}
                  animate={{scale: 1, translateY: 0}}
                  key={_}
                  className={styles.card}></motion.div>
              ))}
            </motion.div>
            <motion.div
              drag="x"
              dragConstraints={{left: 0, right: 0}}
              className={styles.top_card_container}>
              {[1, 2, 3, 4].map((i, _) => (
                <motion.div
                  transition={{delay: 0.5}}
                  initial={{scale: 0, translateY: -100}}
                  animate={{scale: 1, translateY: 0}}
                  key={_}
                  className={styles.card}></motion.div>
              ))}
            </motion.div>
          </div>
        </Layout>
        <div className={styles.bottom_container}>
          {nearbys.length ? <></> : <NoData />}
        </div>
      </Background>
    </div>
  );
}

const NoData = () => (
  <div
    style={{
      height: '100vh',
      widht: '100vw',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
    <MdOutlineMobiledataOff color="grey" size={30} />
    <div style={{color: 'grey', textAlign: 'center'}}>
      No data revieved
      <br />
      Make sure you connection is working.
    </div>
  </div>
);

/*
onClick={() => {
  containerRef.current.scrollBy({
    top: height,
    left: 0,
    behavior: 'smooth',
  });
}}
*/
