import React, { useState, useEffect } from "react";
import { catalog } from "../data.js";
import { validateRequest } from "../model.js";
export default function RequestDialog({ dialog, state, onSave }) {
  const [draft, setDraft] = useState(state),
    [error, setError] = useState("");
  useEffect(() => {
    setDraft(state);
  }, [state.category, state.qty, state.budget, state.days]);
  const field = (k, v) => setDraft((d) => ({ ...d, [k]: v }));
  return (
    <dialog ref={dialog}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          try {
            validateRequest(draft);
            onSave(draft);
            setError("");
            dialog.current.close();
          } catch (e) {
            setError(e.message);
          }
        }}
      >
        <div className="between">
          <h2>Create a request</h2>
          <button
            type="button"
            className="plain"
            aria-label="Close"
            onClick={() => dialog.current.close()}
          >
            ×
          </button>
        </div>
        <p>Explore available options in this demo.</p>
        <label>
          Category
          <select
            value={draft.category}
            onChange={(e) => field("category", e.target.value)}
          >
            {Object.entries(catalog).map(([id, c]) => (
              <option key={id} value={id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        {[
          ["qty", "Quantity", 1, 100],
          ["budget", "Total budget (KSh)", 0, 10000000],
          ["days", "Needed within (days)", 1, 60],
        ].map(([key, label, min, max]) => (
          <label key={key}>
            {label}
            <input
              type="number"
              required
              min={min}
              max={max}
              step="1"
              value={draft[key]}
              onChange={(e) =>
                field(key, e.target.value === "" ? "" : Number(e.target.value))
              }
            />
          </label>
        ))}
        {error && <p role="alert">{error}</p>}
        <button className="primary">Compare options</button>
      </form>
    </dialog>
  );
}
