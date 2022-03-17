import React, {useEffect, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {
  RiCloseFill,
  RiMenu4Fill,
  RiMapPinUserFill,
  RiRefreshLine,
} from 'react-icons/ri';
import Modal from './Modal';
import {Sentry} from 'react-activity';
import {useDispatch, useSelector} from 'react-redux';
import 'react-activity/dist/library.css';

import {getLocByCoords} from '../store/hotels';

export default function LocSelector({locModal, setLocModal}) {
  const dispatch = useDispatch();
  const [manual, setManual] = useState(true);
  const [loc, setLocation] = useState();

  const location = useSelector(state => state.hotel);

  const getLoc = () => {
    setLocation();
    setTimeout(() => {
      navigator?.geolocation?.getCurrentPosition(
        pos =>
          setLocation({long: pos.coords.longitude, lat: pos.coords.latitude}),
        err => setLocation({error: err.message}),
      );
    }, 1000);
  };

  useEffect(() => {
    if (loc?.long && loc?.lat) dispatch(getLocByCoords(loc.lat, loc.long));
    return () => {};
  }, [loc?.long, loc?.lat]);

  useEffect(() => {
    if (!manual && !loc?.lat && !loc?.long) getLoc();
    return () => {};
  }, [manual]);

  return (
    <AnimatePresence initial={false} exitBeforeEnter={true}>
      {locModal ? (
        <Modal close={() => setLocModal(false)}>
          <div className="container" style={styles.container}>
            {manual ? (
              <div style={styles.auto}>
                <h2 style={{color: 'white'}}>Select Your Desired Location</h2>
                <RiCloseFill
                  color="white"
                  size={25}
                  style={styles.close}
                  onClick={() => setLocModal(false)}
                />
                <RiMapPinUserFill
                  onClick={() => setManual(!manual)}
                  color="white"
                  size={25}
                  style={styles.back}
                />
              </div>
            ) : (
              <div style={styles.auto}>
                {!loc || location.locLoading ? (
                  <>
                    <h2 style={{color: 'white'}}>Getting Your Location</h2>
                    <Sentry speed={0.5} size={50} color="white" />
                  </>
                ) : (
                  <>
                    {loc.error ? (
                      <div style={{alignContent: 'center'}}>
                        <div style={styles.error}>Error!</div>
                        <div>{loc.error}</div>
                      </div>
                    ) : (
                      <>
                        <img src="/icons/home_loc.svg" />
                        <h2 style={{color: 'HighlightText'}}>
                          {location.state}, {location.country}
                        </h2>
                      </>
                    )}
                    <div onClick={getLoc} style={styles.retry}>
                      <RiRefreshLine color="white" size={20} />
                      <span style={{color: 'white', fontWeight: 'bold'}}>
                        REFRESH
                      </span>
                    </div>
                  </>
                )}
                <RiCloseFill
                  color="white"
                  size={25}
                  style={styles.close}
                  onClick={() => setLocModal(false)}
                />
                <RiMenu4Fill
                  onClick={() => setManual(!manual)}
                  color="white"
                  size={25}
                  style={styles.back}
                />
              </div>
            )}
          </div>

          <style jsx>{`
            .container {
              width: 40vw;
            }

            @media (max-width: 750px) {
              .container {
                width: 80vw;
              }
            }
          `}</style>
        </Modal>
      ) : null}
    </AnimatePresence>
  );
}

const styles = {
  container: {
    backgroundColor: '#ffffff29',
    backdropFilter: 'blur(20px)',
    borderRadius: 10,
    padding: 10,
    height: '50vh',
    display: 'flex',
  },
  auto: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  close: {
    position: 'absolute',
    top: 20,
    right: 20,
    cursor: 'pointer',
  },
  back: {
    position: 'absolute',
    top: 20,
    left: 20,
    cursor: 'pointer',
  },
  retry: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    color: 'white',
    height: 20,
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 20,
    textTransform: 'uppercase',
  },
  address: {},
};
