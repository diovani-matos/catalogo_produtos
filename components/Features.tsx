"use client";

import { ShoppingCart, X } from "lucide-react";
import { formatCurrency } from "@/lib/format";
import type { CartItem } from "@/lib/types";

type FeaturesProps = {
  isOpen: boolean;
  items: CartItem[];
  total: number;
  onClose: () => void;
  onUpdateQty: (id: number, action: "plus" | "minus") => void;
  onCheckout: () => void;
};

export default function Features({
  isOpen,
  items,
  total,
  onClose,
  onUpdateQty,
  onCheckout,
}: FeaturesProps) {
  return (
    <>
      <button
        type="button"
        className={`overlay${isOpen ? " open" : ""}`}
        aria-label="Fechar carrinho"
        onClick={onClose}
      />

      <aside
        className={`drawer${isOpen ? " open" : ""}`}
        aria-label="Carrinho de compras"
        aria-hidden={!isOpen}
      >
        <div className="drawer-header">
          <h2>Meu Carrinho</h2>
          <button
            type="button"
            className="drawer-close"
            aria-label="Fechar carrinho"
            onClick={onClose}
          >
            <X size={16} strokeWidth={2.5} />
          </button>
        </div>

        <div className="drawer-body">
          {items.length === 0 ? (
            <div className="cart-empty">
              <ShoppingCart
                size={40}
                strokeWidth={1.5}
                color="var(--stone-300)"
              />
              <p>Seu carrinho está vazio</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-emoji" aria-hidden="true">
                  {item.emoji}
                </div>
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-price">
                    {formatCurrency(item.price)} × {item.qty} ={" "}
                    {formatCurrency(item.price * item.qty)}
                  </div>
                </div>
                <div className="qty-ctrl">
                  <button
                    type="button"
                    className="qty-btn"
                    aria-label={`Diminuir quantidade de ${item.name}`}
                    onClick={() => onUpdateQty(item.id, "minus")}
                  >
                    −
                  </button>
                  <span className="qty-num">{item.qty}</span>
                  <button
                    type="button"
                    className="qty-btn"
                    aria-label={`Aumentar quantidade de ${item.name}`}
                    onClick={() => onUpdateQty(item.id, "plus")}
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="drawer-footer">
            <div className="total-row">
              <span className="total-label">Total</span>
              <span className="total-value">{formatCurrency(total)}</span>
            </div>
            <button type="button" className="checkout-btn" onClick={onCheckout}>
              Finalizar Pedido →
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
