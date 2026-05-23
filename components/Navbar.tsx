"use client";

import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";

type NavbarProps = {
  cartTotal: number;
  onOpenCart: () => void;
};

export default function Navbar({ cartTotal, onOpenCart }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="navbar" id="navbar">
        <div className="nav-inner">
          <a href="#" className="nav-logo">
            <div className="logo-mark">🌿</div>
            Ateliê Terra
          </a>

          <ul
            className={`nav-links${mobileMenuOpen ? " open" : ""}`}
            id="navLinks"
          >
            <li>
              <a href="#" className="active">
                Home
              </a>
            </li>
            <li>
              <a href="#produtos">Produtos</a>
            </li>
            <li>
              <a href="#destaque">Destaques</a>
            </li>
            <li>
              <a href="#newsletter">Promoções</a>
            </li>
            <li>
              <a href="#contato">Contato</a>
            </li>
          </ul>

          <div className="nav-right">
            <button
              className="cart-btn"
              id="cartBtn"
              aria-label="Carrinho de compras"
              onClick={onOpenCart}
            >
              <svg
                width="16"
                height="16"
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
              Carrinho
              {cartTotal > 0 && (
                <span className="cart-badge" id="cartBadge">
                  {cartTotal}
                </span>
              )}
            </button>
            <button
              className="hamburger"
              id="hamburger"
              aria-label="Menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X width="22" height="22" strokeWidth="2.5" />
              ) : (
                <Menu width="22" height="22" strokeWidth="2.5" />
              )}
            </button>
          </div>
        </div>
      </nav>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.addEventListener('scroll', function() {
              document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 30);
            });
          `,
        }}
      />
    </>
  );
}
