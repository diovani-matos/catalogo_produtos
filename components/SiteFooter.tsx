"use client";

import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer id="contato" className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <h3>
            <span style={{ fontSize: "20px" }}>🌿</span> Ateliê Terra
          </h3>
          <p>
            Produtos artesanais feitos com amor, intenção e materiais naturais.
            Cada peça carrega a história de quem a fez.
          </p>
          <div className="social-row">
            <a
              href="https://instagram.com/matosdiovani"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn instagram"
              aria-label="Instagram"
              title="Instagram"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a
              href="https://wa.me/5547999990000"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn whatsapp"
              aria-label="WhatsApp — Suporte"
              title="WhatsApp"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              <div className="wa-tooltip">💬 Suporte via WhatsApp</div>
            </a>
          </div>
        </div>
        <div className="footer-col">
          <h4>Navegação</h4>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#destaque">Catálogo</a>
            </li>
            <li>
              <a href="#destaque">Destaques</a>
            </li>
            <li>
              <a href="#newsletter">Promoções</a>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Informações</h4>
          <ul>
            <li>
              <a href="#" style={{ cursor: "default", pointerEvents: "none" }}>Sobre nós</a>
            </li>
            <li>
              <a href="#" style={{ cursor: "default", pointerEvents: "none" }}>Como funciona</a>
            </li>
            <li>
              <a href="#" style={{ cursor: "default", pointerEvents: "none" }}>Trocas e devoluções</a>
            </li>
            <li>
              <a href="#" style={{ cursor: "default", pointerEvents: "none" }}>Rastrear pedido</a>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Contato</h4>
          <ul>
            <li>
              <a href="#" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Mail size={14} style={{ color: "var(--stone-400)", flexShrink: 0 }} />
                ola@atelieterra.com
              </a>
            </li>
            <li>
              <a href="#" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Phone size={14} style={{ color: "var(--stone-400)", flexShrink: 0 }} />
                (47) 99999-0000
              </a>
            </li>
            <li>
              <a href="#" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <MapPin size={14} style={{ color: "var(--stone-400)", flexShrink: 0 }} />
                Itajaí, SC
              </a>
            </li>
            <li>
              <a href="#" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Clock size={14} style={{ color: "var(--stone-400)", flexShrink: 0 }} />
                Seg–Sex, 9h–18h
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Ateliê Terra. Todos os direitos reservados.</span>
        <div style={{ display: "flex", gap: "20px" }}>
          <a href="#">Privacidade</a>
          <a href="#">Termos de uso</a>
          <a href="#">Cookies</a>
        </div>
      </div>
    </footer>
  );
}
