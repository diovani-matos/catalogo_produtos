"use client";

import EmptyState from "@/components/EmptyState";
import ProductCard from "@/components/ProductCard";
import SkeletonGrid from "@/components/SkeletonGrid";
import type { AddButtonState, Product } from "@/lib/types";

type ProductGroup = {
  title: string;
  items: Product[];
};

type HeroProps = {
  isLoading: boolean;
  groups: ProductGroup[];
  isEmpty: boolean;
  buttonStates: Record<number, AddButtonState>;
  onAddToCart: (id: number) => void;
};

export default function Hero({
  isLoading,
  groups,
  isEmpty,
  buttonStates,
  onAddToCart,
}: HeroProps) {
  return (
    <main className="catalog-main">
      {isLoading && <SkeletonGrid />}

      {!isLoading && (
        <div>
          {groups.map((group) => {
            if (!group.items.length) return null;
            return (
              <section key={group.title}>
                <p className="section-title">
                  {group.title}{" "}
                  <span className="section-title-count">
                    ({group.items.length})
                  </span>
                </p>
                <div className="product-grid">
                  {group.items.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      buttonState={buttonStates[product.id] ?? "idle"}
                      onAdd={onAddToCart}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}

      <EmptyState visible={!isLoading && isEmpty} />
    </main>
  );
}
