import React from "react";
export default function Intro({ eyebrow, title, description, children }) {
  return (
    <div className="intro">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {children}
    </div>
  );
}
