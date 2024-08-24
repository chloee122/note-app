import { useEffect, useState } from "react";

const THRESHOLD = 10;

const useTopScroll = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > THRESHOLD) setScrolled(true);
      else setScrolled(false);
    };

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  });

  return scrolled;
};

export default useTopScroll;
