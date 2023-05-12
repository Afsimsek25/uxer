// useOutsideClick.js
import { useEffect } from 'react';

const useOutsideClick = (ref, callback, additionalRef = null) => {
  const handleClick = (e) => {
    if (
      ref.current &&
      !ref.current.contains(e.target) &&
      (!additionalRef || !additionalRef.current || !additionalRef.current.contains(e.target))
    ) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleClick);

    return () => {
      document.removeEventListener('mouseup', handleClick);
    };
  });
};

export default useOutsideClick;
