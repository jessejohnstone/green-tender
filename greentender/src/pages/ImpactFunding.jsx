import React from "react";
const money = (n) => "KSh " + Math.round(n).toLocaleString("en-KE");
import Intro from "../components/Intro.jsx";
import Stat from "../components/Stat.jsx";
export default function ImpactFunding({
  s,
  c,
  selected,
  savings,
  update,
  setToast,
  exportReport,
}) {
  return (
    <>
      <Intro
        eyebrow="FROM DECISIONS TO EVIDENCE"
        title="Make the impact visible."
        description="Track selections separately from completed demo transactions."
      >
        <button className="secondary" onClick={exportReport}>
          Download report
        </button>
      </Intro>
      <div className="stats">
        <Stat
          label="Procurement cost avoided"
          value={money(savings.cash)}
          description={
            s.completed
              ? "Demo completion recorded"
              : "Projected from selection"
          }
        />
        <Stat
          label="Procurement CO₂e avoided"
          value={`${Math.round(savings.carbon)} kg`}
          description="Illustrative model"
        />
        <Stat
          label="Transport CO₂e avoided"
          value={s.grouped ? "9 kg" : "0 kg"}
          description="Separate transport model"
        />
        <Stat
          label="Reuse reservations"
          value={s.reserved.length}
          description="Demo inventory reservations"
        />
      </div>
      <div className="grid2">
        <section className="panel">
          <h2>Decision evidence</h2>
          {selected ? (
            <>
              <p>
                {s.qty} {c.name.toLowerCase()} · {selected.name}
              </p>
              <div className="side-row">
                <span>Option cost</span>
                <b>{money(selected.cost)}</b>
              </div>
              <div className="side-row">
                <span>Baseline cost</span>
                <b>{money(c.baseline * s.qty)}</b>
              </div>
              <div className="side-row">
                <span>Status</span>
                <b>
                  {s.completed ? "Demo completed" : "Selected, not completed"}
                </b>
              </div>
              <button
                className="primary"
                disabled={s.completed}
                onClick={() => {
                  update({ completed: true });
                  setToast(
                    "Demo receipt confirmed. No real purchase was made.",
                  );
                }}
              >
                {s.completed ? "Completion recorded" : "Confirm demo receipt"}
              </button>
            </>
          ) : (
            <>
              <p>No option selected yet.</p>
              <button
                className="primary"
                onClick={() => update({ view: "studio" })}
              >
                Compare options
              </button>
            </>
          )}
          <p className="note">No real delivery, purchase or payment is made.</p>
        </section>
        <section className="panel">
          <span className="tag">Green financing concept</span>
          <h2 style={{ marginTop: 18 }}>Help close the affordability gap.</h2>
          <p>
            A sponsor can support a qualifying project beyond an organization’s
            budget.
          </p>
          <div className="side-row">
            <span>Demo project</span>
            <b>Water-efficient irrigation</b>
          </div>
          <div className="side-row">
            <span>Requested support</span>
            <b>KSh 12,000</b>
          </div>
          <p className="note">
            Quotation, water-use baseline and supplier evidence are sample
            records. Verification is pending.
          </p>
          <button
            className="secondary"
            disabled={s.funded}
            onClick={() => {
              update({ funded: true });
              setToast("Demo sponsor interest recorded.");
            }}
          >
            {s.funded ? "Demo interest recorded" : "Record sponsor interest"}
          </button>
          <p className="note">
            An expression of interest, not a funded grant or financial
            commitment.
          </p>
        </section>
      </div>
    </>
  );
}
