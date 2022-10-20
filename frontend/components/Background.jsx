import React, {useState, useEffect} from 'react';
import {motion, useAnimation} from 'framer-motion';
import Image from 'next/image';
import {useSelector} from 'react-redux';
import config from '../config.json';

function Background({children}) {
  const bgOpacity = useAnimation();
  const {country, state, city} = useSelector(state => state.hotel);
  const [background, setBackground] = useState(config.countries['Australia']);

  useEffect(() => {
    const url = Object.keys(config.countries).includes(country)
      ? config.countries[country]
      : `https://source.unsplash.com/512x512/?${country}`;
    setBackground(url);
    return () => {};
  }, [country]);

  return (
    <div>
      <div className="background">
        <motion.div animate={bgOpacity} style={{position: 'relative', flex: 1}}>
          <Image
            priority={true}
            layout="fill"
            objectFit="cover"
            alt={`${country} Image`}
            src={background}
            onLoadingComplete={() => bgOpacity.start({opacity: 1})}
          />
        </motion.div>
      </div>
      <div className="background_cover" />
      {children}
      <style jsx>{`
        .background {
          position: absolute;
          z-index: -2;
          height: 100%;
          width: 100vw;
          display: flex;
          animation: backg 6s ease-in-out 1s infinite;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='124' height='124' viewBox='0 0 200 200'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='100' y1='33' x2='100' y2='-3'%3E%3Cstop offset='0' stop-color='%23000' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23000' stop-opacity='1'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='100' y1='135' x2='100' y2='97'%3E%3Cstop offset='0' stop-color='%23000' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23000' stop-opacity='1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='%23292929' fill-opacity='0.32'%3E%3Crect x='100' width='100' height='100'/%3E%3Crect y='100' width='100' height='100'/%3E%3C/g%3E%3Cg fill-opacity='0.32'%3E%3Cpolygon fill='url(%23a)' points='100 30 0 0 200 0'/%3E%3Cpolygon fill='url(%23b)' points='100 100 0 130 0 100 200 100 200 130'/%3E%3C/g%3E%3C/svg%3E");
          background-color: #2f2f2f;
        }

        @keyframes backg {
          0%,
          100% {
            background-color: #2f2f2f;
          }
          50% {
            background-color: #555555;
          }
        }

        .background_cover {
          position: absolute;
          display: flex;
          z-index: -1;
          height: 100%;
          width: 100%;
          background: linear-gradient(
            180deg,
            rgba(19, 19, 23, 0.455) -8.21%,
            rgba(19, 19, 23, 0.357) 100%
          );
        }
      `}</style>
    </div>
  );
}

export default Background;
