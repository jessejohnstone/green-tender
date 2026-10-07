import React from "react";
const money = (n) => "KSh " + Math.round(n).toLocaleString("en-KE");
import Intro from "../components/Intro.jsx";
import Stat from "../components/Stat.jsx";
import { catalog } from "../data.js";
export default function Evidence({}) {
  return (
    <>
      <Intro
        eyebrow="TRANSPARENT BY DESIGN"
        title="Evidence before claims."
        description="Every estimate should be explainable and open to correction."
      />
      <section className="panel">
        <h2>How this demo calculates impact</h2>
        <p>
          Procurement estimate = quantity × illustrative per-unit factor.
          Avoided footprint = new-purchase baseline − selected option. Costs use
          sample quotes.
        </p>
        <div className="tablewrap">
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>New baseline</th>
                <th>Reuse / repair</th>
                <th>Refurbished / alternative</th>
                <th>Evidence</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(catalog).map((c) => (
                <tr key={c.name}>
                  <td>{c.name}</td>
                  <td>{c.carbon} kg CO₂e/unit</td>
                  <td>{c.options[0][4]} kg/unit</td>
                  <td>{c.options[1][4]} kg/unit</td>
                  <td>Illustrative · low confidence</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="note">
          Simplified product scenarios. Transport uses an illustrative 0.25 kg
          CO₂e/km. Production requires sourced factors, consistent life-cycle
          boundaries and proof of displaced purchases. Reuse is not
          automatically zero emissions.
        </p>
      </section>
      <div className="grid2" style={{ marginTop: 22 }}>
        <section className="panel">
          <h2>Water & agriculture</h2>
          <p>
            No water savings are claimed without verified farm data. Evidence
            needed: crop, season, water source, irrigation logs, yield and a
            comparable baseline.
          </p>
        </section>
        <section className="panel">
          <h2>Production requirements</h2>
          <p>
            Real quotations, verified inventory, recipient confirmations,
            authenticated organizations and durable records.
          </p>
          <p className="note">
            Refreshing resets this prototype. No supplier is contacted and no
            payment is processed.
          </p>
        </section>
      </div>
    </>
  );
}
