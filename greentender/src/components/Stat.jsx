import React from "react";
export default function Stat({ label, value, description }) {
  return (
    <div className="stat">
      <label>{label}</label>
      <strong>{value}</strong>
      <small>{description}</small>
    </div>
  );
}
