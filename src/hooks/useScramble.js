import { useEffect, useState } from "react";
import { SCRAMBLE_CHARS } from "../data/translations";

export function useScramble(words) {
  const [display, setDisplay] = useState(words[0]);

  useEffect(() => {
    setDisplay(words[0]);
    let wIdx = 0;
    const interval = setInterval(() => {
      wIdx = (wIdx + 1) % words.length;
      const target = words[wIdx];
      let i = 0;
      const tot = 22;
      const iv = setInterval(() => {
        setDisplay(
          target.split('').map((c, j) =>
            j < i / (tot / target.length)
              ? c
              : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
          ).join('')
        );
        if (++i > tot) { setDisplay(target); clearInterval(iv); }
      }, 40);
    }, 2800);
    return () => clearInterval(interval);
  }, [words]);

  return display;
}
