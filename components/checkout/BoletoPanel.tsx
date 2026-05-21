"use client";

import {
  BOLETO_BAR_HEIGHTS,
  BOLETO_BAR_PATTERN,
} from "@/lib/checkout-utils";
import { formatCurrency } from "@/lib/format";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

type BoletoPanelProps = {
  total: number;
  dueDate: string;
  barcode: string;
};

export default function BoletoPanel({
  total,
  dueDate,
  barcode,
}: BoletoPanelProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(barcode.replace(/\s/g, ""));
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="tab-content active">
      <div className="boleto-box">
        <div className="boleto-box-icon" aria-hidden="true">
          🧾
        </div>
        <div className="boleto-box-title">Boleto Bancário</div>
        <p className="boleto-box-sub">
          O boleto será gerado após a confirmação.
          <br />
          Vencimento em <strong>3 dias úteis</strong>.
        </p>
      </div>

      <div className="boleto-info">
        <div className="boleto-info-row">
          <span className="lbl">Beneficiário</span>
          <span className="val">Ateliê Terra LTDA</span>
        </div>
        <div className="boleto-info-row">
          <span className="lbl">CNPJ</span>
          <span className="val">12.345.678/0001-99</span>
        </div>
        <div className="boleto-info-row">
          <span className="lbl">Banco</span>
          <span className="val">Banco do Brasil</span>
        </div>
        <div className="boleto-info-row">
          <span className="lbl">Vencimento</span>
          <span className="val">{dueDate}</span>
        </div>
        <div className="boleto-info-row">
          <span className="lbl">Valor</span>
          <span className="val">{formatCurrency(total)}</span>
        </div>
      </div>

      <div className="boleto-barcode">
        <div className="boleto-bars" aria-hidden="true">
          {BOLETO_BAR_PATTERN.map((width, i) => (
            <div
              key={i}
              className="boleto-bar"
              style={{
                width: `${width}px`,
                height: `${BOLETO_BAR_HEIGHTS[i] ?? 28}px`,
              }}
            />
          ))}
        </div>
        <div className="boleto-code-text">{barcode}</div>
      </div>

      <button
        type="button"
        className={`copy-btn${copied ? " copied" : ""}`}
        onClick={handleCopy}
      >
        {copied ? (
          <>
            <Check size={15} strokeWidth={2.5} />
            Copiado!
          </>
        ) : (
          <>
            <Copy size={15} strokeWidth={2} />
            Copiar linha digitável
          </>
        )}
      </button>

      <p className="boleto-note">
        ⚠️ Pedido confirmado após compensação bancária (até 2 dias úteis)
      </p>
    </div>
  );
}
