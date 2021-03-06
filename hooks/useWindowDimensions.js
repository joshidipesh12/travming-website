import {useState, useEffect} from 'react';

export default function useWindowDimensions() {
  const hasWindow = () => typeof window !== 'undefined';

  function getWindowDimensions() {
    return hasWindow()
      ? {height: window.innerWidth, width: window.innerHeight}
      : {height: null, width: null};
  }

  const [height, setHeight] = useState(getWindowDimensions().height);
  const [width, setWidth] = useState(getWindowDimensions().width);

  useEffect(() => {
    if (hasWindow) {
      const handleResize = e => {
        const Dims = getWindowDimensions(e.currentTarget);
        if (Dims) {
          setHeight(Dims.height);
          setWidth(Dims.width);
        }
      };

      window.addEventListener('resize', handleResize);
      return () => {}; // window.removeEventListener('resize', handleResize);
    }
  }, [hasWindow]);

  return [height, width];
}
