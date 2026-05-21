"use client";

import BoletoPanel from "@/components/checkout/BoletoPanel";
import CreditCardForm from "@/components/checkout/CreditCardForm";
import PixPanel from "@/components/checkout/PixPanel";
import type { CardFieldErrors, InstallmentOption, PaymentMethod } from "@/lib/checkout-utils";
import { CreditCard } from "lucide-react";

type PaymentPanelProps = {
  method: PaymentMethod;
  onMethodChange: (method: PaymentMethod) => void;
  grandTotal: number;
  dueDate: string;
  boletoCode: string;
  pixCode: string;
  cardNumber: string;
  cardName: string;
  cardExpiry: string;
  cardCvv: string;
  cardFlag: string;
  installments: InstallmentOption[];
  selectedInstallment: number;
  cardErrors: CardFieldErrors;
  onCardNumberChange: (value: string) => void;
  onCardNameChange: (value: string) => void;
  onCardExpiryChange: (value: string) => void;
  onCardCvvChange: (value: string) => void;
  onInstallmentChange: (n: number) => void;
};

const TABS: { id: PaymentMethod; icon: string; label: string }[] = [
  { id: "card", icon: "💳", label: "Cartão" },
  { id: "boleto", icon: "🧾", label: "Boleto" },
  { id: "pix", icon: "⚡", label: "Pix" },
];

export default function PaymentPanel({
  method,
  onMethodChange,
  grandTotal,
  dueDate,
  boletoCode,
  pixCode,
  cardNumber,
  cardName,
  cardExpiry,
  cardCvv,
  cardFlag,
  installments,
  selectedInstallment,
  cardErrors,
  onCardNumberChange,
  onCardNameChange,
  onCardExpiryChange,
  onCardCvvChange,
  onInstallmentChange,
}: PaymentPanelProps) {
  return (
    <div className="panel">
      <div className="panel-header">
        <div className="panel-icon">
          <CreditCard size={16} strokeWidth={2} />
        </div>
        <h2>Forma de Pagamento</h2>
      </div>
      <div className="panel-body">
        <div className="tabs" role="tablist" aria-label="Meios de pagamento">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={method === tab.id}
              className={`tab${method === tab.id ? " active" : ""}`}
              onClick={() => onMethodChange(tab.id)}
            >
              <span className="tab-icon" aria-hidden="true">
                {tab.icon}
              </span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {method === "card" && (
          <CreditCardForm
            cardNumber={cardNumber}
            cardName={cardName}
            cardExpiry={cardExpiry}
            cardCvv={cardCvv}
            cardFlag={cardFlag}
            installments={installments}
            selectedInstallment={selectedInstallment}
            errors={cardErrors}
            onCardNumberChange={onCardNumberChange}
            onCardNameChange={onCardNameChange}
            onCardExpiryChange={onCardExpiryChange}
            onCardCvvChange={onCardCvvChange}
            onInstallmentChange={onInstallmentChange}
          />
        )}

        {method === "boleto" && (
          <BoletoPanel
            total={grandTotal}
            dueDate={dueDate}
            barcode={boletoCode}
          />
        )}

        {method === "pix" && (
          <PixPanel pixCode={pixCode} active={method === "pix"} />
        )}
      </div>
    </div>
  );
}
