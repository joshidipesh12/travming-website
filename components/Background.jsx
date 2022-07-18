import React, {useState, useEffect} from 'react';
import styles from '../styles/Home.module.css';
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
    <div className={styles.container}>
      <div className={styles.background}>
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
      <div className={styles.background_cover} />
      {children}
    </div>
  );
}

export default Background;
