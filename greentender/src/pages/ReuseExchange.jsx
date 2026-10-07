import React from "react";
const money = (n) => "KSh " + Math.round(n).toLocaleString("en-KE");
import Intro from "../components/Intro.jsx";
import Stat from "../components/Stat.jsx";
export default function ReuseExchange({ s, setS }) {
  return (
    <>
      <Intro
        eyebrow="THE CIRCULAR EXCHANGE"
        title="Someone’s surplus. Your next solution."
        description="Reserve available resources before buying something new."
      />
      <div className="grid3">
        {[
          ["Event chairs", 40, "Student centre", "Available this week", "♲"],
          [
            "Office desks",
            20,
            "Administration block",
            "Available in 2 days",
            "▱",
          ],
          [
            "Repairable laptops",
            30,
            "IT department",
            "Requires repair assessment",
            "⌘",
          ],
          [
            "Reusable transport crates",
            60,
            "Growers cooperative",
            "Return after delivery",
            "◇",
          ],
        ].map((r, i) => (
          <article className="panel exchange" key={r[0]}>
            <span className="tag">
              {s.reserved.includes(i)
                ? "Reserved in demo"
                : "Internal exchange"}
            </span>
            <div className="exchange-icon">{r[4]}</div>
            <h2>{r[0]}</h2>
            <p>
              {r[2]} · {r[1]} units
            </p>
            <p>{r[3]}</p>
            <p className="note">
              Sample inventory. Confirm condition and availability before real
              use.
            </p>
            <button
              className={s.reserved.includes(i) ? "secondary" : "primary"}
              onClick={() =>
                setS((old) => ({
                  ...old,
                  reserved: old.reserved.includes(i)
                    ? old.reserved.filter((x) => x !== i)
                    : [...old.reserved, i],
                }))
              }
            >
              {s.reserved.includes(i)
                ? "Release reservation"
                : "Reserve in demo"}
            </button>
          </article>
        ))}
      </div>
    </>
  );
}
