"use client";

import { Search, ShoppingCart, X } from "lucide-react";
import { categories } from "@/lib/products";

type HeaderProps = {
  cartTotal: number;
  badgePop: boolean;
  searchValue: string;
  activeCategory: string;
  onSearchChange: (value: string) => void;
  onSearchClear: () => void;
  onCategoryChange: (category: string) => void;
  onOpenCart: () => void;
};

export default function Header({
  cartTotal,
  badgePop,
  searchValue,
  activeCategory,
  onSearchChange,
  onSearchClear,
  onCategoryChange,
  onOpenCart,
}: HeaderProps) {
  return (
    <header className="site-header">
      <div className="header-top">
        <div className="logo">
          <div className="logo-dot" aria-hidden="true" />
          Ateliê Terra
        </div>
        <button
          type="button"
          className="cart-btn"
          aria-label="Abrir carrinho"
          onClick={onOpenCart}
        >
          <ShoppingCart size={16} strokeWidth={2} />
          Carrinho
          {cartTotal > 0 && (
            <span className={`cart-badge${badgePop ? " pop" : ""}`}>
              {cartTotal}
            </span>
          )}
        </button>
      </div>

      <div className="search-wrap">
        <span className="search-icon" aria-hidden="true">
          <Search size={15} strokeWidth={2} />
        </span>
        <input
          type="text"
          value={searchValue}
          placeholder="Buscar produtos..."
          autoComplete="off"
          aria-label="Buscar produtos"
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchValue.length > 0 && (
          <button
            type="button"
            className="search-clear"
            aria-label="Limpar busca"
            onClick={onSearchClear}
          >
            <X size={14} strokeWidth={2.5} />
          </button>
        )}
      </div>

      <nav className="cat-nav" aria-label="Categorias">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`cat-btn${activeCategory === cat ? " active" : ""}`}
            onClick={() => onCategoryChange(cat)}
          >
            {cat}
          </button>
        ))}
      </nav>
    </header>
  );
}
