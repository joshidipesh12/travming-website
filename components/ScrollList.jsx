import React, {useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import styles from '../styles/ScrollList.module.css';
import {useWindowDimensions, useIsMobile} from '../hooks';
import {
  HiOutlineArrowNarrowRight,
  HiOutlineArrowNarrowLeft,
} from 'react-icons/hi';
import {MdExplore, MdOutlineArrowRightAlt, MdCheck} from 'react-icons/md';
import Fade from 'react-reveal/Fade';
import {motion} from 'framer-motion';
import {useDispatch, useSelector} from 'react-redux';
import {Bounce, Sentry} from 'react-activity';
import 'react-activity/dist/Bounce.css';
import {setState} from '../store/hotels';

function ScrollList({onScroll}) {
  const scrollViewRef = useRef();
  const leftButtonRef = useRef();
  const rightButtonRef = useRef();
  const isMobile = useIsMobile();
  const {width, height} = useWindowDimensions();
  const states = useSelector(state => state.location.states);

  const showLeftButton = () => {
    leftButtonRef.current && scrollViewRef.current
      ? (leftButtonRef.current.style.opacity =
          width / 10 < scrollViewRef.current.scrollLeft ? 1 : 0)
      : null;
  };

  const hideRightButton = () => {
    const node = scrollViewRef.current;
    node && rightButtonRef.current
      ? (rightButtonRef.current.style.display =
          node.offsetWidth + node.scrollLeft >= node.scrollWidth ? 'none' : '')
      : null;
  };

  return (
    <div className={styles.container}>
      <div
        onScroll={() => {
          onScroll(
            isMobile
              ? height / 10 > scrollViewRef.current.scrollTop
              : width / 10 > scrollViewRef.current.scrollLeft,
          );
          showLeftButton();
          hideRightButton();
        }}
        ref={scrollViewRef}
        className={styles.list}>
        {isMobile ? (
          <div style={{height: '30vh', display: 'flex'}}></div>
        ) : (
          <div style={{width: '40vw', display: 'inline-flex'}}></div>
        )}
        {states.length ? (
          states.slice(0, 10).map((i, _) => <PlaceCard item={i} key={_} />)
        ) : (
          <PlaceCardLoading />
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
      <style jsx>{`
        @media (max-aspect-ratio: 2/3) {
        }
      `}</style>
    </div>
  );
}

const PlaceCard = ({item}) => {
  const isMobile = useIsMobile();
  const dispatch = useDispatch();
  const [imageSrc, setImageSrc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hover, setHover] = useState(false);
  const hotel = useSelector(s => s.hotel);
  const isSelected = hotel.state === item.name;

  useEffect(() => {
    setImageSrc(
      `https://source.unsplash.com/${window?.innerWidth}x${window?.innerHeight}/?${item.name}`,
    );
    return () => {};
  }, []);

  return (
    <motion.div
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      whileHover={{scale: 1.03}}
      whileInView={{scale: 0.9}}
      animate={{opacity: 1, translateY: 0}}
      style={{display: error ? 'none' : '', scale: 0.6}}
      className={styles.listItem}>
      <div className={styles.cardImg}>
        {loading ? (
          <Bounce
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            size={25}
            color="white"
          />
        ) : null}
        {imageSrc?.length ? (
          <Image
            layout="fill"
            objectFit="cover"
            alt={`${item.name} Card`}
            onLoadingComplete={() => setLoading(false)}
            onError={() => setError(true)}
            src={imageSrc}
          />
        ) : null}
        <div className={styles.place}>
          <div className={styles.placeName}>
            {item.name}
            {isMobile ? null : '\n'}
          </div>
          <Fade
            when={isMobile || hover}
            duration={isMobile ? 1000 : 400}
            right
            cascade>
            <div style={{display: 'flex'}}>
              <motion.button
                className={styles.option}
                onClick={() => dispatch(setState(item.name))}
                style={{backgroundColor: isSelected ? '#40be83' : '#0a66c2'}}>
                {isSelected ? (
                  isMobile ? (
                    <MdCheck />
                  ) : (
                    'Active'
                  )
                ) : isMobile ? (
                  <MdExplore />
                ) : (
                  'Select'
                )}
              </motion.button>
              <motion.button
                whileTap={{scale: 1.3}}
                onClick={() => {}}
                className={styles.option}
                style={{backgroundColor: isMobile ? 'white' : 'black'}}>
                {isMobile ? (
                  <MdOutlineArrowRightAlt color="black" />
                ) : (
                  'Explore'
                )}
              </motion.button>
            </div>
          </Fade>
        </div>
      </div>
    </motion.div>
  );
};

const PlaceCardLoading = () => {
  return [1, 2, 3, 4, 5].map(i => (
    <div
      key={i}
      style={{opacity: 1}}
      className={`${styles.listItem} ${styles.loadCard}`}></div>
  ));
};

export default ScrollList;
