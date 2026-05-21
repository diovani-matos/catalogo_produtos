import CheckoutClient from "@/components/checkout/CheckoutClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout — Ateliê Terra",
  description: "Simulação de pagamento — cartão, boleto ou Pix",
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
