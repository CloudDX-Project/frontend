import { foodPreferenceOptions } from "../../data/mockData";
import "./food-preference-selector.css";

function FoodPreferenceSelector({ value = [], onChange, compact = false }) {
  const selectionLimitReached = value.length >= 3;
  const toggle = (code) => {
    if (code === "ANY") return onChange([]);
    if (!value.includes(code) && selectionLimitReached) return;
    onChange(value.includes(code) ? value.filter((item) => item !== code) : [...value, code]);
  };

  return (
    <section className={`food-preference${compact ? " compact" : ""}`} aria-labelledby={compact ? "modal-food-title" : "food-title"}>
      <div className="food-preference-heading">
        <small>음식 선호</small>
        <b id={compact ? "modal-food-title" : "food-title"}>여행에서 어떤 음식을 즐기고 싶으세요?</b>
        <span>최대 3개까지 선택하면 식사 일정과 주변 식당 추천에 함께 반영해요. <b>{value.length}/3</b></span>
      </div>
      <div className="food-preference-options">
        <button type="button" className={!value.length ? "active" : ""} onClick={() => toggle("ANY")} aria-pressed={!value.length}>
          <b>상관없음</b><small>동선과 평점 우선</small>
        </button>
        {foodPreferenceOptions.map((option) => (
          <button type="button" key={option.code} className={value.includes(option.code) ? "active" : ""} disabled={selectionLimitReached && !value.includes(option.code)} onClick={() => toggle(option.code)} aria-pressed={value.includes(option.code)}>
            <b>{option.label}</b><small>{option.description}</small>
          </button>
        ))}
      </div>
    </section>
  );
}

export default FoodPreferenceSelector;
