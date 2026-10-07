import React from "react";
import { titles } from "../data.js";
export default function Sidebar({ s, update }) {
  return (
    <aside>
      <a className="brand" href="#" onClick={() => update({ view: "studio" })}>
        <b>G</b> GreenTender<span>.</span>
      </a>
      <div className="workspace">
        MC{" "}
        <span>
          MY CUMPUS<small>Procurement workspace</small>
        </span>
      </div>
      <small className="navlabel">WORKSPACE</small>
      <nav>
        {Object.entries(titles).map(([id, title], i) => (
          <button
            key={id}
            className={s.view === id ? "active" : ""}
            aria-current={s.view === id ? "page" : undefined}
            onClick={() => update({ view: id })}
          >
            {["◫", "♲", "⇄", "▥", "◎"][i]} {title}
          </button>
        ))}
      </nav>
      <div className="asidecard">
        <span className="symbol">↗</span>
        <h3>
          A better purchase
          <br />
          starts here.
        </h3>
        <p>
          Keep resources in use.
          <br />
          Make every shilling count.
        </p>
        <small>HACKATHON CHALLENGE</small>
        <p className="fine">Sample records. Session-only decisions.</p>
      </div>
    </aside>
  );
}
