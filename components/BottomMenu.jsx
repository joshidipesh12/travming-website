import React, {useState} from 'react';
import {
  RiHomeLine,
  RiMapPinLine,
  RiUserLine,
  RiCalendarLine,
} from 'react-icons/ri';
import {BiChevronDown} from 'react-icons/bi';
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
      <motion.button className={styles.mobLocOptions}>
        Setup Your Holiday
      </motion.button>
      {tripModal ? (
        <AnimatePresence initial={false} exitBeforeEnter={true}>
          <Modal close={() => setTripModal(false)}>
            <div className="container" style={styles.modalContainer}></div>
          </Modal>
        </AnimatePresence>
      ) : null}
    </>
  ) : (
    <form className={styles.locOptions}>
      <div className={styles.optionsTitle}>Plan Your Vacation</div>
      <div className={styles.optionsMain}>
        <div className={styles.menus} style={{borderWidth: '2px'}}>
          <div className={styles.menu} style={{width: '35%'}}>
            <RiHomeLine size={20} color={iconColor} />
            <div style={{flex: 1, paddingInline: '10px'}}>
              <div className={styles.label}>Accomodation</div>
              <div className={styles.selection}>{accomodation}</div>
            </div>
            <BiChevronDown size={20} color={iconColor} />
          </div>
          <Divider />
          <div className={styles.menu} style={{width: '25%'}}>
            <RiMapPinLine size={20} color={iconColor} />
            <div style={{flex: 1, paddingInline: '10px'}}>
              <div className={styles.label}>City</div>
              <div className={styles.selection}>{city}</div>
            </div>
            <BiChevronDown size={20} color={iconColor} />
          </div>
          <Divider />
          <div className={styles.menu} style={{width: '20%'}}>
            <RiCalendarLine size={20} color={iconColor} />
            <div style={{flex: 1, paddingInline: '10px'}}>
              <div className={styles.label}>Date</div>
              <div className={styles.selection}>{date}</div>
            </div>
            <BiChevronDown size={20} color={iconColor} />
          </div>
          <Divider />
          <div className={styles.menu} style={{width: '20%'}}>
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
          </div>
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

const Divider = () => (
  <div
    style={{
      backgroundColor: 'rgba(231, 231, 242, 0.3)',
      height: '100%',
      width: '1px',
    }}></div>
);

export default BottomMenu;
