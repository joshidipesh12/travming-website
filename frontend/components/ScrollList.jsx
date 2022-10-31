import React, {useEffect, useRef, useState} from 'react';
import Image from 'next/image';
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
import {setCoords, setState} from '../store/hotels';
import Link from 'next/link';

function ScrollList({onScroll}) {
  const scrollViewRef = useRef();
  const leftButtonRef = useRef();
  const rightButtonRef = useRef();
  const isMobile = useIsMobile();
  const [width, height] = useWindowDimensions();
  const states = useSelector(state => state.location.states);

  let showLeftButton, hideRightButton;

  useEffect(() => {
    showLeftButton = () => {
      leftButtonRef.current && scrollViewRef.current
        ? (leftButtonRef.current.style.opacity =
            width / 10 < scrollViewRef.current.scrollLeft ? 1 : 0)
        : null;
    };

    hideRightButton = () => {
      const node = scrollViewRef.current;
      node && rightButtonRef.current
        ? (rightButtonRef.current.style.display =
            node.offsetWidth + node.scrollLeft >= node.scrollWidth
              ? 'none'
              : '')
        : null;
    };
  }, []);

  return (
    <div className="container">
      <div
        onScroll={() => {
          onScroll(
            isMobile
              ? height / 10 > scrollViewRef.current.scrollTop
              : width / 10 > scrollViewRef.current.scrollLeft,
          );
          showLeftButton?.();
          hideRightButton?.();
        }}
        ref={scrollViewRef}
        className="list">
        {isMobile ? (
          <div style={{height: '30vh', display: 'flex'}}></div>
        ) : (
          <div style={{width: '40vw', display: 'inline-flex'}}></div>
        )}
        {states.length ? (
          states.slice(0, 15).map((i, _) => <PlaceCard item={i} key={_} />)
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
            className="rightIcon"
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
          className="leftIcon"
        />
      </div>
      <style jsx>{`
        .container {
          width: 80vw;
          height: calc(45 * var(--vh));
          position: absolute;
          right: 10vw;
          top: calc(22 * var(--vh));
        }

        .rightIcon {
          position: absolute;
          top: 50%;
          right: 5%;
          cursor: pointer;
          background-color: bisque;
          padding: 10px;
          border-radius: 20px;
          transition: all 0.2s ease;
        }

        .leftIcon {
          position: absolute;
          top: 50%;
          left: 5%;
          cursor: pointer;
          background-color: bisque;
          padding: 10px;
          border-radius: 20px;
          transition: all 0.1s ease;
        }

        .rightIcon:hover,
        .leftIcon:hover {
          transform: scale(1.2);
          background-color: white;
        }

        .list {
          height: 100%;
          width: 100%;
          overflow-x: auto;
          overflow-y: hidden;
          white-space: nowrap;
          mask-image: linear-gradient(
            90deg,
            transparent 1%,
            black 10%,
            black 90%,
            transparent 99%
          );
          border-top-right-radius: 30px;
          border-bottom-right-radius: 30px;
        }

        .list::-webkit-scrollbar {
          display: none;
        }
        @media (max-aspect-ratio: 2/3) {
          .container {
            width: 100vw;
            height: calc(78 * var(--vh));
            left: 0vw;
            top: calc(12 * var(--vh));
          }

          .rightIcon {
            display: none;
          }

          .list {
            overflow: auto;
            mask-image: linear-gradient(
              0deg,
              transparent 1%,
              black 10%,
              black 90%,
              transparent 99%
            );
            border-bottom-left-radius: 30px;
            border-bottom-right-radius: 30px;
            align-items: center;
          }
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
      className="listItem">
      <div className="cardImg">
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
        {
          imageSrc?.length ? null : null
          // <Image
          //   layout="fill"
          //   objectFit="cover"
          //   alt={`${item.name} Card`}
          //   onLoadingComplete={() => setLoading(false)}
          //   onError={() => setError(true)}
          //   src={imageSrc}
          // />
        }
        <div className="place">
          <div className="placeName">
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
                className="option"
                onClick={() => {
                  dispatch(setState(item.name));
                  // dispatch(setCoords(null));
                }}
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
                onClick={() => {
                  dispatch(setState(item.name));
                  // dispatch(setCoords(null));
                }}
                className="option"
                style={{backgroundColor: isMobile ? 'white' : 'black'}}>
                <Link passHref href="/explore">
                  {isMobile ? (
                    <MdOutlineArrowRightAlt color="black" />
                  ) : (
                    'Explore'
                  )}
                </Link>
              </motion.button>
            </div>
          </Fade>
        </div>
      </div>
      <style jsx>{`
        .listItem:last-child {
          margin-right: 3rem;
        }

        .listItem {
          display: inline-flex;
          background-color: rgba(25, 25, 25, 0.35);
          backdrop-filter: blur(20px);
          overflow: hidden;
          border-radius: 16px;
          width: 25vw;
          height: 85%;
          gap: 3%;
          margin-block: 3%;
          transition: all 0.2s ease-out;
          box-shadow: 0px 0px 5px grey;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          opacity: 0;
          transform: translateY(40%);
          cursor: pointer;
        }

        .cardImg {
          position: relative;
          height: 100%;
          width: 100%;
          border-radius: 16px;
          overflow: hidden;
        }

        .place {
          position: absolute;
          bottom: 0;
          width: 100%;
          background: linear-gradient(transparent, rgba(0, 0, 0, 1));
          padding-inline: 10%;
          padding-top: 15%;
          padding-bottom: 5%;
          display: flex;
          flex-direction: column;
        }

        .placeName {
          font-weight: bold;
          color: aliceblue;
          font-size: 1.2em;
          font-family: 'Courier New', Courier, monospace;
          flex: 1;
          text-overflow: ellipsis;
          overflow: hidden;
        }

        .option {
          padding-inline: 15px;
          padding-block: 5px;
          margin-right: 5%;
          margin-block: 2%;
          border-radius: 5px;
          font-size: smaller;
          color: azure;
          text-transform: uppercase;
          font-family: 'Lucida Sans', 'Lucida Sans Regular', Verdana, sans-serif;
        }

        @media (max-aspect-ratio: 2/3) {
          .listItem:last-child {
            margin-bottom: 3rem;
          }

          .listItem {
            display: flex;
            width: 80vw;
            height: 25vh;
            margin-inline: 10vw;
            margin-block: 0;
            box-shadow: 0 0 0 grey;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            opacity: 0;
            transform: translateY(30px);
          }

          .place {
            flex-direction: row;
            align-items: flex-end;
            font-size: large;
          }

          .option {
            display: inline-flex;
            padding: 5px;
            border-radius: 15px;
            margin-left: 10px;
            margin-block: 0px;
          }

          .listItem:last-child {
            margin-right: 0rem;
          }
        }
      `}</style>
    </motion.div>
  );
};

const PlaceCardLoading = () => {
  return [1, 2, 3, 4, 5].map(i => (
    <div key={i} style={{opacity: 1}} className={`$"listItem" $"loadCard"`}>
      <style jsx>{`
        .listItem:last-child {
          margin-right: 3rem;
        }

        .listItem {
          display: inline-flex;
          background-color: rgba(25, 25, 25, 0.35);
          backdrop-filter: blur(20px);
          overflow: hidden;
          border-radius: 16px;
          width: 25vw;
          height: 85%;
          gap: 3%;
          margin-block: 3%;
          transition: all 0.2s ease-out;
          box-shadow: 0px 0px 5px grey;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          opacity: 0;
          transform: translateY(40%);
          cursor: pointer;
        }

        .loadCard {
          transform: translateY(0px);
          transform: scale(0.9);
          animation: shimmer 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes shimmer {
          0%,
          100% {
            background-color: rgb(204, 204, 204);
          }
          50% {
            background-color: rgb(104, 104, 104);
          }
        }
        @media (max-aspect-ratio: 2/3) {
          .listItem:last-child {
            margin-bottom: 3rem;
          }

          .listItem {
            display: flex;
            width: 80vw;
            height: 25vh;
            margin-inline: 10vw;
            margin-block: 0;
            box-shadow: 0 0 0 grey;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            opacity: 0;
            transform: translateY(30px);
          }

          .loadCard {
            margin-block: 2%;
            scale: 0.8;
          }

          .listItem:last-child {
            margin-right: 0rem;
          }
        }
      `}</style>
    </div>
  ));
};

export default ScrollList;
