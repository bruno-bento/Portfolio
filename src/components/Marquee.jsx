import { MARQUEE_ITEMS } from "../data/translations";

export default function Marquee() {
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
          <span key={i} className="marquee-item">
            <span className="marquee-dot"/>{item}
          </span>
        ))}
      </div>
    </div>
  );
}
