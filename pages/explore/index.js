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
  const [height, width] = useWindowDimensions();
  const search = useState('');

  useEffect(() => {
    search[1](`${city ? `${city}, ` : ''}${state}, ${country}`);
  }, [state, country, city]);

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
              <div className={styles.see_more}>See More</div>
              <MdOutlineVerticalAlignBottom color="white" size={20} />
            </motion.button>
            <SearchBar
              searchState={search}
              showLocationSettings={() => setLocModal(true)}
            />
            <motion.div
              drag="x"
              style={{paddingLeft: '10%'}}
              whileHover={{cursor: 'grab'}}
              whileTap={{cursor: 'grabbing'}}
              dragConstraints={{left: -width / 1.9, right: width / 2.1}}
              className={styles.top_card_container}>
              {[1, 2, 3, 4, 5].map((i, _) => (
                <PlaceCard item={i} key={_} />
              ))}
            </motion.div>
            <motion.div
              drag="x"
              style={{paddingRight: '10%'}}
              whileHover={{cursor: 'grab'}}
              whileTap={{cursor: 'grabbing'}}
              dragConstraints={{left: -width / 2.1, right: width / 1.9}}
              className={styles.top_card_container}>
              {[1, 2, 3, 4, 5].map((i, _) => (
                <PlaceCard item={i} key={_} />
              ))}
            </motion.div>
          </div>
        </Layout>
        <div className={styles.bottom_container}>
          <SearchBar
            searchState={search}
            showLocationSettings={() => setLocModal(true)}
          />
          <div className={styles.main_bottom_container}>
            <div className={styles.list_container}>
              {nearbys.length ? <></> : <NoData />}
            </div>
            <div className={styles.details_container}></div>
          </div>
        </div>
      </Background>
    </div>
  );
}

const PlaceCard = ({item, active, setActive}) => {
  const thisRef = useRef();
  const [isShown, setShow] = useState(false);

  const tap2 = e => {
    // setActive(item);
  };

  return (
    <motion.div
      ref={thisRef}
      tabIndex={item}
      onClick={e => (!isShown ? setShow(true) : tap2(e))}
      initial={{scale: 0, translateY: 100}}
      animate={{scale: 1, translateY: 0, transition: {delay: 0.5}}}
      whileHover={{scale: 1.07}}
      whileFocus={{scale: 1.07}}
      whileTap={{scale: 0.97}}
      className={styles.card}></motion.div>
  );
};

const SearchBar = ({searchState, showLocationSettings}) => {
  const [search, setSearch] = searchState;

  return (
    <motion.div
      initial={{scaleX: 0}}
      animate={{scaleX: 1, transition: {delay: 1, duraion: 0.8}}}
      whileHover={{scale: 0.98}}
      className={styles.search_container}>
      <MdSearch color="grey" style={{marginRight: 10}} />
      <motion.input
        type="text"
        value={search}
        placeholder="Search Nearby"
        className={styles.search_input}
        onChange={e => setSearch(e.currentTarget.value)}
      />
      <IconButton onMouseDown={showLocationSettings}>
        <MdOutlinePinDrop size={15} color="grey" />
      </IconButton>
      <IconButton onMouseDown={showLocationSettings}>
        <MdSettings size={15} color="grey" />
      </IconButton>
    </motion.div>
  );
};

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
      No data recieved
      <br />
      Make sure your connection is working.
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
