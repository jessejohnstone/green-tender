import React from "react";
const money = (n) => "KSh " + Math.round(n).toLocaleString("en-KE");
import Intro from "../components/Intro.jsx";
import Stat from "../components/Stat.jsx";
import OptionCard from "../components/OptionCard.jsx";
export default function ProcurementStudio({
  s,
  c,
  options,
  best,
  dialog,
  update,
  select,
}) {
  return (
    <>
      <Intro
        eyebrow="BUY BETTER. KEEP MORE IN USE."
        title="Small decisions. Bigger impact."
        description="Find the right purchase for your budget—and the planet."
      >
        <button className="primary" onClick={() => dialog.current.showModal()}>
          + New request
        </button>
      </Intro>
      <div className="stats">
        <Stat
          label="Request budget"
          value={money(s.budget)}
          description="Adjust to test your options"
        />
        <Stat
          label="Available pathways"
          value="3"
          description="Reuse, refurbished & new"
        />
        <Stat
          label="Potential cost reduction"
          value={best ? money(c.baseline * s.qty - best.cost) : "—"}
          description="Compared with new purchase"
        />
        <Stat
          label="Potential emissions reduction"
          value={best ? `${Math.round(c.carbon * s.qty - best.co2)} kg` : "—"}
          description="Illustrative kg CO₂e estimate"
        />
      </div>
      <div className="studio">
        <section className="panel">
          <div className="requesthead between">
            <div>
              <h2>
                {s.qty} {c.name.toLowerCase()}
              </h2>
              <p>Meru campus · Needed within {s.days} days</p>
            </div>
            <span className="tag">
              {s.completed ? "Demo completed" : "Open request"}
            </span>
          </div>
          <div className="controls">
            <div className="seg">
              {[
                ["balanced", "Balanced"],
                ["price", "Lowest cost"],
                ["carbon", "Lowest carbon"],
              ].map(([id, label]) => (
                <button
                  key={id}
                  className={s.priority === id ? "selected" : ""}
                  aria-pressed={s.priority === id}
                  onClick={() => update({ priority: id })}
                >
                  {label}
                </button>
              ))}
            </div>
            <span className="note">
              {options.filter((o) => o.eligible).length} options meet your
              constraints
            </span>
          </div>
          <label>
            Budget limit: <strong>{money(s.budget)}</strong>
            <input
              type="range"
              min="0"
              max={Math.max(c.baseline * s.qty * 1.2, s.budget)}
              step="100"
              value={s.budget}
              onChange={(e) => {
                const budget = Number(e.target.value);
                update({ budget, selected: null, completed: false });
              }}
            />
          </label>
          {options.map((o) => (
            <OptionCard
              key={o.id}
              option={o}
              best={o.id === best?.id}
              selected={o.id === s.selected}
              locked={s.completed}
              onSelect={select}
              priority={s.priority}
            />
          ))}
          {!best && (
            <div className="empty">
              No eligible options. Adjust the budget, quantity or deadline.
            </div>
          )}
        </section>
        <section className="panel dark">
          <div className="eyebrow">THE REUSE ADVANTAGE</div>
          <h2 style={{ marginTop: 14 }}>
            More value.
            <br />
            Less extraction.
          </h2>
          <p>Compare the best eligible option with buying new.</p>
          <div className="big">
            {best ? Math.round((1 - best.co2 / (c.carbon * s.qty)) * 100) : 0}%
          </div>
          <p>lower estimated footprint</p>
          <div className="meter">
            <span
              style={{
                width: `${best ? Math.max(0, (1 - best.co2 / (c.carbon * s.qty)) * 100) : 0}%`,
              }}
            />
          </div>
          <hr />
          <div className="side-row">
            <span>New purchase</span>
            <strong>{c.carbon * s.qty} kg</strong>
          </div>
          <div className="side-row">
            <span>Recommended</span>
            <strong>{best ? Math.round(best.co2) : "—"} kg</strong>
          </div>
          <hr />
          <p className="note">
            Simplified demonstration factors. Delivery is calculated separately.
            No certified carbon credits are generated.
          </p>
          <button
            className="secondary"
            onClick={() => update({ view: "evidence" })}
          >
            Inspect assumptions
          </button>
        </section>
      </div>
    </>
  );
}
