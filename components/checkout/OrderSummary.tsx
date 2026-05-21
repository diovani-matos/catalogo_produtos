"use client";

import type { ReactNode } from "react";
import { formatCurrency } from "@/lib/format";
import type { PaymentMethod } from "@/lib/checkout-utils";
import type { CartItem } from "@/lib/types";
import { CreditCard, Shield, ShoppingBag } from "lucide-react";

type OrderSummaryProps = {
  items: CartItem[];
  subtotal: number;
  frete: number;
  discount: number;
  grandTotal: number;
  couponInput: string;
  couponStatus: "idle" | "success" | "error";
  method: PaymentMethod;
  isProcessing: boolean;
  onCouponChange: (value: string) => void;
  onApplyCoupon: () => void;
  onSubmit: () => void;
};

function getCtaContent(
  method: PaymentMethod,
  isProcessing: boolean,
): ReactNode {
  if (isProcessing) {
    return (
      <>
        <span className="btn-spinner" aria-hidden="true" />
        Processando...
      </>
    );
  }
  if (method === "pix") {
    return (
      <>
        <span aria-hidden="true">⚡</span>
        Confirmar e Usar Pix
      </>
    );
  }
  if (method === "boleto") {
    return (
      <>
        <CreditCard size={15} strokeWidth={2.5} />
        Gerar Boleto
      </>
    );
  }
  return (
    <>
      <CreditCard size={16} strokeWidth={2.5} />
      Finalizar Pagamento
    </>
  );
}

export default function OrderSummary({
  items,
  subtotal,
  frete,
  discount,
  grandTotal,
  couponInput,
  couponStatus,
  method,
  isProcessing,
  onCouponChange,
  onApplyCoupon,
  onSubmit,
}: OrderSummaryProps) {
  return (
    <div>
      <div className="panel">
        <div className="panel-header">
          <div className="panel-icon">
            <ShoppingBag size={16} strokeWidth={2} />
          </div>
          <h2>Resumo do Pedido</h2>
        </div>
        <div className="panel-body">
          <div>
            {items.map((item) => (
              <div key={item.id} className="order-item">
                <div className="order-emoji" aria-hidden="true">
                  {item.emoji}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="order-name">{item.name}</div>
                  <div className="order-qty">Qtd: {item.qty}</div>
                </div>
                <div className="order-price">
                  {formatCurrency(item.price * item.qty)}
                </div>
              </div>
            ))}
          </div>

          <hr className="checkout-divider" />

          <div className="coupon-row">
            <input
              className={`coupon-input${
                couponStatus === "success"
                  ? " success"
                  : couponStatus === "error"
                    ? " error"
                    : ""
              }`}
              placeholder="Cupom de desconto"
              value={couponInput}
              onChange={(e) => onCouponChange(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onApplyCoupon()}
            />
            <button type="button" className="coupon-btn" onClick={onApplyCoupon}>
              Aplicar
            </button>
          </div>

          <div className="total-rows">
            <div className="total-row">
              <span className="lbl">Subtotal</span>
              <span className="val">{formatCurrency(subtotal)}</span>
            </div>
            <div className="total-row">
              <span className="lbl">Frete</span>
              <span className="val">
                {frete === 0 ? "🎉 Grátis" : formatCurrency(frete)}
              </span>
            </div>
            {discount > 0 && (
              <div className="total-row discount">
                <span className="lbl">Desconto</span>
                <span className="val">−{formatCurrency(discount)}</span>
              </div>
            )}
            <hr className="checkout-divider" style={{ margin: "8px 0" }} />
            <div className="total-row grand">
              <span className="lbl">Total</span>
              <span className="val">{formatCurrency(grandTotal)}</span>
            </div>
          </div>

          <button
            type="button"
            className="cta-btn"
            disabled={isProcessing}
            onClick={onSubmit}
          >
            {getCtaContent(method, isProcessing)}
          </button>

          <div className="secure-note">
            <Shield size={12} strokeWidth={2.5} />
            Pagamento 100% seguro e criptografado
          </div>
        </div>
      </div>

      <div className="checkout-logos">
        <span>Aceito:</span>
        <span className="checkout-logos-icons" title="Visa">
          💳
        </span>
        <span className="checkout-logos-icons" title="Mastercard">
          💳
        </span>
        <span className="checkout-logos-icons" title="Pix">
          ⚡
        </span>
        <span className="checkout-logos-icons" title="Boleto">
          🧾
        </span>
      </div>
    </div>
  );
}
