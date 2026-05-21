"use client";

import type { CardFieldErrors, InstallmentOption } from "@/lib/checkout-utils";
import { formatCardNumber, formatExpiry } from "@/lib/masks";

type CreditCardFormProps = {
  cardNumber: string;
  cardName: string;
  cardExpiry: string;
  cardCvv: string;
  cardFlag: string;
  installments: InstallmentOption[];
  selectedInstallment: number;
  errors: CardFieldErrors;
  onCardNumberChange: (value: string) => void;
  onCardNameChange: (value: string) => void;
  onCardExpiryChange: (value: string) => void;
  onCardCvvChange: (value: string) => void;
  onInstallmentChange: (n: number) => void;
};

export default function CreditCardForm({
  cardNumber,
  cardName,
  cardExpiry,
  cardCvv,
  cardFlag,
  installments,
  selectedInstallment,
  errors,
  onCardNumberChange,
  onCardNameChange,
  onCardExpiryChange,
  onCardCvvChange,
  onInstallmentChange,
}: CreditCardFormProps) {
  const previewNumber =
    cardNumber.length > 3 ? cardNumber : "•••• •••• •••• ••••";
  const previewName = cardName || "SEU NOME";
  const previewExpiry = cardExpiry || "MM/AA";

  const handleCardNumber = (raw: string) => {
    onCardNumberChange(formatCardNumber(raw));
  };

  return (
    <div className="tab-content active">
      <div className="card-preview">
        <div className="card-chip" aria-hidden="true" />
        <div className="card-number-display">{previewNumber}</div>
        <div className="card-info-row">
          <div>
            <div className="card-label-sm">TITULAR</div>
            <div className="card-value-sm">{previewName}</div>
          </div>
          <div>
            <div className="card-label-sm">VALIDADE</div>
            <div className="card-value-sm">{previewExpiry}</div>
          </div>
        </div>
        <div className="card-flag" aria-hidden="true">
          {cardFlag}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="cardNumber">
          Número do Cartão
        </label>
        <input
          className={`form-input${errors.cardNumber ? " error" : ""}`}
          id="cardNumber"
          placeholder="0000 0000 0000 0000"
          maxLength={19}
          autoComplete="cc-number"
          value={cardNumber}
          onChange={(e) => handleCardNumber(e.target.value)}
        />
        <div className={`form-error${errors.cardNumber ? " show" : ""}`}>
          Número de cartão inválido
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="cardName">
          Nome do Titular
        </label>
        <input
          className={`form-input${errors.cardName ? " error" : ""}`}
          id="cardName"
          placeholder="Como no cartão"
          autoComplete="cc-name"
          value={cardName}
          onChange={(e) => onCardNameChange(e.target.value.toUpperCase())}
        />
        <div className={`form-error${errors.cardName ? " show" : ""}`}>
          Insira o nome do titular
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="cardExpiry">
            Validade
          </label>
          <input
            className={`form-input${errors.cardExpiry ? " error" : ""}`}
            id="cardExpiry"
            placeholder="MM/AA"
            maxLength={5}
            autoComplete="cc-exp"
            value={cardExpiry}
            onChange={(e) =>
              onCardExpiryChange(formatExpiry(e.target.value))
            }
          />
          <div className={`form-error${errors.cardExpiry ? " show" : ""}`}>
            Data inválida
          </div>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="cardCvv">
            CVV
          </label>
          <input
            className={`form-input${errors.cardCvv ? " error" : ""}`}
            id="cardCvv"
            placeholder="•••"
            maxLength={4}
            type="password"
            autoComplete="cc-csc"
            value={cardCvv}
            onChange={(e) =>
              onCardCvvChange(e.target.value.replace(/\D/g, "").slice(0, 4))
            }
          />
          <div className={`form-error${errors.cardCvv ? " show" : ""}`}>
            CVV inválido
          </div>
        </div>
      </div>

      <div className="form-group">
        <span className="form-label">Parcelamento</span>
        <div className="installments">
          {installments.map((opt) => (
            <label key={opt.n} className="installment-opt">
              <input
                type="radio"
                name="installment"
                value={opt.n}
                checked={selectedInstallment === opt.n}
                onChange={() => onInstallmentChange(opt.n)}
              />
              <span className="installment-label">
                {opt.n === 1 ? "À vista" : opt.label}
              </span>
              {opt.free && <span className="free-tag">Sem juros</span>}
              {opt.totalLabel && (
                <span className="installment-extra">{opt.totalLabel}</span>
              )}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
