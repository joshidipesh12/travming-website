import React, {useState, useRef, useEffect} from 'react';
import {RiMapPinLine, RiUserLine, RiCalendarLine} from 'react-icons/ri';
import {BiChevronDown, BiX, BiSearch} from 'react-icons/bi';
import styles from '../styles/Home.module.css';
import {useSelector, useDispatch} from 'react-redux';
import {AnimatePresence, motion} from 'framer-motion';
import {DatePicker} from '@material-ui/pickers';
import {useIsMobile} from '../hooks';
import {Menu, MenuItem, Popover, Slider} from '@material-ui/core';
import {setCity, setCoords} from '../store/hotels';
import dayjs from 'dayjs';
import Modal from './Modal';
import {useRouter} from 'next/router';

const BottomMenu = ({}) => {
  const isMobile = useIsMobile();
  const dispatch = useDispatch();
  const router = useRouter();
  const [roomMenu, setRoomMenu] = useState();
  const [cityMenu, setCityMenu] = useState();
  const [rooms, setRooms] = useState({a: 3, k: 0});
  const [tripModal, setTripModal] = useState(false);
  const [date, setDate] = useState(dayjs().format('ddd, MMM D YYYY'));

  const {city, state} = useSelector(state => state.hotel);
  const {cities} = useSelector(state => state.location);

  useEffect(() => {
    window.addEventListener('keydown', e => {
      if (e.code === 'Escape') {
        setTripModal(false);
        return () => window.removeEventListener('keydown');
      }
    });
    return () => {};
  }, []);

  const search = () => router.push('/explore');

  return (
    <form onSubmit={e => e.preventDefault()}>
      {/* // Mobile Options */}
      <div className={styles.bottom_mobileModal}>
        <motion.button
          transition={{delay: 0.6, duration: 0.6}}
          animate={{translateY: '0%', scaleX: 1}}
          initial={{translateY: '200%', scaleX: 0}}
          onClick={() => setTripModal(true)}
          whileTap={{scale: 0.9}}
          className={styles.mobLocOptions}>
          Setup Your Holiday
        </motion.button>
        <AnimatePresence initial={false} exitBeforeEnter>
          {tripModal ? (
            <Modal
              backdropStyle={{backdropFilter: null}}
              close={() => setTripModal(false)}>
              <div className={styles.bottom_modalContainer}>
                <div className={styles.bottom_modalHead}>
                  Book your vacation
                  <div className={styles.bottom_modalButtons}>
                    <motion.button
                      onClick={search}
                      whileTap={{backgroundColor: '#609060'}}
                      className={styles.bottom_modalButton}>
                      <BiSearch color="white" size={20} />
                    </motion.button>
                    <Divider />
                    <motion.button
                      onClick={() => setTripModal(false)}
                      whileTap={{backgroundColor: '#609060'}}
                      className={styles.bottom_modalButton}>
                      <BiX color="white" size={28} />
                    </motion.button>
                  </div>
                </div>
                <div className={styles.bottom_modalOptions}>
                  <motion.button
                    onClick={e => setCityMenu(e.currentTarget)}
                    whileTap={{backgroundColor: 'rgba(231, 231, 242, 0.3)'}}
                    className={styles.bottom_modalSection}>
                    <RiMapPinLine size={23} color={iconColor} />
                    <div style={{width: '56.5vw'}}>
                      <div className={styles.label}>City</div>
                      <div className={styles.selection}>
                        {cities.length
                          ? city
                            ? `${city}, ${state}`
                            : `All Cities of ${state}`
                          : 'Loading...'}
                      </div>
                    </div>
                  </motion.button>
                  <Menu
                    anchorEl={cityMenu}
                    open={cities.length && Boolean(cityMenu)}
                    variant="menu"
                    onClose={(e, r) => setCityMenu()}>
                    <MenuItem
                      key={-1}
                      selected={!city}
                      onClick={() => {
                        dispatch(setCity(null));
                        dispatch(setCoords(null));
                        setCityMenu();
                      }}>
                      All Cities
                    </MenuItem>
                    {cities.map((c, i) => (
                      <MenuItem
                        key={i}
                        selected={c === city}
                        onClick={() => {
                          dispatch(setCity(c));
                          dispatch(setCoords(null));
                          setCityMenu();
                        }}>
                        {c}
                      </MenuItem>
                    ))}
                  </Menu>
                  <Divider flip={true} />
                  <motion.button
                    onClick={e => setRoomMenu(e.currentTarget)}
                    whileTap={{backgroundColor: 'rgba(231, 231, 242, 0.3)'}}
                    className={styles.bottom_modalSection}>
                    <RiUserLine size={23} color={iconColor} />
                    <div style={{width: '56.5vw'}}>
                      <div className={styles.label}>Rooms</div>
                      <div className={styles.selection}>
                        {rooms.a > 0
                          ? `${rooms.a}${rooms.k > 0 ? 'A' : ' Adults'} `
                          : null}
                        {rooms.k > 0
                          ? `${rooms.k}${rooms.a > 0 ? 'U' : ' Kids'}`
                          : null}
                      </div>
                    </div>
                  </motion.button>
                  <Popover
                    open={Boolean(roomMenu)}
                    anchorEl={roomMenu}
                    onClose={() => setRoomMenu()}
                    PaperProps={{
                      style: {
                        width: '40vw',
                        backgroundColor: '#2a2a2a',
                        paddingInline: 15,
                        paddingTop: 15,
                      },
                    }}>
                    <div className={styles.label}>Adults</div>
                    <Slider {...sliderProps('a', rooms, setRooms, 1)} />
                    <div className={styles.label}>Kids</div>
                    <Slider {...sliderProps('k', rooms, setRooms, 1)} />
                  </Popover>
                  <Divider flip={true} />
                  <motion.button
                    whileTap={{backgroundColor: 'rgba(231, 231, 242, 0.3)'}}
                    className={styles.bottom_modalSection}>
                    <RiCalendarLine size={23} color={iconColor} />
                    <div style={{width: '56.5vw'}}>
                      <div className={styles.label}>Date</div>
                      <div className={styles.selection}>{date}</div>
                    </div>
                    <DatePicker {...datePickerProps(date, setDate)} />
                  </motion.button>
                </div>
              </div>
            </Modal>
          ) : null}
        </AnimatePresence>
      </div>

      {/* // Bottom Panel for PC Screens */}
      <motion.div
        transition={{delay: 0.6, duration: 0.6}}
        animate={{translateX: '-50%', translateY: '0%', scaleX: 1}}
        initial={{translateX: '-50%', translateY: '100%', scaleX: 0}}
        className={styles.locOptions}>
        <div className={styles.optionsTitle}>Plan Your Vacation</div>
        <div className={styles.optionsMain}>
          <div className={styles.menus}>
            <motion.div
              onClick={e => setCityMenu(e.currentTarget)}
              whileHover={{backgroundColor: '#ffffff26'}}
              whileTap={{backgroundColor: '#ffffff4d'}}
              className={styles.menu}>
              <RiMapPinLine size={20} color={iconColor} />
              <div style={{flex: 1, paddingInline: '10px'}}>
                <div className={styles.label}>City</div>
                <div className={styles.selection}>
                  {cities.length
                    ? city
                      ? city
                      : `All Cities of ${state}`
                    : 'Loading...'}
                </div>
              </div>
              <BiChevronDown size={20} color={iconColor} />
            </motion.div>
            <Menu
              anchorEl={cityMenu}
              open={cities.length && Boolean(cityMenu)}
              variant="menu"
              onClose={(e, r) => setCityMenu()}>
              <MenuItem
                key={-1}
                selected={!city}
                onClick={() => {
                  dispatch(setCity(null));
                  dispatch(setCoords(null));
                  setCityMenu();
                }}>
                All Cities
              </MenuItem>
              {cities.map((c, i) => (
                <MenuItem
                  key={i}
                  selected={c === city}
                  onClick={() => {
                    dispatch(setCity(c));
                    dispatch(setCoords(null));
                    setCityMenu();
                  }}>
                  {c}
                </MenuItem>
              ))}
            </Menu>
            <Divider />
            <motion.div
              whileHover={{backgroundColor: '#ffffff26'}}
              whileTap={{backgroundColor: '#ffffff4d'}}
              className={styles.menu}>
              <RiCalendarLine size={20} color={iconColor} />
              <div style={{flex: 1, paddingInline: '10px'}}>
                <div className={styles.label}>Date</div>
                <div className={styles.selection}>{date}</div>
              </div>
              <BiChevronDown size={20} color={iconColor} />
              <DatePicker {...datePickerProps(date, setDate)} />
            </motion.div>
            <Divider />
            <motion.div
              onClick={e => setRoomMenu(e.currentTarget)}
              whileHover={{backgroundColor: '#ffffff26'}}
              whileTap={{backgroundColor: '#ffffff4d'}}
              className={styles.menu}>
              <RiUserLine size={20} color={iconColor} />
              <div style={{flex: 1, paddingInline: '10px'}}>
                <div className={styles.label}>Rooms</div>
                <div className={styles.selection}>
                  {rooms.a > 0 ? `${rooms.a} Adults  ` : null}
                  {rooms.k > 0 ? `${rooms.k} Kids` : null}
                </div>
              </div>
              <BiChevronDown size={20} color={iconColor} />
            </motion.div>
            <Popover
              open={Boolean(roomMenu)}
              anchorEl={roomMenu}
              onClose={() => setRoomMenu()}
              PaperProps={{
                style: {
                  width: '40vw',
                  backgroundColor: '#2a2a2a',
                  paddingInline: 15,
                  paddingTop: 15,
                },
              }}>
              <div className={styles.label}>Adults</div>
              <Slider {...sliderProps('a', rooms, setRooms, 2)} />
              <div className={styles.label}>Kids</div>
              <Slider {...sliderProps('k', rooms, setRooms, 2)} />
            </Popover>
          </div>
          <motion.button
            whileTap={{scale: 0.9}}
            className={styles.submit}
            type="button"
            onClick={search}>
            Search
          </motion.button>
        </div>
      </motion.div>
    </form>
  );
};

const datePickerProps = (date, setDate) => ({
  value: date,
  onChange: d => setDate(d.format('ddd, MMM D YYYY')),
  disablePast: true,
  style: {
    opacity: 0,
    position: 'absolute',
    width: '100%',
    left: 0,
  },
});

const sliderProps = (type, rooms, setRooms, pos) => ({
  key: `Slider-${pos}-${type}`,
  marks: true,
  step: 1,
  max: 10,
  defaultValue: rooms[type],
  valueLabelDisplay: 'auto',
  'aria-labelledby': 'discrete-slider-large-steps',
  onChangeCommitted: (e, v) => setRooms({...rooms, [type]: v}),
});

const iconColor = 'rgba(231, 231, 242, 0.5)';

const Divider = ({flip = false}) => (
  <div
    style={{
      backgroundColor: 'rgba(231, 231, 242, 0.3)',
      height: flip ? '1px' : '100%',
      width: flip ? '100%' : '1px',
    }}></div>
);

export default BottomMenu;
