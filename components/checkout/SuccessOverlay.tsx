import Link from "next/link";

type SuccessOverlayProps = {
  visible: boolean;
  title: string;
  subtitle: string;
  orderNumber: string;
};

export default function SuccessOverlay({
  visible,
  title,
  subtitle,
  orderNumber,
}: SuccessOverlayProps) {
  return (
    <div
      className={`success-overlay${visible ? " show" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-title"
    >
      <div className="success-card">
        <div className="success-icon-wrap" aria-hidden="true">
          ✅
        </div>
        <h2 className="success-title" id="success-title">
          {title}
        </h2>
        <p className="success-sub">{subtitle}</p>
        <div className="success-order">
          Pedido <strong>#ATL-{orderNumber}</strong> — Prazo de entrega:{" "}
          <strong>5–8 dias úteis</strong>
        </div>
        <Link href="/" className="success-btn">
          Continuar Comprando
        </Link>
      </div>
    </div>
  );
}
