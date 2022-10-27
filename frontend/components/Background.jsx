import React, {useState, useEffect} from 'react';
import {motion, useAnimation} from 'framer-motion';
import {useSelector} from 'react-redux';
import config from '../config.json';

function Background({children}) {
  const {country, state, city} = useSelector(state => state.hotel);
  const [background, setBackground] = useState();

  useEffect(() => {
    const url = `https://source.unsplash.com/512x512/?${country}`;
    // Object.keys(config.countries).includes(country)
    //   ? `${config.countries[country]}?width=auto`
    //   : `https://source.unsplash.com/512x512/?${country}`;
    setBackground(url);
    return () => {};
  }, [country]);

  return (
    <div className="background">
      <div className="background_cover" />
      {children}
      <style jsx>{`
        .background {
          flex: 1;
          min-height: 100vh;
          width: 100%;
          display: flex;
          background: url('${background}') no-repeat center;
          background-size: cover;
          background-color: #2f2f2f;
          // animation: backg 6s ease-in-out 1s infinite;
          // background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='124' height='124' viewBox='0 0 200 200'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='100' y1='33' x2='100' y2='-3'%3E%3Cstop offset='0' stop-color='%23000' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23000' stop-opacity='1'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='100' y1='135' x2='100' y2='97'%3E%3Cstop offset='0' stop-color='%23000' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23000' stop-opacity='1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='%23292929' fill-opacity='0.32'%3E%3Crect x='100' width='100' height='100'/%3E%3Crect y='100' width='100' height='100'/%3E%3C/g%3E%3Cg fill-opacity='0.32'%3E%3Cpolygon fill='url(%23a)' points='100 30 0 0 200 0'/%3E%3Cpolygon fill='url(%23b)' points='100 100 0 130 0 100 200 100 200 130'/%3E%3C/g%3E%3C/svg%3E");
        }
        .background_cover {
          position: absolute;
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
