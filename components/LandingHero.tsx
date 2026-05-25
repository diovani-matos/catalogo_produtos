"use client";

import CounterBadge from "@/components/CounterBadge";

export default function LandingHero() {
  return (
    <section className="hero" id="home">
      <div className="hero-bg"></div>
      <div className="hero-content">
        <div className="hero-eyebrow">
          <span></span> Nova coleção disponível agora
        </div>
        <h1>
          Artesanato que
          <br />
          <em>conta histórias</em>
        </h1>
        <p>
          Peças únicas feitas à mão com materiais naturais. Do campo direto para
          sua casa — com alma, textura e muito cuidado.
        </p>
        <div className="hero-actions">
          <button
            className="btn-primary"
            onClick={() => {
              const el = document.getElementById("destaque");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            Comprar Agora
          </button>
          <button
            className="btn-outline"
            onClick={() => {
              const el = document.getElementById("destaque");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Ver Destaques
          </button>
        </div>
      </div>
      <CounterBadge />
      <div className="hero-scroll">
        <span>ROLAR</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  );
}
