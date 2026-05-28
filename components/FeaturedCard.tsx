"use client";

import Image from "next/image";
import { Check, Loader2 } from "lucide-react";
import { formatCurrency } from "@/lib/format";
import { getBadgeClass } from "@/lib/catalog-utils";
import type { AddButtonState, Product } from "@/lib/types";

type FeaturedCardProps = {
  product: Product;
  buttonState: AddButtonState;
  onAdd: (id: number) => void;
};

export default function FeaturedCard({
  product,
  buttonState,
  onAdd,
}: FeaturedCardProps) {
  const btnClass = [
    "add-btn",
    buttonState === "loading" ? "loading spinning" : "",
    buttonState === "added" ? "added" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const badge = product.badge;
  let badgeClass = "";
  if (badge === "Novo") badgeClass = "bn";
  else if (badge === "Oferta") badgeClass = "bo";
  else if (badge === "Último") badgeClass = "bl";

  return (
    <article className="pcard" aria-label={product.name}>
      <div className="pcard-img">
        <div style={{ position: "relative", width: "100%", aspectRatio: "4/3", overflow: "hidden", borderRadius: "8px" }}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            style={{ objectFit: "cover", objectPosition: product.imagePosition ?? "center" }}
            sizes="(max-width: 768px) 100vw, 33vw"
            quality={85}
          />
        </div>
        {badge && <span className={`pcard-badge ${badgeClass}`}>{badge}</span>}
      </div>
      <div className="pcard-body">
        <div className="pcard-cat">{product.cat}</div>
        <div className="pcard-name">{product.name}</div>
        <div className="pcard-footer">
          <div>
            {product.original !== undefined && (
              <div className="pcard-price-old">
                {formatCurrency(product.original)}
              </div>
            )}
            <div className="pcard-price">{formatCurrency(product.price)}</div>
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
              <Check size={15} strokeWidth={2.5} />
            ) : buttonState === "loading" ? (
              <Loader2 size={15} strokeWidth={2.5} />
            ) : (
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
