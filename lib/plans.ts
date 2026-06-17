export type PlanId = "early-bird" | "group" | "private";

export interface Plan {
  id: PlanId;
  name: string;
  unitAmount: number; // สตางค์ (THB ×100)
  minQty: number;
  maxQty: number;
}

export const PLANS: Record<PlanId, Plan> = {
  "early-bird": { id: "early-bird", name: "Vibe Code Bootcamp — Early Bird", unitAmount: 299000, minQty: 1, maxQty: 1 },
  group: { id: "group", name: "Vibe Code Bootcamp — กลุ่ม (ต่อคน)", unitAmount: 259000, minQty: 2, maxQty: 20 },
  private: { id: "private", name: "Vibe Code Bootcamp — Private Class", unitAmount: 699000, minQty: 1, maxQty: 1 },
};

export function getPlan(id: string): Plan | null {
  return (PLANS as Record<string, Plan>)[id] ?? null;
}

export function computeOrder(
  id: string,
  qty: number
): { plan: Plan; quantity: number; amountTotal: number } {
  const plan = getPlan(id);
  if (!plan) throw new Error(`unknown plan: ${id}`);
  if (!Number.isInteger(qty) || qty < plan.minQty || qty > plan.maxQty) {
    throw new Error(`invalid quantity ${qty} for plan ${id}`);
  }
  return { plan, quantity: qty, amountTotal: plan.unitAmount * qty };
}
