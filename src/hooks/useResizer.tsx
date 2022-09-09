import { useEffect, useState } from 'react';

const MIN_WIDTH = 100;
const MAX_WIDTH = 1400;

const useResizer = (ref: React.RefObject<any>) => {
  const [width, setWidth] = useState(MAX_WIDTH);

  const startResize = (e: MouseEvent) => {
    let value = e.clientX;
    if (value < MIN_WIDTH) {
      value = MIN_WIDTH;
    }
    if (value > MAX_WIDTH) {
      value = MAX_WIDTH;
    }

    setWidth(value);
  };

  const stopResize = () => {
    window.removeEventListener('mousemove', startResize, false);
    window.removeEventListener('mouseup', stopResize, false);
  };

  const initResize = () => {
    window.addEventListener('mousemove', startResize, false);
    window.addEventListener('mouseup', stopResize, false);
  };

  useEffect(() => {
    ref.current.addEventListener('mousedown', initResize, false);
    return () => {
      stopResize();
    };
  }, []);

  return { width };
};

export default useResizer;
