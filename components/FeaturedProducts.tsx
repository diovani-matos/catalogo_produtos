"use client";

import FeaturedCard from "@/components/FeaturedCard";
import type { AddButtonState, Product } from "@/lib/types";

type FeaturedProductsProps = {
  products: Product[];
  buttonStates: Record<number, AddButtonState>;
  onAddToCart: (id: number) => void;
  onSeeMore: () => void;
};

export default function FeaturedProducts({
  products,
  buttonStates,
  onAddToCart,
  onSeeMore,
}: FeaturedProductsProps) {
  return (
    <section
      id="destaque"
      style={{ background: "var(--stone-50)", padding: "80px 24px" }}
    >
      <div className="section-inner">
        <div className="featured-header reveal">
          <div>
            <p className="section-eyebrow">✦ Curadoria especial</p>
            <h2 className="section-title">
              Produtos em <em>Destaque</em>
            </h2>
            <p className="section-sub">
              Selecionados com carinho — os favoritos da nossa comunidade esta
              semana.
            </p>
          </div>
        </div>
        <div className="products-grid reveal">
          {products.map((product) => (
            <FeaturedCard
              key={product.id}
              product={product}
              buttonState={buttonStates[product.id] ?? "idle"}
              onAdd={onAddToCart}
            />
          ))}
        </div>
        <div className="see-more-wrap reveal">
          <button className="btn-see-more" id="seeMoreBtn" onClick={onSeeMore}>
            Ver todos os produtos
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
