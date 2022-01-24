import React, {useRef, useState} from 'react';
import Image from 'next/image';
import styles from '../styles/ScrollList.module.css';
import useWindowDimensions from '../hooks/useWindowDimensions';
import {Bounce, Sentry} from 'react-activity';
import 'react-activity/dist/Bounce.css';
import {motion} from 'framer-motion';
import {
  HiOutlineArrowNarrowRight,
  HiOutlineArrowNarrowLeft,
} from 'react-icons/hi';
import {useSelector} from 'react-redux';

function ScrollList({onScroll}) {
  const scrollViewRef = useRef();
  const leftButtonRef = useRef();
  const rightButtonRef = useRef();
  const {width, height} = useWindowDimensions();
  const states = useSelector(state => state.location.states);

  const showLeftButton = () => {
    leftButtonRef.current.style.opacity =
      width / 10 < scrollViewRef.current.scrollLeft ? 1 : 0;
  };

  const hideRightButton = () => {
    const node = scrollViewRef.current;
    rightButtonRef.current.style.display =
      node.offsetWidth + node.scrollLeft >= node.scrollWidth ? 'none' : '';
  };

  return (
    <div className={styles.container}>
      <div
        onScroll={() => {
          onScroll(width / 10 < scrollViewRef.current.scrollLeft);
          showLeftButton();
          hideRightButton();
        }}
        ref={scrollViewRef}
        className={styles.list}>
        <div style={{width: '40vw', display: 'inline-flex'}}></div>
        {states.length ? (
          states.map((i, _) => <PlaceCard item={i} key={_} />)
        ) : (
          <Sentry size={30} color="white" />
        )}
      </div>
      {states.length > 2 ? (
        <div ref={rightButtonRef}>
          <HiOutlineArrowNarrowRight
            onClick={() => {
              scrollViewRef.current.scrollBy({
                top: 0,
                left: width / 3 + 20,
                behavior: 'smooth',
              });
            }}
            color="black"
            size={40}
            className={styles.rightIcon}
          />
        </div>
      ) : null}
      <div style={{opacity: 0}} ref={leftButtonRef}>
        <HiOutlineArrowNarrowLeft
          onClick={() => {
            scrollViewRef.current.scrollBy({
              top: 0,
              left: -width / 3 - 20,
              behavior: 'smooth',
            });
          }}
          color="black"
          size={40}
          className={styles.leftIcon}
        />
      </div>
    </div>
  );
}

const PlaceCard = ({item}) => {
  const mainRef = useRef();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <motion.div
      whileHover={{scale: 1.1}}
      whileTap={{scale: 0.9}}
      ref={mainRef}
      style={{display: error ? 'none' : ''}}
      className={styles.listItem}>
      <div className={styles.cardImg}>
        {loading ? (
          <Bounce
            style={{position: 'absolute', top: '50%', left: '40%'}}
            size={30}
            color="white"
          />
        ) : null}
        {mainRef.current ? (
          <Image
            layout="fill"
            objectFit="cover"
            alt={`${item.name} Card`}
            onLoadingComplete={() => setLoading(false)}
            onError={() => setError(true)}
            src={`https://source.unsplash.com/${mainRef.current.clientWidth}x${mainRef.current.clientHeight}/?${item.name}`}
          />
        ) : null}
        <div className={styles.placeName}>{item.name}</div>
      </div>
    </motion.div>
  );
};

export default ScrollList;
