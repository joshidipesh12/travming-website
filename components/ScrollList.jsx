import React, {useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import styles from '../styles/ScrollList.module.css';
import useWindowDimensions from '../hooks/useWindowDimensions';
import useIsMobile from '../hooks/useIsMobile';
import {Bounce, Sentry} from 'react-activity';
import 'react-activity/dist/Bounce.css';
import {motion} from 'framer-motion';
import {
  HiOutlineArrowNarrowRight,
  HiOutlineArrowNarrowLeft,
} from 'react-icons/hi';
import {useSelector} from 'react-redux';
import {Fade} from 'react-reveal';

function ScrollList({onScroll}) {
  const scrollViewRef = useRef();
  const leftButtonRef = useRef();
  const rightButtonRef = useRef();
  const isMobile = useIsMobile();
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
          onScroll(
            isMobile
              ? height / 15 < scrollViewRef.current.scrollTop
              : width / 15 < scrollViewRef.current.scrollLeft,
          );
          showLeftButton();
          hideRightButton();
        }}
        ref={scrollViewRef}
        className={styles.list}>
        <div style={{width: '40vw', display: 'inline-flex'}}></div>
        {states.length ? (
          states.slice(0, 10).map((i, _) => <PlaceCard item={i} key={_} />)
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
  const isMobile = useIsMobile();
  const [cardDims, setCardDims] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (mainRef.current) {
      setCardDims(
        `${mainRef.current?.clientWidth}x${mainRef.current?.clientHeight}`,
      );
    }
    return () => {};
  }, [mainRef.current]);

  return (
    <motion.div
      ref={mainRef}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      animate={{opacity: 1, translateY: 0}}
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
            src={`https://source.unsplash.com/${cardDims}/?${item.name}`}
          />
        ) : null}
        <div className={styles.place}>
          <div className={styles.placeName}>
            {item.name}
            {'\n'}
          </div>
          <Fade duration={500} when={isMobile || hover} collapse right cascade>
            <div style={{display: 'flex'}}>
              <div
                className={styles.option}
                style={{backgroundColor: 'Highlight'}}>
                Select
              </div>
              <div className={styles.option}>Explore</div>
            </div>
          </Fade>
        </div>
      </div>
    </motion.div>
  );
};

export default ScrollList;
