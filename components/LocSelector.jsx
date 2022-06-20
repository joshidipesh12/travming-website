import React, {useEffect, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import Modal from './Modal';
import config from '../config.json';

const LocSelector = ({visible, closeModal}) => {
  return (
    <AnimatePresence initial={false} exitBeforeEnter>
      {visible ? (
        <Modal close={closeModal}>
          {/* Add Location Selector Logic here */}
        </Modal>
      ) : null}
    </AnimatePresence>
  );
};

export default LocSelector;

// import {
//   RiCloseFill,
//   RiMenu4Fill,
//   RiMapPinUserFill,
//   RiRefreshLine,
// } from 'react-icons/ri';
// import {Sentry} from 'react-activity';
// import {useDispatch, useSelector} from 'react-redux';
// import 'react-activity/dist/library.css';

// import {getLocByCoords, setCountry} from '../store/hotels';

// export default function LocSelector({locModal, setLocModal}) {
//   const dispatch = useDispatch();
//   const [manual, setManual] = useState(true);
//   const [loc, setLocation] = useState();
//   const [activeMenu, setActiveMenu] = useState('');

//   const location = useSelector(state => state.hotel);
//   const {states, statesError} = useSelector(state => state.location);
//   const {countries} = config;

//   const getLoc = () => {
//     setLocation();
//     setTimeout(() => {
//       navigator?.geolocation?.getCurrentPosition(
//         pos =>
//           setLocation({long: pos.coords.longitude, lat: pos.coords.latitude}),
//         err => setLocation({error: err.message}),
//       );
//     }, 1000);
//   };

//   useEffect(() => {
//     if (loc?.long && loc?.lat) dispatch(getLocByCoords(loc.lat, loc.long));
//     return () => {};
//   }, [loc?.long, loc?.lat]);

//   useEffect(() => {
//     if (!manual && !loc?.lat && !loc?.long) getLoc();
//     return () => {};
//   }, [manual]);

//   return (
//     <AnimatePresence initial={false} exitBeforeEnter={true}>
//       {locModal ? (
//         <Modal close={() => setLocModal(false)}>
//           <div className="container" style={styles.container}>
//             {manual ? (
//               <div style={styles.auto}>
//                 <RiCloseFill
//                   color="white"
//                   size={25}
//                   style={styles.close}
//                   onClick={() => setLocModal(false)}
//                 />
//                 <RiMapPinUserFill
//                   onClick={() => setManual(!manual)}
//                   color="white"
//                   size={25}
//                   style={styles.back}
//                 />
//               </div>
//             ) : (
//               <div style={styles.auto}>
//                 {!loc || location.locLoading ? (
//                   <>
//                     <h2 style={{color: 'white'}}>Getting Your Location</h2>
//                     <Sentry speed={0.5} size={50} color="white" />
//                   </>
//                 ) : (
//                   <>
//                     {loc.error ? (
//                       <div style={{alignContent: 'center'}}>
//                         <div style={styles.error}>Error!</div>
//                         <div>{loc.error}</div>
//                       </div>
//                     ) : (
//                       <>
//                         <img src="/icons/home_loc.svg" />
//                         <h2 style={{color: 'HighlightText'}}>
//                           {location.state}, {location.country}
//                         </h2>
//                       </>
//                     )}
//                     <motion.div
//                       whileHover={{backgroundColor: '#0084FF'}}
//                       onClick={getLoc}
//                       style={styles.retry}>
//                       <RiRefreshLine
//                         color="white"
//                         style={{marginRight: 10}}
//                         size={18}
//                       />
//                       <span style={{color: 'white', fontWeight: 'bold'}}>
//                         REFRESH
//                       </span>
//                     </motion.div>
//                   </>
//                 )}
//                 <RiCloseFill
//                   color="white"
//                   size={25}
//                   style={styles.close}
//                   onClick={() => setLocModal(false)}
//                 />
//                 <RiMenu4Fill
//                   onClick={() => setManual(!manual)}
//                   color="white"
//                   size={25}
//                   style={styles.back}
//                 />
//               </div>
//             )}
//           </div>

//           <style jsx>{`
//             .container {
//               width: 40vw;
//             }
//             li {
//               list-style-type: none;
//               padding: 0;
//               margin: 0;
//             }
//             h4 {
//               margin-top: 0px;
//               position: sticky;
//               top: 0;
//               color: rgb(200, 200, 200);
//               width: 100%;
//               background-color: rgb(100, 100, 100);
//               text-align: center;
//             }
//             .select {
//               margin-bottom: 15px;
//               transition: all 0.2s;
//               text-align: center;
//             }
//             .select:hover {
//               color: rgb(200, 200, 200);
//               cursor: pointer;
//               background-color: rgb(10, 10, 10);
//               width: 100%;
//             }

//             @media (max-aspect-ratio: 2/3) {
//               .container {
//                 width: 80vw;
//               }
//               h2 {
//                 font-size: 5vw;
//               }
//               .select {
//                 margin-bottom: 15px;
//               }
//             }
//           `}</style>
//         </Modal>
//       ) : null}
//     </AnimatePresence>
//   );
// }

// const styles = {
//   container: {
//     backgroundColor: 'rgb(100, 100, 100)',
//     // borderRadius: 15,
//     padding: 10,
//     height: '50vh',
//     display: 'flex',
//   },
//   auto: {
//     flex: 1,
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'space-evenly',
//   },
//   close: {
//     position: 'absolute',
//     top: 20,
//     right: 20,
//     cursor: 'pointer',
//   },
//   back: {
//     position: 'absolute',
//     top: 20,
//     left: 20,
//     cursor: 'pointer',
//   },
//   retry: {
//     cursor: 'pointer',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#2f9fff',
//     paddingInline: 20,
//     paddingBlock: 10,
//     borderRadius: 20,
//   },
//   error: {
//     color: 'white',
//     height: 20,
//     textAlign: 'center',
//     marginBottom: 20,
//     fontSize: 20,
//     textTransform: 'uppercase',
//   },
//   selectorMain: {
//     display: 'flex',
//     height: '50%',
//     width: '100%',
//     overflow: 'hidden',
//     paddingBottom: 10,
//     justifyContent: 'space-evenly',
//     alignItems: 'center',
//     flexWrap: 'wrap',
//   },
//   dropButton: {
//     background: 'rgba(255,255,255,1)',
//     width: '12rem',
//     fontSize: '5vw',
//     padding: 20,
//     borderRadius: 10,
//     textAlign: 'center',
//     cursor: 'pointer',
//   },
//   menuList: {
//     position: 'absolute',
//     top: 'calc(100% + 0.5rem)',
//     left: 0,
//     padding: 10,
//     backgroundColor: 'rgba(255,255,255,1)',
//     maxHeight: '40vh',
//     width: '100%',
//     boxShadow: '0 0 5px black',
//   },
//   scrollContainer: {
//     flex: 1,
//   },
//   scroll: {
//     height: '100%',
//     width: '100%',
//     margin: 0,
//     padding: 0,
//     overflowY: 'scroll',
//     overflowX: 'hidden',
//     display: 'flex',
//     alignItems: 'center',
//     flexDirection: 'column',
//   },
// };
