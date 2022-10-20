import React, {useEffect, useState, useRef} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {useDispatch, useSelector} from 'react-redux';
import Modal from './Modal';
import {useToggle} from '../hooks';
import config from '../config.json';
import {FiChevronDown} from 'react-icons/fi';
import {
  getCoordsByLoc,
  getLocByCoords,
  setCity,
  setCoords,
  setCountry,
  setState,
} from '../store/hotels';
import {CircularProgress, Menu, MenuItem} from '@material-ui/core';

const LocSelector = ({visible, closeModal}) => {
  const {countries} = config;
  const dispatch = useDispatch();
  const [isNearby, flipMode] = useToggle();
  const [countryMenu, setCountryMenu] = useState(null);
  const [stateMenu, setStateMenu] = useState(null);
  const [cityMenu, setCityMenu] = useState(null);

  const {state, country, city, coords} = useSelector(state => state.hotel);
  const {states, cities} = useSelector(state => state.location);

  useEffect(() => {
    if (states.length) {
      if (!state) {
        dispatch(setState(states[0].name));
        // dispatch(setCoords(null));
      }
    }
  }, [states]);

  useEffect(() => {
    if (!coords?.length) {
      if (!city?.length) dispatch(getCoordsByLoc('state', country, state));
      else dispatch(getCoordsByLoc('city', country, state, city));
    }
  }, [coords]);

  useEffect(() => {
    window.addEventListener('keydown', e => {
      if (e.code === 'Escape') {
        closeModal();
        return () => window.removeEventListener('keydown');
      }
    });
    return () => {};
  }, []);

  return (
    <>
      <AnimatePresence initial={false} exitBeforeEnter>
        {visible ? (
          <Modal animVariants={animVariant} close={closeModal}>
            <div className="LS_container">
              {!isNearby ? (
                <div className="LS_container_select">
                  <div className="LS_label">Select Country</div>
                  <motion.button
                    onClick={e => setCountryMenu(e.currentTarget)}
                    className="LS_selectButton"
                    whileHover={{
                      cursor: 'pointer',
                      backgroundColor: '#e7e7ea',
                      boxShadow: '0 0 0 grey',
                    }}>
                    {country}
                    <FiChevronDown color="#c9ced7" className="LS_chevronDown" />
                  </motion.button>
                  <Menu
                    variant="menu"
                    anchorOrigin={{horizontal: 'center'}}
                    anchorEl={countryMenu}
                    open={Boolean(countryMenu)}
                    onClose={() => setCountryMenu(null)}>
                    {Object.keys(countries).map((c, i) => (
                      <MenuItem
                        key={i}
                        selected={c === country}
                        onClick={() => {
                          dispatch(setCountry(c));
                          // dispatch(setCoords(null));
                          setCountryMenu(null);
                        }}>
                        {c}
                      </MenuItem>
                    ))}
                  </Menu>
                  <div className="LS_label">Select State/Region</div>
                  <motion.button
                    onClick={e => setStateMenu(e.currentTarget)}
                    whileHover={{
                      cursor: 'pointer',
                      backgroundColor: '#e7e7ea',
                      boxShadow: '0 0 0 grey',
                    }}
                    className="LS_selectButton">
                    {states.length ? state : 'Loading States...'}
                    {states.length ? (
                      <FiChevronDown
                        color="#c9ced7"
                        className="LS_chevronDown"
                      />
                    ) : (
                      <CircularProgress size={10} className="LS_chevronDown" />
                    )}
                  </motion.button>
                  {states.length ? (
                    <Menu
                      anchorOrigin={{horizontal: 'right'}}
                      anchorEl={stateMenu}
                      open={Boolean(stateMenu)}
                      onClose={() => setStateMenu(null)}>
                      {states.map((s, i) => (
                        <MenuItem
                          key={i}
                          selected={s.name === state}
                          onClick={() => {
                            dispatch(setState(s.name));
                            // dispatch(setCoords(null));

                            setStateMenu(null);
                          }}>
                          {s.name}
                        </MenuItem>
                      ))}
                    </Menu>
                  ) : null}
                  <div className="LS_label">Select City/Town</div>
                  <motion.button
                    onClick={e => setCityMenu(e.currentTarget)}
                    whileHover={{
                      cursor: 'pointer',
                      backgroundColor: '#e7e7ea',
                      boxShadow: '0 0 0 grey',
                    }}
                    className="LS_selectButton">
                    {cities.length
                      ? city
                        ? city
                        : `All Cities`
                      : 'Loading Cities...'}
                    {cities.length ? (
                      <FiChevronDown
                        color="#c9ced7"
                        className="LS_chevronDown"
                      />
                    ) : (
                      <CircularProgress size={10} className="LS_chevronDown" />
                    )}
                  </motion.button>
                  {states.length ? (
                    <Menu
                      anchorOrigin={{horizontal: 'right'}}
                      anchorEl={cityMenu}
                      open={Boolean(cityMenu)}
                      onClose={() => setCityMenu(null)}>
                      <MenuItem
                        key={-1}
                        selected={city === null}
                        onClick={() => {
                          dispatch(setCity(null));
                          // dispatch(setCoords(null));
                          setCityMenu(null);
                        }}>
                        All Cities of {state}
                      </MenuItem>
                      {cities.map((c, i) => (
                        <MenuItem
                          key={i}
                          selected={c === city}
                          onClick={() => {
                            dispatch(setCity(c));
                            // dispatch(setCoords(null));
                            setCityMenu(null);
                          }}>
                          {c}
                        </MenuItem>
                      ))}
                    </Menu>
                  ) : null}
                  <motion.button
                    onClick={() => closeModal()}
                    whileHover={{scale: 1.05}}
                    whileTap={{scale: 0.95}}
                    className="LS_done">
                    Done
                  </motion.button>
                </div>
              ) : (
                <div style={{flex: 1}}>here1</div>
              )}
            </div>
          </Modal>
        ) : null}
        <style jsx>{`
          .LS_container {
            background: #f0f0f0;
            border-radius: 4px;
            width: clamp(10rem, 95vw, 15rem);
            height: 65vh;
            display: flex;
            background: linear-gradient(#cac0e6, #9497e0);
          }

          .LS_container_select {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-evenly;
          }

          .LS_label {
            color: beige;
            text-transform: uppercase;
            font-size: small;
            font-weight: bold;
          }

          .LS_selectButton {
            color: #3b3c49;
            background-color: #fafafc;
            box-shadow: 0 0 5px grey;
            width: 80%;
            height: 10%;
            border-radius: 7px;
            font-weight: bold;
            font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS',
              sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: -8%;
            padding-inline: 10%;
            flex-wrap: wrap;
            position: relative;
          }

          .LS_chevronDown {
            position: absolute;
            right: 5%;
            top: 50%;
            transform: translateY(-50%);
          }

          .LS_done {
            color: #fff;
            background-color: #a1a3e1;
            border-radius: 20px;
            padding: 3% 8%;
            box-shadow: 0 0 10px #797bbb;
            font-weight: bold;
            text-transform: uppercase;
            margin: -5% 0;
            cursor: pointer;
          }

          @media (max-aspect-ratio: 2/3) {
            .LS_container {
              height: 55vh;
              width: clamp(10rem, 80vw, 20rem);
            }
          }
        `}</style>
      </AnimatePresence>
    </>
  );
};

const animVariant = () => ({
  hidden: {translateY: '100vh'},
  visible: {translateY: '0vh'},
  exit: {translateY: '100vh'},
});

export default LocSelector;
