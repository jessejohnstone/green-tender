import React from "react";
import { titles } from "../data.js";
export default function Header({ view }) {
  return (
    <header>
      <span>
        Workspace / <strong>{titles[view]}</strong>
      </span>
      <span className="tag">Demo workspace</span>
    </header>
  );
}
