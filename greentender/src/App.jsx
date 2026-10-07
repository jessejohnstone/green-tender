import React, { useState, useRef, useEffect } from "react";
import { catalog } from "./data.js";
import {
  initialState,
  getOptions,
  getSavings,
  validateRequest,
} from "./model.js";
import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";
import RequestDialog from "./components/RequestDialog.jsx";
import ProcurementStudio from "./pages/ProcurementStudio.jsx";
import ReuseExchange from "./pages/ReuseExchange.jsx";
import SharedDeliveries from "./pages/SharedDeliveries.jsx";
import ImpactFunding from "./pages/ImpactFunding.jsx";
import Evidence from "./pages/Evidence.jsx";
export default function App() {
  const [s, setS] = useState(initialState),
    [toast, setToast] = useState("");
  const dialog = useRef(null),
    latest = useRef(s);
  latest.current = s;
  const update = (patch) => setS((old) => ({ ...old, ...patch }));
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 3500);
    return () => clearTimeout(t);
  }, [toast]);
  const c = catalog[s.category],
    options = getOptions(s),
    best = options.find((o) => o.eligible),
    selected = options.find((o) => o.id === s.selected),
    savings = getSavings(s);
  function select(id) {
    const o = getOptions(latest.current).find((o) => o.id === id);
    if (!o?.eligible || latest.current.completed)
      throw Error("Option is unavailable");
    update({ selected: id });
    setToast("Option selected. Review it in Impact & funding.");
    return { selected: o.name, cost: o.cost, estimatedKgCO2e: o.co2 };
  }
  function configure(r) {
    validateRequest(r);
    setS((old) => ({
      ...old,
      ...r,
      selected: null,
      completed: false,
      view: "studio",
    }));
    return { options: getOptions({ ...latest.current, ...r }) };
  }
  useEffect(() => {
    if (!document.modelContext?.registerTool) return;
    const abort = new AbortController();
    for (const tool of [
      {
        name: "configure_purchase_request",
        description: "Configure a demo request; resets selection.",
        inputSchema: {
          type: "object",
          properties: {
            category: { type: "string", enum: Object.keys(catalog) },
            qty: { type: "integer", minimum: 1, maximum: 100 },
            budget: { type: "number", minimum: 0, maximum: 10000000 },
            days: { type: "integer", minimum: 1, maximum: 60 },
          },
          required: ["category", "qty", "budget", "days"],
          additionalProperties: false,
        },
        execute: configure,
      },
      {
        name: "select_purchase_option",
        description:
          "Select an eligible demo option. Does not buy or confirm receipt.",
        inputSchema: {
          type: "object",
          properties: { id: { type: "integer", minimum: 0, maximum: 2 } },
          required: ["id"],
          additionalProperties: false,
        },
        execute: (r) => select(r.id),
      },
    ]) {
      try {
        Promise.resolve(
          document.modelContext.registerTool(
            { ...tool, annotations: { readOnlyHint: false } },
            { signal: abort.signal },
          ),
        ).catch(() => {});
      } catch {}
    }
    return () => abort.abort();
  }, []);
  function exportReport() {
    const report = {
      project: "GreenTender",
      demo: true,
      request: { category: s.category, quantity: s.qty, budget: s.budget },
      selection: selected || null,
      status: s.completed ? "demo-completed" : "projected",
      estimatedSavings: savings,
      transportEstimatedKgAvoided: s.grouped ? 9 : 0,
      methodology: "Illustrative factors; not verified climate impact.",
    };
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(report, null, 2)], { type: "application/json" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "greentender-demo-report.json";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <>
      <Sidebar s={s} update={update} />
      <div className="shell">
        <Header view={s.view} />
        <main>
          {s.view === "studio" && (
            <ProcurementStudio
              s={s}
              c={c}
              options={options}
              best={best}
              dialog={dialog}
              update={update}
              select={select}
            />
          )}
          {s.view === "reuse" && <ReuseExchange s={s} setS={setS} />}
          {s.view === "delivery" && <SharedDeliveries s={s} update={update} />}
          {s.view === "impact" && (
            <ImpactFunding
              s={s}
              c={c}
              selected={selected}
              savings={savings}
              update={update}
              setToast={setToast}
              exportReport={exportReport}
            />
          )}
          {s.view === "evidence" && <Evidence />}
        </main>
        <footer>
          GreenTender · Built for a more circular Kenya
          <span>Illustrative suppliers and impact factors.</span>
        </footer>
      </div>
      <RequestDialog dialog={dialog} state={s} onSave={configure} />
      {toast && (
        <div id="toast" style={{ display: "block" }} role="status">
          {toast}
        </div>
      )}
    </>
  );
}
