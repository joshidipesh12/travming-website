import React, {useState} from 'react';
import {
  RiHomeLine,
  RiMapPinLine,
  RiUserLine,
  RiCalendarLine,
} from 'react-icons/ri';
import {BiChevronDown, BiX, BiSearch} from 'react-icons/bi';
import styles from '../styles/Home.module.css';
import {useSelector} from 'react-redux';
import {AnimatePresence, motion} from 'framer-motion';
import useIsMobile from '../hooks/useIsMobile';
import Modal from './Modal';

const BottomMenu = ({}) => {
  const isMobile = useIsMobile();
  const [tripModal, setTripModal] = useState(false);
  const [date, setDate] = useState('19-06-2019');
  const [guests, setGuests] = useState({a: 3, k: 0});
  const [accomodation, setAccomodation] = useState(
    '6730 Luna Land North Rhiannonmouth',
  );

  const city = useSelector(state => state.hotel.city);

  return isMobile ? (
    <>
      <motion.button
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
                  <RiHomeLine size={28} color={iconColor} />
                  <div style={{width: '55vw'}}>
                    <div className={styles.label}>Accomodation</div>
                    <div className={styles.selection}>{accomodation}</div>
                  </div>
                </motion.button>
                <Divider flip={true} />
                <div className={styles.bottom_modalCheckInOut}>
                  <motion.button
                    whileTap={{backgroundColor: 'rgba(231, 231, 242, 0.3)'}}
                    className={styles.bottom_modalSection}>
                    <RiUserLine size={28} color={iconColor} />
                    <div style={{width: '19vw'}}>
                      <div className={styles.label}>Guests</div>
                      <div className={styles.selection}>
                        {guests.a > 0
                          ? `${guests.a}${guests.k > 0 ? 'A' : ' Adults'} `
                          : null}
                        {guests.k > 0
                          ? `${guests.k}${guests.a > 0 ? 'U' : ' Kids'}`
                          : null}
                      </div>
                    </div>
                  </motion.button>
                  <Divider />
                  <motion.button
                    whileTap={{backgroundColor: 'rgba(231, 231, 242, 0.3)'}}
                    className={styles.bottom_modalSection}>
                    <RiCalendarLine size={28} color={iconColor} />
                    <div style={{width: '19vw'}}>
                      <div className={styles.label}>Date</div>
                      <div className={styles.selection}>{date}</div>
                    </div>
                  </motion.button>
                </div>
                <Divider flip={true} />
                <motion.button
                  whileTap={{backgroundColor: 'rgba(231, 231, 242, 0.3)'}}
                  className={styles.bottom_modalSection}>
                  <RiMapPinLine size={28} color={iconColor} />
                  <div style={{width: '55vw'}}>
                    <div className={styles.label}>City</div>
                    <div className={styles.selection}>{city}</div>
                  </div>
                  {/*  */}
                </motion.button>
              </div>
            </div>
          </Modal>
        ) : null}
      </AnimatePresence>
    </>
  ) : (
    <form className={styles.locOptions}>
      <div className={styles.optionsTitle}>Plan Your Vacation</div>
      <div className={styles.optionsMain}>
        <div className={styles.menus} style={{borderWidth: '2px'}}>
          <motion.div
            whileHover={{backgroundColor: '#ffffff26'}}
            whileTap={{backgroundColor: '#ffffff4d'}}
            className={styles.menu}
            style={{width: '35%'}}>
            <RiHomeLine size={20} color={iconColor} />
            <div style={{flex: 1, paddingInline: '10px'}}>
              <div className={styles.label}>Accomodation</div>
              <div className={styles.selection}>{accomodation}</div>
            </div>
            <BiChevronDown size={20} color={iconColor} />
          </motion.div>
          <Divider />
          <motion.div
            whileHover={{backgroundColor: '#ffffff26'}}
            whileTap={{backgroundColor: '#ffffff4d'}}
            className={styles.menu}
            style={{width: '25%'}}>
            <RiMapPinLine size={20} color={iconColor} />
            <div style={{flex: 1, paddingInline: '10px'}}>
              <div className={styles.label}>City</div>
              <div className={styles.selection}>{city}</div>
            </div>
            <BiChevronDown size={20} color={iconColor} />
          </motion.div>
          <Divider />
          <motion.div
            whileHover={{backgroundColor: '#ffffff26'}}
            whileTap={{backgroundColor: '#ffffff4d'}}
            className={styles.menu}
            style={{width: '20%'}}>
            <RiCalendarLine size={20} color={iconColor} />
            <div style={{flex: 1, paddingInline: '10px'}}>
              <div className={styles.label}>Date</div>
              <div className={styles.selection}>{date}</div>
            </div>
            <BiChevronDown size={20} color={iconColor} />
          </motion.div>
          <Divider />
          <motion.div
            whileHover={{backgroundColor: '#ffffff26'}}
            whileTap={{backgroundColor: '#ffffff4d'}}
            className={styles.menu}
            style={{width: '20%'}}>
            <RiUserLine size={20} color={iconColor} />
            <div style={{flex: 1, paddingInline: '10px'}}>
              <div className={styles.label}>Guests</div>
              <div className={styles.selection}>
                {guests.a > 0
                  ? `${guests.a}${guests.k > 0 ? 'A' : ' Adults'} `
                  : null}
                {guests.k > 0
                  ? `${guests.k}${guests.a > 0 ? 'U' : ' Kids'}`
                  : null}
              </div>
            </div>
            <BiChevronDown size={20} color={iconColor} />
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
    </form>
  );
};

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
