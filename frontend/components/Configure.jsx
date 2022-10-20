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
        <div ref={titleRef} className="titleText">
          <Fade collapse duration={400} appear when={titleVis}>
            <div className="mainText">
              Beautiful Places of{' '}
              <span
                style={{display: 'flex', alignItems: 'center'}}
                onMouseDown={() => setLocModal(true)}
                className="placeName">
                <SiGooglemaps size={25} />
                <Pulse style={{display: 'flex'}} delay={2000}>
                  {country}
                </Pulse>
              </span>
            </div>
            <div className="subTitle">
              Plan your vacation at the most beatiful places.
            </div>
          </Fade>
        </div>
        <BottomMenu />
      </Layout>
      <style jsx>{`
        .titleText {
          position: absolute;
          top: 25%;
          left: 10vw;
          width: 40vw;
        }

        .mainText {
          color: white;
          font-family: 'Carter One', sans-serif;
          font-size: 4vw;
          line-height: 130%;
        }

        .placeName {
          transition: all 0.4s ease-out;
          text-transform: uppercase;
          display: inline;
          white-space: nowrap;
          color: #ffd500;
          text-shadow: 0 0 5px rgb(45, 45, 45);
        }

        .placeName > * {
          width: fit-content;
        }

        .placeName > *::before {
          width: 0%;
          content: ' ';
          display: block;
          height: 5%;
          left: -5%;
          bottom: 0%;
          position: absolute;
          background: #ffd500;
          transition: all 0.2s ease-out;
          z-index: -1;
          border-radius: 5px;
        }

        .placeName > *:hover::before {
          width: 110%;
        }

        .placeName:hover,
        .placeName:focus {
          cursor: pointer;
          color: rgb(255, 255, 255);
        }

        .subTitle {
          color: white;
          margin-top: 10px;
          margin-left: 10px;
          width: 82%;
        }

        @media (max-aspect-ratio: 2/3) {
          .titleText {
            top: 15%;
            align-self: center;
            width: 80vw;
            text-align: center;
          }

          .mainText {
            color: white;
            font-family: 'Carter One', sans-serif;
            font-size: 14vw;
          }

          .placeName {
            transition: all 0.2s ease-out;
            display: flex;
            justify-content: center;
          }

          .subTitle {
            display: none;
          }
        }
      `}</style>
    </Background>
  );
}

export default Configure;
