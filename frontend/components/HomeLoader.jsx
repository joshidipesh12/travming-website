import React from 'react';
import {motion} from 'framer-motion';
import {useEffect} from 'react';
import config from '../config.json';

function HomeLoader({onLoadComplete}) {
  useEffect(() => {
    const onLoadFirst = () => onLoadComplete?.();
    let img1 = new Image();
    img1.addEventListener('load', onLoadFirst);
    img1.src = config.places[0].img;
    return () => img1.removeEventListener('load', onLoadFirst);
  }, []);

  return (
    <motion.header
      key="loader"
      className="loader-container"
      style={{
        position: 'absolute',
        zIndex: 10,
        // backgroundColor: '#282c34',
        background: 'radial-gradient(#9b59b6, #8e44ad)',
        height: '100vh',
        width: '100vw',
        display: 'flex',
      }}>
      <div style={{position: 'relative', flex: 1}}>
        <div className="wrapper">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="shadow"></div>
          <div className="shadow"></div>
          <div className="shadow"></div>
          <span>Loading</span>
        </div>
      </div>
      {/* <section className="loader">
        <span></span>
        <span></span>
        <span></span>
      </section> */}
      <style jsx>{`
        .wrapper {
          width: 200px;
          height: 60px;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
        .circle {
          width: 20px;
          height: 20px;
          position: absolute;
          border-radius: 50%;
          background-color: #fff;
          left: 15%;
          transform-origin: 50%;
          animation: circle 0.5s alternate infinite ease;
        }

        @keyframes circle {
          0% {
            top: 60px;
            height: 5px;
            border-radius: 50px 50px 25px 25px;
            transform: scaleX(1.7);
          }
          40% {
            height: 20px;
            border-radius: 50%;
            transform: scaleX(1);
          }
          100% {
            top: 0%;
          }
        }
        .circle:nth-child(2) {
          left: 45%;
          animation-delay: 0.2s;
        }
        .circle:nth-child(3) {
          left: auto;
          right: 15%;
          animation-delay: 0.3s;
        }
        .shadow {
          width: 20px;
          height: 4px;
          border-radius: 50%;
          background-color: rgba(0, 0, 0, 0.5);
          position: absolute;
          top: 62px;
          transform-origin: 50%;
          z-index: -1;
          left: 15%;
          filter: blur(1px);
          animation: shadow 0.5s alternate infinite ease;
        }

        @keyframes shadow {
          0% {
            transform: scaleX(1.5);
          }
          40% {
            transform: scaleX(1);
            opacity: 0.7;
          }
          100% {
            transform: scaleX(0.2);
            opacity: 0.4;
          }
        }
        .shadow:nth-child(4) {
          left: 45%;
          animation-delay: 0.2s;
        }
        .shadow:nth-child(5) {
          left: auto;
          right: 15%;
          animation-delay: 0.3s;
        }
        .wrapper span {
          position: absolute;
          top: 75px;
          font-family: 'Chillax', 'Franklin Gothic Medium', sans-serif;
          font-size: 20px;
          letter-spacing: 12px;
          color: #fff;
          left: 15%;
        }

        /* old loading Animation */
        // .loader {
        //   position: relative;
        //   width: 180px;
        //   height: 180px;
        //   display: flex;
        //   justify-content: center;
        //   align-items: center;
        //   transform-style: preserve-3d;
        //   transform: perspective(500px) rotateX(45deg);
        // }
        // .loader span {
        //   position: absolute;
        //   display: block;
        //   border: 15px solid #fff;
        //   border-radius: 50%;
        //   box-shadow: 0 10px 0 #e0e0e0, inset 0 10px 0 #e0e0e0;
        //   animation: animate-loader 3.5s ease-in-out infinite;
        //   height: 100%;
        //   width: 100%;
        //   transform: translateZ(-100px);
        // }
        // .loader span:nth-child(1) {
        //   animation-delay: 0s;
        // }
        // .loader span:nth-child(2) {
        //   animation-delay: 1s;
        // }
        // .loader span:nth-child(3) {
        //   animation-delay: 2s;
        // }
        // @keyframes animate-loader {
        //   0%,
        //   100% {
        //     transform: translateZ(-100px);
        //     height: 100%;
        //     width: 100%;
        //   }
        //   25% {
        //     transform: translateZ(100px);
        //     width: 100%;
        //     height: 100%;
        //   }
        //   50% {
        //     transform: translateZ(100px);
        //     width: 35%;
        //     height: 35%;
        //   }
        //   75% {
        //     transform: translateZ(-100px);
        //     width: 35%;
        //     height: 35%;
        //   }
        // }
      `}</style>
    </motion.header>
  );
}

export default HomeLoader;
