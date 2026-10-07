import { catalog } from "./data.js";
export const initialState = {
  view: "studio",
  category: "chairs",
  qty: 30,
  budget: 90000,
  days: 7,
  priority: "balanced",
  selected: null,
  completed: false,
  grouped: false,
  reserved: [],
  funded: false,
};
export function getOptions(s) {
  const c = catalog[s.category];
  return c.options
    .map((o, id) => ({
      id,
      name: o[0],
      kind: o[1],
      detail: o[2],
      cost: o[3] * s.qty,
      co2: o[4] * s.qty,
      days: o[5],
      capacity: o[6],
      icon: o[7],
    }))
    .map((o) => ({
      ...o,
      eligible: o.cost <= s.budget && o.days <= s.days && o.capacity >= s.qty,
    }))
    .sort(
      (a, b) =>
        Number(b.eligible) - Number(a.eligible) ||
        (s.priority === "price"
          ? a.cost - b.cost
          : s.priority === "carbon"
            ? a.co2 - b.co2
            : a.cost / (c.baseline * s.qty) +
              a.co2 / (c.carbon * s.qty) -
              (b.cost / (c.baseline * s.qty) + b.co2 / (c.carbon * s.qty))),
    );
}
export function validateRequest(r) {
  if (
    !catalog[r.category] ||
    !Number.isInteger(r.qty) ||
    r.qty < 1 ||
    r.qty > 100 ||
    !Number.isFinite(r.budget) ||
    r.budget < 0 ||
    r.budget > 10000000 ||
    !Number.isInteger(r.days) ||
    r.days < 1 ||
    r.days > 60
  )
    throw Error(
      "Enter a valid category, 1–100 items, a non-negative budget and 1–60 days.",
    );
  return r;
}
export function getSavings(s) {
  const c = catalog[s.category],
    o = getOptions(s).find((o) => o.id === s.selected);
  return {
    cash: o ? c.baseline * s.qty - o.cost : 0,
    carbon: o ? c.carbon * s.qty - o.co2 : 0,
  };
}
