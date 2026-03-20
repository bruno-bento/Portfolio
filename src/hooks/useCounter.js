import { useEffect, useRef, useState } from "react";

export function useCounter(target) {
  const [val, setVal] = useState(0);
  const [done, setDone] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done) {
        setDone(true);
        let c = 0;
        const step = target / 40;
        const iv = setInterval(() => {
          c += step;
          if (c >= target) { setVal(target); clearInterval(iv); }
          else setVal(Math.floor(c));
        }, 35);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, done]);

  return [ref, done ? `${target}+` : val];
}
