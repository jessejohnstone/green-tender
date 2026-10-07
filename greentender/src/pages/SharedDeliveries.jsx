import React from "react";
const money = (n) => "KSh " + Math.round(n).toLocaleString("en-KE");
import Intro from "../components/Intro.jsx";
import Stat from "../components/Stat.jsx";
export default function SharedDeliveries({ s, update }) {
  return (
    <>
      <Intro
        eyebrow="FEWER JOURNEYS. BETTER COORDINATION."
        title="Deliver together. Travel less."
        description="Combine compatible demo loads travelling to Meru campus."
      />
      <div className="banner">
        <div>
          <h2>
            {s.grouped
              ? "A shared route is ready"
              : "Three orders. One destination."}
          </h2>
          <p>
            Eligible load: 420 kg / 600 kg vehicle capacity · Delivery window:
            tomorrow
          </p>
        </div>
        <button
          className="primary"
          onClick={() => update({ grouped: !s.grouped })}
        >
          {s.grouped ? "Restore separate trips" : "Combine deliveries"}
        </button>
      </div>
      <div className="grid2">
        <section className="panel">
          <h2>
            {s.grouped ? "Shared pickup route" : "Separate pickup requests"}
          </h2>
          <div className="route">
            {[
              ["Renew Workshop", "160 kg · Furniture pickup"],
              ["Second Life Tech", "60 kg · Electronics pickup"],
              ["Growers cooperative", "200 kg · Produce pickup"],
              ["Meru campus", "Delivery and recipient confirmation"],
            ].map((r) => (
              <div className="stop" key={r[0]}>
                <h3>{r[0]}</h3>
                <p>{r[1]}</p>
              </div>
            ))}
          </div>
          <p className="note">
            Illustrative distances, not a live map. Produce requires clean
            separation; packaging and vehicle suitability must be checked.
          </p>
        </section>
        <section className="panel">
          <h2>Journey comparison</h2>
          {[
            ["Separate", 72, false],
            ["Current", s.grouped ? 36 : 72, true],
          ].map(([label, km, dark]) => (
            <div className="bar-row" key={label}>
              <span>{label}</span>
              <div className="track">
                <div
                  className={"fill " + (dark ? "darkfill" : "")}
                  style={{ width: `${(km / 72) * 100}%` }}
                />
              </div>
              <b>{km} km</b>
            </div>
          ))}
          <div className="stats" style={{ gridTemplateColumns: "1fr 1fr" }}>
            <Stat
              label="Distance avoided"
              value={s.grouped ? "36 km" : "0 km"}
              description="Same three demo loads"
            />
            <Stat
              label="Estimated reduction"
              value={s.grouped ? "9 kg" : "0 kg"}
              description="CO₂e · 0.25 kg/km"
            />
          </div>
          <p className="note">
            Actual benefits depend on the vehicle, loading, detours and journeys
            that would otherwise occur.
          </p>
        </section>
      </div>
    </>
  );
}
