import React from 'react';
import {motion} from 'framer-motion';
import {useEffect} from 'react';
import config from '../config.json';

function HomeLoader({onLoadComplete}) {
  useEffect(() => {
    const onLoadFirst = () => {
      console.log('Loaded Images');
      onLoadComplete?.();
    };
    // config.places.map((place, i) => {
    //   if (i == 0) return;
    //   let img = new Image();
    //   img.src = place.img;
    // });
    let img1 = new Image();
    img1.addEventListener('load', onLoadFirst);
    img1.src = config.places[0].img;
    return () => img1.removeEventListener('load', onLoadFirst);
  }, []);

  return (
    <motion.header
      initial={{x: 0}}
      animate={{x: 0, opacity: 1}}
      exit={{x: -200, opacity: 0, transition: {duration: 2}}}
      key="loader"
      className="loader-container"
      style={{
        position: 'absolute',
        zIndex: 10,
        backgroundColor: '#282c34',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <section className="loader">
        <span></span>
        <span></span>
        <span></span>
      </section>
      <style jsx>{`
        .loader {
          position: relative;
          width: 180px;
          height: 180px;
          display: flex;
          justify-content: center;
          align-items: center;
          transform-style: preserve-3d;
          transform: perspective(500px) rotateX(45deg);
        }
        .loader span {
          position: absolute;
          display: block;
          border: 15px solid #fff;
          border-radius: 50%;
          box-shadow: 0 10px 0 #e0e0e0, inset 0 10px 0 #e0e0e0;
          animation: animate-loader 3.5s ease-in-out infinite;
          height: 100%;
          width: 100%;
          transform: translateZ(-100px);
        }
        .loader span:nth-child(1) {
          animation-delay: 0s;
        }
        .loader span:nth-child(2) {
          animation-delay: 1s;
        }
        .loader span:nth-child(3) {
          animation-delay: 2s;
        }
        @keyframes animate-loader {
          0%,
          100% {
            transform: translateZ(-100px);
            height: 100%;
            width: 100%;
          }
          25% {
            transform: translateZ(100px);
            width: 100%;
            height: 100%;
          }
          50% {
            transform: translateZ(100px);
            width: 35%;
            height: 35%;
          }
          75% {
            transform: translateZ(-100px);
            width: 35%;
            height: 35%;
          }
        }
      `}</style>
    </motion.header>
  );
}

export default HomeLoader;
