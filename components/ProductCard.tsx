"use client";

import { Check, Loader2, ShoppingCart } from "lucide-react";
import { formatCurrency } from "@/lib/format";
import { getBadgeClass } from "@/lib/catalog-utils";
import type { AddButtonState, Product } from "@/lib/types";

type ProductCardProps = {
  product: Product;
  buttonState: AddButtonState;
  onAdd: (id: number) => void;
};

export default function ProductCard({
  product,
  buttonState,
  onAdd,
}: ProductCardProps) {
  const btnClass = [
    "add-btn",
    buttonState === "loading" ? "loading spinning" : "",
    buttonState === "added" ? "added" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className="product-card" aria-label={product.name}>
      <div className="product-card-img">
        <div className="product-card-img-inner" aria-hidden="true">
          {product.emoji}
        </div>
        {product.badge && (
          <span className={`card-badge ${getBadgeClass(product.badge)}`}>
            {product.badge}
          </span>
        )}
      </div>
      <div className="product-card-body">
        <div className="card-cat">{product.cat}</div>
        <div className="card-name">{product.name}</div>
        <div className="card-desc">{product.desc}</div>
        <div className="card-footer">
          <div>
            {product.original !== undefined && (
              <div className="card-price-old">
                {formatCurrency(product.original)}
              </div>
            )}
            <div className="card-price">{formatCurrency(product.price)}</div>
          </div>
          <button
            type="button"
            className={btnClass}
            aria-label={`Adicionar ${product.name} ao carrinho`}
            disabled={buttonState === "loading"}
            onClick={(e) => {
              e.stopPropagation();
              onAdd(product.id);
            }}
          >
            {buttonState === "added" ? (
              <Check size={16} strokeWidth={2.5} />
            ) : buttonState === "loading" ? (
              <Loader2 size={16} strokeWidth={2.5} />
            ) : (
              <ShoppingCart size={16} strokeWidth={2.2} />
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
