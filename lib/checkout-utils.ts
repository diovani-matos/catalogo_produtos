import { formatCurrency } from "./format";
import type { CartItem } from "./types";

export type PaymentMethod = "card" | "boleto" | "pix";

const FREE_SHIPPING_MIN = 200;
const SHIPPING_COST = 18.9;

export function getSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.qty, 0);
}

export function getFrete(subtotal: number): number {
  return subtotal >= FREE_SHIPPING_MIN ? 0 : SHIPPING_COST;
}

export function getGrandTotal(subtotal: number, discount: number): number {
  return subtotal - discount + getFrete(subtotal);
}

export function formatDueDate(daysFromNow = 3): string {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function generateBoletoCode(total: number): string {
  const base = Math.floor(total * 100)
    .toString()
    .padStart(14, "0");
  return `00190.00009 ${base.slice(0, 5)}.${base.slice(5, 10)} ${base.slice(10)} 1 00010000000000`;
}

export function generatePixCode(total: number): string {
  const amount = total.toFixed(2);
  return `00020126580014BR.GOV.BCB.PIX0136atelie-terra@pix.com.br5204000053039865802BR5925ATELIE TERRA LTDA6009SAO PAULO62070503***6304${Math.floor(total * 100)
    .toString(16)
    .toUpperCase()
    .padStart(4, "0")
    .slice(0, 4)}`;
}

export type InstallmentOption = {
  n: number;
  label: string;
  value: number;
  totalLabel?: string;
  free?: boolean;
};

export function getInstallmentOptions(grandTotal: number): InstallmentOption[] {
  const counts = [1, 2, 3, 6, 12];
  return counts.map((n) => {
    const value =
      n === 1 ? grandTotal : (grandTotal * (1 + 0.0199 * (n - 1))) / n;
    return {
      n,
      label: `${n}× de ${formatCurrency(value)}`,
      value,
      free: n === 1,
      totalLabel: n > 1 ? `Total ${formatCurrency(value * n)}` : undefined,
    };
  });
}

export const BOLETO_BAR_PATTERN = [
  2, 1, 3, 1, 2, 1, 1, 3, 1, 2, 1, 1, 2, 3, 1, 2, 1, 1, 3, 1, 2, 1, 2, 3, 1, 1,
  2, 1, 3, 2, 1, 1, 2, 1, 3, 1, 2, 1, 1, 2, 3,
];

export const BOLETO_BAR_HEIGHTS = [
  28, 22, 34, 20, 30, 24, 22, 36, 21, 29, 23, 20, 31, 38, 22, 27, 24, 21, 35,
  20, 28, 25, 33, 37, 22, 21, 30, 23, 34, 26, 22, 21, 29, 24, 32, 20, 28, 25,
  21, 36, 23,
];

export type CardFieldErrors = {
  cardNumber?: boolean;
  cardName?: boolean;
  cardExpiry?: boolean;
  cardCvv?: boolean;
};

export function validateCardFields(
  cardNumber: string,
  cardName: string,
  cardExpiry: string,
  cardCvv: string,
): CardFieldErrors {
  const errors: CardFieldErrors = {};
  if (cardNumber.replace(/\s/g, "").length !== 16) errors.cardNumber = true;
  if (cardName.trim().length <= 2) errors.cardName = true;
  if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) errors.cardExpiry = true;
  if (cardCvv.length < 3) errors.cardCvv = true;
  return errors;
}

export function detectCardFlag(digits: string): string {
  if (/^4/.test(digits)) return "🟦";
  if (/^5[1-5]/.test(digits) || /^2[2-7]/.test(digits)) return "🔴";
  if (/^3[47]/.test(digits)) return "🟩";
  return "💳";
}

export function getCtaLabel(method: PaymentMethod): string {
  if (method === "pix") return "Confirmar e Usar Pix";
  if (method === "boleto") return "Gerar Boleto";
  return "Finalizar Pagamento";
}

export function getSuccessMessages(method: PaymentMethod): [string, string] {
  const msgs: Record<PaymentMethod, [string, string]> = {
    card: [
      "Pedido Confirmado!",
      "Pagamento aprovado no cartão. Você receberá um e-mail de confirmação em breve.",
    ],
    boleto: [
      "Boleto Gerado!",
      "O boleto foi enviado para seu e-mail. Seu pedido será separado após a compensação.",
    ],
    pix: [
      "Pix Confirmado!",
      "Pagamento Pix recebido com sucesso! Seu pedido já está sendo preparado.",
    ],
  };
  return msgs[method];
}
