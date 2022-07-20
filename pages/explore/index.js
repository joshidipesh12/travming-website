import React, {useEffect, useRef, useState} from 'react';
import {Layout, Background, LocSelector} from '../../components';
import {useIsMobile, useToggle, useWindowDimensions} from '../../hooks';
import styles from '../../styles/Explore.module.css';
import {motion, AnimatePresence} from 'framer-motion';
import {
  MdSearch,
  MdOutlinePinDrop,
  MdOutlineMobiledataOff,
  MdClose,
} from 'react-icons/md';
import {IconButton} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import Image from 'next/image';
import {
  addSuggestionToHistory,
  getAutoCompleteSuggestions,
  getNearbys,
  resetSuggestions,
} from '../../store/explore';
import LinearProgress from '@material-ui/core/LinearProgress';
import decodeBH from '../../public/utils/blurHashDecoder';
import {
  getHotels,
  setCity,
  setCoords,
  setCountry,
  setState,
} from '../../store/hotels';

export default function Home() {
  const containerRef = useRef();
  const dispatch = useDispatch();
  const [locModal, setLocModal] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [height, width] = useWindowDimensions();
  const {hotels, hotelsLoading, country, city, state, coords} = useSelector(
    state => state.hotel,
  );
  const {nearbys, nearbysLoading} = useSelector(state => state.explore);

  useEffect(() => {
    if (coords?.length) {
      dispatch(getHotels(coords));
      dispatch(getNearbys(coords, null));
    }
    return () => {};
  }, [coords?.[0], coords?.[1]]);

  const scrollToStart = (top = height) => {
    containerRef.current.scrollBy({
      top,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div ref={containerRef} className={styles.container}>
      <LocSelector visible={locModal} closeModal={() => setLocModal(false)} />
      <Background>
        <Layout>
          <div className={styles.main}>
            <SearchBar
              initialValue={`${city ? `${city}, ` : ''}${state}, ${country}`}
              showLocationSettings={() => setLocModal(true)}
            />
            {!hotelsLoading && !nearbysLoading ? (
              nearbys.length > 4 && hotels.length > 4 ? (
                <>
                  <motion.div
                    drag="x"
                    style={{paddingLeft: '10%'}}
                    whileHover={{cursor: 'grab'}}
                    whileTap={{cursor: 'grabbing'}}
                    whileDrag={{cursor: 'grabbing'}}
                    dragConstraints={{left: -width, right: width}}
                    className={styles.top_card_container}>
                    {hotels?.map((i, _) => (
                      <PlaceCard
                        active={activeItem}
                        setActive={setActiveItem}
                        store="hotel"
                        item={i}
                        key={_}
                        index={_}
                        onClick={scrollToStart}
                      />
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
                    {nearbys?.map((i, _) => (
                      <PlaceCard
                        active={activeItem}
                        setActive={setActiveItem}
                        store="explore"
                        item={i}
                        key={_}
                        index={_}
                        onClick={scrollToStart}
                      />
                    ))}
                  </motion.div>
                </>
              ) : (
                <NoData />
              )
            ) : (
              <motion.div
                initial={{scale: 0}}
                animate={{scale: 1}}
                className={styles.loading_places}>
                <Image
                  layout="fill"
                  src="/icons/loading_places.svg"
                  alt="loading"
                  priority={true}
                />
              </motion.div>
            )}
          </div>
        </Layout>
        <div className={styles.bottom_container}>
          <div className={styles.main_bottom_container}>
            {hotels.length || nearbys.length ? (
              <div className={styles.list_container}>
                {hotels?.map((i, _) => (
                  <PlaceCard
                    active={activeItem}
                    setActive={setActiveItem}
                    store="hotel"
                    item={i}
                    key={_}
                    index={_}
                  />
                ))}
              </div>
            ) : (
              <NoData />
            )}
            <AnimatePresence>
              {activeItem ? (
                <motion.div
                  transition={{delay: 0.4}}
                  initial={{translateX: '150%', flex: 0}}
                  animate={{translateX: '0%', flex: 1}}
                  exit={{translateX: '150%', flex: 0}}
                  className={styles.details_container}>
                  <IconButton
                    style={{position: 'absolute', top: 20, right: 20}}
                    onClick={() => {
                      setActiveItem(null);
                      scrollToStart(0);
                    }}>
                    <MdClose size={15} color="grey" />
                  </IconButton>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </Background>
    </div>
  );
}

const PlaceCard = ({item, index, active, setActive, store, onClick}) => {
  const thisRef = useRef();
  const isMobile = useIsMobile();
  const [height, width] = useWindowDimensions();
  const [isLoaded, setLoaded] = useState(false);
  const [isShown, setShow] = useState(false);

  const {properties, geometry} = item;
  const totalImages = useSelector(state => state[store].images?.length ?? 0);
  const imageData = useSelector(
    state => state[store].images?.[index % totalImages] ?? null,
  );

  const tap2 = e => {
    onClick?.();
    setActive(item);
  };

  useEffect(() => {
    if (!isShown) return () => {};
    setTimeout(() => {
      setShow(false);
      thisRef?.current?.blur();
    }, 5000);
    return () => null;
  }, [isShown]);

  return imageData ? (
    <AnimatePresence>
      <motion.div
        ref={thisRef}
        tabIndex={index}
        onMouseDown={e => {
          isShown ? tap2(e) : setShow(true);
        }}
        initial={{scale: 0, translateY: 100, borderRadius: 500}}
        animate={{
          scale: 1,
          translateY: 0,
          borderRadius: 3,
          transition: {delay: 1},
        }}
        exit={{scale: 0, translateY: 100, borderRadius: 500}}
        whileHover={{scale: !isMobile ? 1.07 : 1}}
        whileFocus={{scale: !isMobile ? 1.07 : 1}}
        whileTap={{scale: !isMobile ? 0.97 : 1}}
        className={styles.card}>
        <div className={styles.cardImage}>
          <Image
            alt={properties.name}
            objectFit="cover"
            layout="fill"
            src={imageData.urls[isMobile ? 'small' : 'regular']}
            placeholder="blur"
            draggable={false}
            onContextMenu={e => e.preventDefault()}
            blurDataURL={decodeBH(imageData.blur_hash)}
          />
        </div>
        <div className={styles.card_content}></div>
      </motion.div>
    </AnimatePresence>
  ) : null;
};

const result_type = {
  country: '#5fbb97',
  state: '#63326e',
  city: '#d64045',
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

  const updateLocation = item => {
    setSearch(item.properties.formatted);
    dispatch(addSuggestionToHistory(item));
    // dispatch(setCoords(item?.geometry?.coordinates));
    dispatch(setCountry(item.properties?.country));
    dispatch(setState(item.properties?.state));
    dispatch(setCity(item.properties?.city));
  };

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
              {autoSuggestions.map((item, idx) =>
                true ||
                Object.keys(result_type).includes(
                  item?.properties?.result_type,
                ) ? (
                  <motion.li
                    key={idx}
                    onMouseDown={() => {
                      updateLocation(item);
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
                    <span
                      style={{
                        color: result_type[item?.properties?.result_type],
                        borderColor: result_type[item?.properties?.result_type],
                      }}
                      className={styles.result_type}>
                      {item?.properties?.result_type}
                    </span>
                  </motion.li>
                ) : null,
              )}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

const NoData = () => (
  <motion.div
    initial={{opacity: 0, translateY: 100}}
    animate={{opacity: 1, translateY: 0, transition: {delay: 1}}}
    style={{
      height: '100%',
      minHeight: '40vh',
      widht: '100vw',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
    <MdOutlineMobiledataOff color="grey" size={30} />
    <div style={{color: 'grey', textAlign: 'center'}}>
      No Data Recieved
      <br />
      Try Again with a different keyword.
    </div>
  </motion.div>
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
