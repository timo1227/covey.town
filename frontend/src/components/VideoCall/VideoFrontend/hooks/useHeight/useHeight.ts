import { useEffect, useState } from 'react';

export default function useHeight() {
  const [height, setHeight] =
    // eslint-disable-next-line react-hooks/rules-of-hooks
    typeof window !== 'undefined' ? useState(window.innerHeight) : useState(1);

  useEffect(() => {
    const onResize = () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      typeof window !== 'undefined' && setHeight(window.innerHeight);
    };

    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  });

  return height + 'px';
}
