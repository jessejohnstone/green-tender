import React from "react";
const money = (n) => "KSh " + Math.round(n).toLocaleString("en-KE");
export default function OptionCard({
  option: o,
  best,
  selected,
  locked,
  onSelect,
  priority,
}) {
  return (
    <article className={"card " + (best ? "best" : "")}>
      <div className="cardtop">
        <span className="itemicon">{o.icon}</span>
        <div>
          <h3>{o.name}</h3>
          <p>{o.detail}</p>
        </div>
        <span className="tag">{best ? "Recommended" : o.kind}</span>
      </div>
      <div className="metrics">
        <div>
          <small>Total cost</small>
          <strong>{money(o.cost)}</strong>
        </div>
        <div>
          <small>Estimated footprint</small>
          <strong>{Math.round(o.co2)} kg CO₂e</strong>
        </div>
        <div>
          <small>Available within</small>
          <strong>{o.days} days</strong>
        </div>
      </div>
      <div className="cardfoot">
        <span>
          {o.eligible
            ? `${o.kind} · Capacity ${o.capacity}`
            : "Does not meet budget, deadline or quantity"}
        </span>
        <button
          className={selected ? "secondary" : "primary"}
          disabled={!o.eligible || locked}
          onClick={() => onSelect(o.id)}
        >
          {selected ? "Selected" : "Select option"}
        </button>
      </div>
      {best && (
        <div className="reason">
          Meets budget, capacity and deadline. Ranking considers{" "}
          {priority === "price"
            ? "cost"
            : priority === "carbon"
              ? "estimated emissions"
              : "cost and estimated emissions equally"}
          . Supplier validation is required.
        </div>
      )}
    </article>
  );
}
