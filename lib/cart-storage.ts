import type { CartItem } from "./types";

const CART_KEY = "atelie-terra-checkout";

export type CheckoutSnapshot = {
  items: CartItem[];
  total: number;
};

export function saveCheckoutCart(items: CartItem[], total: number): void {
  if (typeof window === "undefined") return;
  const snapshot: CheckoutSnapshot = { items, total };
  sessionStorage.setItem(CART_KEY, JSON.stringify(snapshot));
}

export function loadCheckoutCart(): CheckoutSnapshot | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(CART_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as CheckoutSnapshot;
    if (!parsed.items?.length) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function clearCheckoutCart(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(CART_KEY);
}
