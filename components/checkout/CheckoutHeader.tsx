import { ChevronLeft } from "lucide-react";
import Link from "next/link";

type CheckoutHeaderProps = {
  showConfirmationStep?: boolean;
};

export default function CheckoutHeader({
  showConfirmationStep = false,
}: CheckoutHeaderProps) {
  return (
    <header className="checkout-site-header">
      <Link href="/" className="back-btn">
        <ChevronLeft size={16} strokeWidth={2.5} />
        Voltar
      </Link>
      <div className="logo">
        <div className="logo-dot" aria-hidden="true" />
        Ateliê Terra
      </div>
      <div className="steps" aria-label="Etapas do checkout">
        <div className="step done">
          <div className="step-num">✓</div>
          <span>Carrinho</span>
        </div>
        <div className="step-sep" aria-hidden="true" />
        <div className={`step${showConfirmationStep ? " done" : " active"}`}>
          <div className="step-num">{showConfirmationStep ? "✓" : "2"}</div>
          <span>Pagamento</span>
        </div>
        <div className="step-sep" aria-hidden="true" />
        <div className={`step${showConfirmationStep ? " active" : ""}`}>
          <div className="step-num">3</div>
          <span>Confirmação</span>
        </div>
      </div>
    </header>
  );
}
