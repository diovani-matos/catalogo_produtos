"use client";

import { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [subscribeOk, setSubscribeOk] = useState(false);
  const [error, setError] = useState(false);

  const handleSubscribe = () => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValid) {
      setError(true);
      return;
    }
    setError(false);
    setSubscribeOk(true);
    setEmail("");
  };

  return (
    <section id="newsletter" className="newsletter-section">
      <div className="newsletter-inner">
        <div className="newsletter-left reveal">
          <div className="newsletter-tag">📬 Newsletter exclusiva</div>
          <h2 className="newsletter-title">
            Fique por dentro das
            <br />
            nossas <em>promoções</em>
          </h2>
          <p className="newsletter-sub">
            Receba em primeira mão lançamentos, ofertas exclusivas e dicas de
            decoração artesanal direto no seu e-mail.
          </p>
          <div className="newsletter-perks">
            <div className="perk">
              <div className="perk-dot">🎁</div>
              Desconto de boas-vindas de 10% na primeira compra
            </div>
            <div className="perk">
              <div className="perk-dot">⚡</div>
              Acesso antecipado a novos produtos
            </div>
            <div className="perk">
              <div className="perk-dot">🔕</div>
              Sem spam — cancele quando quiser
            </div>
          </div>

          {!subscribeOk && (
            <div className="email-form">
              <input
                className={`email-input${error ? " error" : ""}`}
                id="emailInput"
                type="email"
                placeholder="seu@email.com.br"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(false);
                }}
              />
              <button className="btn-subscribe" onClick={handleSubscribe}>
                Inscrever-se →
              </button>
            </div>
          )}

          {subscribeOk && (
            <div className="subscribe-ok" id="subscribeOk">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="9 12 11 14 15 10" />
              </svg>
              Inscrição confirmada! Fique de olho no seu e-mail 🌿
            </div>
          )}
        </div>

        <div className="newsletter-right reveal">
          <div className="illus-wrap">
            <div className="illus-grid">
              <div className="illus-card">
                <div className="illus-emoji">🏺</div>
                <div className="illus-name">Vaso Rústico</div>
                <div className="illus-price">R$ 74,90</div>
              </div>
              <div className="illus-card">
                <div className="illus-emoji">🧶</div>
                <div className="illus-name">Tapete Boho</div>
                <div className="illus-price">R$ 129,00</div>
              </div>
              <div className="illus-card">
                <div className="illus-emoji">💜</div>
                <div className="illus-name">Vela Lavanda</div>
                <div className="illus-price">R$ 42,00</div>
              </div>
              <div className="illus-card">
                <div className="illus-emoji">🧼</div>
                <div className="illus-name">Kit Spa</div>
                <div className="illus-price">R$ 62,00</div>
              </div>
            </div>
            <div className="illus-badge">
              10% OFF
              <span>cupom: TERRA10</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
