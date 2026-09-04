import { useEffect, useMemo, useState } from "react";
import { Heart, Star } from "lucide-react";
import { eSimProducts, money, saleStays, tourProducts, transportPasses } from "../data/mockData";
import "./commerce-showcase.css";

function InfiniteProductRow({ id, title, linkLabel, items, horizontal = false }) {
  const visible = horizontal ? 3 : 4;
  const clones = useMemo(() => [...items, ...items.slice(0, visible)], [items, visible]);
  const [index, setIndex] = useState(0);
  const [moving, setMoving] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || items.length <= visible) return undefined;
    const timer = window.setInterval(() => {
      setMoving(true);
      setIndex((current) => current + 1);
    }, 4000);
    return () => window.clearInterval(timer);
  }, [items.length, paused, visible]);

  const finishMove = () => {
    if (index < items.length) return;
    setMoving(false);
    setIndex(0);
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => setMoving(true)));
  };

  return (
    <section id={id} className={`commerce-row${horizontal ? " is-horizontal" : ""}`} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onTouchStart={() => setPaused(true)} onTouchEnd={() => setPaused(false)}>
      <header><h3>{title}</h3><button type="button">{linkLabel} 전체 보기 →</button></header>
      <div className="commerce-viewport">
        <div className="commerce-track" style={{ "--commerce-index": index, transition: moving ? "transform .72s cubic-bezier(.22,.75,.22,1)" : "none" }} onTransitionEnd={finishMove}>
          {clones.map((item, itemIndex) => (
            <article className="commerce-card" key={`${item.id}-${itemIndex}`}>
              <img src={item.image} alt="" loading="lazy" />
              <span className="commerce-shade" />
              <em>{item.tag}</em>
              <button type="button" className="commerce-like" aria-label={`${item.title} 찜하기`}><Heart size={17} /></button>
              <div>
                <small>{item.location}</small>
                <h4>{item.title}</h4>
                {!horizontal ? <p><Star size={12} fill="currentColor" /> {item.rating}/5 · 리뷰 {item.reviews}개</p> : <p>오늘 예약 시 타임세일 적용</p>}
                <strong>{money(item.price)}<small>원~</small></strong>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function CommerceShowcase() {
  return (
    <section className="commerce-showcase" aria-label="여행 상품 추천">
      <InfiniteProductRow id="commerce-tours" title="내 예산으로 즐기는 완벽한 하루, 투어 & 액티비티" linkLabel="투어" items={tourProducts} />
      <InfiniteProductRow id="commerce-stays" title="예산 방어 필수! 마감 임박 타임세일 숙소" linkLabel="숙소" items={saleStays} horizontal />
      <InfiniteProductRow id="commerce-passes" title="자유로운 이동을 위한 필수 교통패스" linkLabel="교통패스" items={transportPasses} />
      <InfiniteProductRow id="commerce-esim" title="데이터 끊김 없이! 글로벌 eSIM & 유심" linkLabel="eSIM" items={eSimProducts} />
    </section>
  );
}
