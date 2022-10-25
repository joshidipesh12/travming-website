import {useState, useEffect} from 'react';

export default function useWindowScroll() {
  const [windowScrollY, setWindowScrollY] = useState(0);
  const [windowScrollX, setWindowScrollX] = useState(0);

  const setWindowScroll = () => {
    setWindowScrollX(window.scrollX);
    setWindowScrollY(window.scrollY);
  };

  useEffect(() => {
    setWindowScroll();
    window.addEventListener('scroll', setWindowScroll);

    return () => window.removeEventListener('scroll', setWindowScroll);
  }, []);

  return {windowScrollX, windowScrollY};
}
