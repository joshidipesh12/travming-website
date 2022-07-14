import React, {useEffect, useRef, useState} from 'react';
import {Layout, Background, LocSelector} from '../../components';
import {useIsMobile, useToggle, useWindowDimensions} from '../../hooks';
import styles from '../../styles/Explore.module.css';
import {motion, AnimatePresence} from 'framer-motion';
import {
  MdSearch,
  MdOutlinePinDrop,
  MdOutlineMobiledataOff,
  MdOutlineVerticalAlignBottom,
  MdClose,
} from 'react-icons/md';
import {IconButton} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import Img from 'next/image';
import {
  addSuggestionToHistory,
  getAutoCompleteSuggestions,
  resetSuggestions,
} from '../../store/explore';
import LinearProgress from '@material-ui/core/LinearProgress';
import decodeBH from '../../public/utils/blurHashDecoder';

export default function Home() {
  const containerRef = useRef();
  const [locModal, setLocModal] = useState(false);
  const [height, width] = useWindowDimensions();
  const {nearbys, hotels, country, city, state} = useSelector(
    state => state.hotel,
  );

  return (
    <div ref={containerRef} className={styles.container}>
      <LocSelector visible={locModal} closeModal={() => setLocModal(false)} />
      <Background>
        <Layout>
          <div className={styles.main}>
            {/* <motion.button
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
            </motion.button> */}
            <SearchBar
              initialValue={`${city ? `${city}, ` : ''}${state}, ${country}`}
              showLocationSettings={() => setLocModal(true)}
            />
            <motion.div
              drag="x"
              style={{paddingLeft: '10%'}}
              whileHover={{cursor: 'grab'}}
              whileTap={{cursor: 'grabbing'}}
              whileDrag={{cursor: 'grabbing'}}
              dragConstraints={{left: -width, right: width}}
              className={styles.top_card_container}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i, _) => (
                <PlaceCard store="hotel" item={i} key={_} index={_} />
              ))}
            </motion.div>
            <motion.div
              drag="x"
              style={{paddingRight: '10%'}}
              whileHover={{cursor: 'grab'}}
              whileTap={{cursor: 'grabbing'}}
              whileDrag={{cursor: 'grabbing'}}
              dragConstraints={{left: -width, right: width}}
              className={styles.top_card_container}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i, _) => (
                <PlaceCard store="explore" item={i} key={_} index={_} />
              ))}
            </motion.div>
          </div>
        </Layout>
        <div className={styles.bottom_container}>
          {/* <SearchBar
            searchState={search}
            showLocationSettings={() => setLocModal(true)}
          /> */}
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

const PlaceCard = ({item, index, active, setActive, store}) => {
  const thisRef = useRef();
  const isMobile = useIsMobile();
  const [height, width] = useWindowDimensions();
  const [isLoaded, setLoaded] = useState(false);
  const [isShown, setShow] = useState(false);

  const imageData = useSelector(state => state[store].images?.[index] ?? null);

  const tap2 = e => {
    // setActive(item);
  };

  useEffect(() => {
    if (!isShown) return () => {};
    setTimeout(() => {
      setShow(false);
      thisRef?.current?.blur();
    }, 5000);
    return () => {};
  }, [isShown]);

  return imageData ? (
    <motion.div
      ref={thisRef}
      onTap={e => (!isShown ? setShow(true) : tap2(e))}
      initial={{scale: 0, translateY: 100, borderRadius: 500}}
      animate={{
        scale: 1,
        translateY: 0,
        borderRadius: 3,
        transition: {delay: 1},
      }}
      whileHover={{scale: 1.07}}
      whileFocus={{scale: 1.07}}
      whileTap={{scale: 0.97}}
      className={styles.card}>
      <div className={styles.cardImage}>
        <Img
          objectFit="cover"
          layout="fill"
          src={imageData.urls[isMobile ? 'small' : 'regular']}
          placeholder="blur"
          draggable={false}
          blurDataURL={decodeBH(imageData.blur_hash)}
        />
      </div>
    </motion.div>
  ) : null;
};

const SearchBar = ({searchState, showLocationSettings, initialValue}) => {
  const inputRef = useRef();
  const [searchTimeout, setSearchTimeout] = useState();
  const [search, setSearch] = useState(initialValue);
  const dispatch = useDispatch();
  const [suggestions, tSuggestions] = useToggle();
  const {autoSuggestions, suggestionHistory, auto_load} = useSelector(
    state => state.explore,
  );

  useEffect(() => {
    if (search.length < 2) dispatch(resetSuggestions());
    else {
      clearTimeout(searchTimeout);
      setSearchTimeout(() =>
        setTimeout(() => {
          dispatch(getAutoCompleteSuggestions(search));
        }, 600),
      );
    }
    return () => {};
  }, [search]);

  return (
    <div style={{position: 'relative'}}>
      <motion.div
        initial={{scaleX: 0}}
        animate={{scaleX: 1, transition: {delay: 1, duraion: 0.8}}}
        whileHover={{scale: 0.98}}
        className={styles.search_container}>
        <MdSearch color="grey" style={{marginRight: 10}} />
        <motion.input
          type="text"
          value={search}
          ref={inputRef}
          onFocus={tSuggestions}
          onBlur={tSuggestions}
          placeholder="Search Nearby..."
          className={styles.search_input}
          onChange={e => setSearch(e.currentTarget.value)}
        />
        <IconButton
          style={{opacity: search ? 1 : 0}}
          onMouseDown={() => {
            setSearch('');
            setTimeout(() => inputRef.current.focus(), 10);
          }}>
          <MdClose size={15} color="grey" />
        </IconButton>
        <IconButton onMouseDown={showLocationSettings}>
          <MdOutlinePinDrop size={15} color="grey" />
        </IconButton>
      </motion.div>
      <AnimatePresence exitBeforeEnter>
        {suggestions && (autoSuggestions.length || suggestionHistory.length) ? (
          <motion.div
            transition={{duration: 0.3}}
            initial={{height: 0, width: '0%'}}
            animate={{height: 'fit-content', width: '100%'}}
            exit={{height: 0, width: '0%'}}
            className={styles.search_suggestion}>
            {auto_load ? <LinearProgress /> : null}
            <ul style={{padding: 0, margin: 0}}>
              {autoSuggestions.map((item, idx) => (
                <motion.li
                  key={idx}
                  onMouseDown={() => {
                    dispatch(addSuggestionToHistory(item));
                    console.log(item.geometry.coordinates);
                  }}
                  className={styles.suggestion}
                  whileHover={{
                    backgroundColor: 'rgba(200,200,200,1)',
                    cursor: 'pointer',
                  }}
                  initial={{opacity: 0, translateY: '50%'}}
                  animate={{
                    opacity: 1,
                    translateY: '0%',
                    transition: {delay: 0.3, duration: 0.5},
                  }}
                  exit={{opacity: 0, height: 0}}>
                  {item.properties.formatted}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
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
