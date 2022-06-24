import React, {useState, useRef} from 'react';
import {
  RiHomeLine,
  RiMapPinLine,
  RiUserLine,
  RiCalendarLine,
} from 'react-icons/ri';
import {BiChevronDown, BiX, BiSearch} from 'react-icons/bi';
import styles from '../styles/Home.module.css';
import {useSelector, useDispatch} from 'react-redux';
import {AnimatePresence, motion} from 'framer-motion';
import {DatePicker} from '@material-ui/pickers';
import {useIsMobile, useToggle} from '../hooks';
import {Menu, MenuItem, Popover, Slider} from '@material-ui/core';
import dayjs from 'dayjs';
import Modal from './Modal';
import {useEffect} from 'react';
import {setCity} from '../store/hotels';

const BottomMenu = ({}) => {
  const isMobile = useIsMobile();
  const dispatch = useDispatch();
  const [roomMenu, setRoomMenu] = useState(null);
  const cityMenu = useRef(null);
  const [rooms, setRooms] = useState({a: 3, k: 0});
  const [tripModal, setTripModal] = useState(false);
  const [date, setDate] = useState(dayjs().format('ddd, MMM D YYYY'));
  const [accomodation, setAccomodation] = useState(
    '6730 Luna Land North Rhiannonmouth',
  );

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

  return (
    <form onSubmit={e => e.preventDefault()}>
      {isMobile ? (
        <>
          <motion.button
            transition={{delay: 0.6, duration: 0.6}}
            animate={{translateY: '0%', scale: 1}}
            initial={{translateY: '200%', scale: 0}}
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
                        onClick={() => {}}
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
                      whileTap={{backgroundColor: 'rgba(231, 231, 242, 0.3)'}}
                      className={styles.bottom_modalSection}>
                      <RiHomeLine size={23} color={iconColor} />
                      <div style={{width: '56.5vw'}}>
                        <div className={styles.label}>Accomodation</div>
                        <div className={styles.selection}>{accomodation}</div>
                      </div>
                    </motion.button>
                    <Divider flip={true} />
                    <div className={styles.bottom_modalCheckInOut}>
                      <motion.button
                        onClick={e => setRoomMenu(e.currentTarget)}
                        whileTap={{backgroundColor: 'rgba(231, 231, 242, 0.3)'}}
                        className={styles.bottom_modalSection}>
                        <RiUserLine size={23} color={iconColor} />
                        <div style={{width: '20vw'}}>
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
                        <Popover
                          open={Boolean(roomMenu)}
                          anchorEl={roomMenu}
                          onClose={() => setRoomMenu(null)}
                          PaperProps={{
                            style: {
                              width: '40vw',
                              backgroundColor: 'rgba(255, 255, 255, 0.15)',
                              backdropFilter: 'blur(40px)',
                              paddingInline: 15,
                              paddingTop: 15,
                            },
                          }}>
                          <div className={styles.label}>Adults</div>
                          <Slider {...sliderProps('a', rooms, setRooms)} />
                          <div className={styles.label}>Kids</div>
                          <Slider {...sliderProps('k', rooms, setRooms)} />
                        </Popover>
                      </motion.button>
                      <Divider />
                      <motion.button
                        whileTap={{backgroundColor: 'rgba(231, 231, 242, 0.3)'}}
                        className={styles.bottom_modalSection}>
                        <RiCalendarLine size={23} color={iconColor} />
                        <div style={{width: '22vw'}}>
                          <div className={styles.label}>Date</div>
                          <div className={styles.selection}>{date}</div>
                        </div>
                        <DatePicker {...datePickerProps(date, setDate)} />
                      </motion.button>
                    </div>
                    <Divider flip={true} />
                    <motion.button
                      onClick={e => {
                        cityMenu.current = e.currentTarget;
                      }}
                      whileTap={{backgroundColor: 'rgba(231, 231, 242, 0.3)'}}
                      className={styles.bottom_modalSection}>
                      <RiMapPinLine size={23} color={iconColor} />
                      <div style={{width: '56.5vw'}}>
                        <div className={styles.label}>City</div>
                        <div className={styles.selection}>
                          {city}, {state}
                        </div>
                      </div>
                      <Menu
                        variant="menu"
                        anchorEl={cityMenu.current}
                        open={Boolean(cityMenu.current)}
                        onClose={() => {
                          cityMenu.current = null;
                        }}>
                        {cities.map((c, i) => (
                          <MenuItem
                            key={i}
                            selected={c === city}
                            onClick={() => {
                              dispatch(setCity(c));
                              cityMenu.current = null;
                            }}>
                            {c}
                          </MenuItem>
                        ))}
                      </Menu>
                    </motion.button>
                  </div>
                </div>
              </Modal>
            ) : null}
          </AnimatePresence>
        </>
      ) : (
        <motion.div
          transition={{delay: 0.6, duration: 0.6}}
          animate={{translateX: '-50%', translateY: '0%', scale: 1}}
          initial={{translateX: '-50%', translateY: '100%', scale: 0}}
          className={styles.locOptions}>
          <div className={styles.optionsTitle}>Plan Your Vacation</div>
          <div className={styles.optionsMain}>
            <div className={styles.menus} style={{borderWidth: '2px'}}>
              <motion.div
                whileHover={{backgroundColor: '#ffffff26'}}
                whileTap={{backgroundColor: '#ffffff4d'}}
                className={styles.menu}
                style={{width: '32%'}}>
                <RiHomeLine size={20} color={iconColor} />
                <div style={{width: '75%', marginLeft: '5%'}}>
                  <div className={styles.label}>Accomodation</div>
                  <div className={styles.selection}>{accomodation}</div>
                </div>
                <BiChevronDown size={20} color={iconColor} />
              </motion.div>
              <Divider />
              <motion.div
                onClick={e => {
                  cityMenu.current = e.currentTarget;
                }}
                whileHover={{backgroundColor: '#ffffff26'}}
                whileTap={{backgroundColor: '#ffffff4d'}}
                className={styles.menu}
                style={{width: '25%'}}>
                <RiMapPinLine size={20} color={iconColor} />
                <div style={{flex: 1, paddingInline: '10px'}}>
                  <div className={styles.label}>City</div>
                  <div className={styles.selection}>
                    {city}, {state}
                  </div>
                </div>
                <BiChevronDown size={20} color={iconColor} />
              </motion.div>
              <Divider />
              <motion.div
                whileHover={{backgroundColor: '#ffffff26'}}
                whileTap={{backgroundColor: '#ffffff4d'}}
                className={styles.menu}
                style={{width: '23%'}}>
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
                className={styles.menu}
                style={{width: '20%'}}>
                <RiUserLine size={20} color={iconColor} />
                <div style={{flex: 1, paddingInline: '10px'}}>
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
                <BiChevronDown size={20} color={iconColor} />
                <Popover
                  open={Boolean(roomMenu)}
                  anchorEl={roomMenu}
                  onClose={() => setRoomMenu(null)}
                  PaperProps={{
                    style: {
                      width: '20vw',
                      backgroundColor: '#424242',
                      paddingInline: 15,
                      paddingTop: 15,
                    },
                  }}>
                  <div className={styles.label}>Adults</div>
                  <Slider {...sliderProps('a', rooms, setRooms)} />
                  <div className={styles.label}>Kids</div>
                  <Slider {...sliderProps('k', rooms, setRooms)} />
                </Popover>
              </motion.div>
            </div>
            <motion.button
              whileTap={{scale: 0.9}}
              className={styles.submit}
              type="button"
              onClick={() => {}}>
              Search
            </motion.button>
          </div>
        </motion.div>
      )}
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
  },
});

const sliderProps = (type, rooms, setRooms) => ({
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
