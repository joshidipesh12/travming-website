import React, {useEffect, useRef, useState} from 'react';
import Fade from 'react-reveal/Fade';
import Pulse from 'react-reveal/Pulse';
import {useDispatch, useSelector} from 'react-redux';
import {setCity, setCoords} from '@f/store/hotels';
import {SiGooglemaps} from 'react-icons/si';

import {getCities, getStates} from '@f/store/locations';
import {
  ScrollList,
  BottomMenu,
  LocSelector,
  Layout,
  Background,
} from '@f/components';
import styles from '../../styles/Home.module.css';
import {useSnackbar} from 'react-simple-snackbar';

function Configure() {
  const titleRef = useRef();
  const dispatch = useDispatch();
  const [openSnackbar, closeSnackbar] = useSnackbar();
  const [locModal, setLocModal] = useState(false);
  const [titleVis, setTitleVisible] = useState(true);

  const {country, state, city} = useSelector(state => state.hotel);
  const {states, cities} = useSelector(state => state.location);

  useEffect(() => {
    dispatch(getStates(country));
    return () => {};
  }, [country]);

  useEffect(() => {
    if (state) {
      dispatch(getCities(country, state));
      dispatch(setCity(null));
      // dispatch(setCoords(null));
      openSnackbar(`State/Region Set to ${state}.`, [1500]);
    }
  }, [state]);

  return (
    <Background>
      <Layout>
        <LocSelector visible={locModal} closeModal={() => setLocModal(false)} />
        <ScrollList
          titleCurr={
            (titleRef.current?.clientHeight ?? 0) +
            (titleRef.current?.offsetTop ?? 0)
          }
          onScroll={setTitleVisible}
        />
        <div ref={titleRef} className={styles.titleText}>
          <Fade collapse duration={400} appear when={titleVis}>
            <div className={styles.mainText}>
              Beautiful Places of{' '}
              <span
                style={{display: 'flex', alignItems: 'center'}}
                onMouseDown={() => setLocModal(true)}
                className={styles.placeName}>
                <SiGooglemaps size={25} />
                <Pulse style={{display: 'flex'}} delay={2000}>
                  {country}
                </Pulse>
              </span>
            </div>
            <div className={styles.subTitle}>
              Plan your vacation at the most beatiful places.
            </div>
          </Fade>
        </div>
        <BottomMenu />
      </Layout>
    </Background>
  );
}

export default Configure;
