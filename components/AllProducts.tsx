"use client";

import FeaturedCard from "@/components/FeaturedCard";
import type { AddButtonState, Product } from "@/lib/types";

type AllProductsProps = {
  products: Product[];
  buttonStates: Record<number, AddButtonState>;
  onAddToCart: (id: number) => void;
  isVisible: boolean;
};

export default function AllProducts({
  products,
  buttonStates,
  onAddToCart,
  isVisible,
}: AllProductsProps) {
  return (
    <section
      id="all-sec"
      style={{
        background: "var(--stone-50)",
        padding: "80px 24px",
        display: isVisible ? "block" : "none",
      }}
    >
      <div className="section-inner">
        <div className="featured-header reveal">
          <div>
            <p className="section-eyebrow">✦ Catálogo completo</p>
            <h2 className="section-title">
              Todos os <em>Produtos</em>
            </h2>
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
      </div>
    </section>
  );
}
