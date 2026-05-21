"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";

type PixPanelProps = {
  pixCode: string;
  active: boolean;
};

const PIX_STEPS: { num: number; content: React.ReactNode }[] = [
  {
    num: 1,
    content: (
      <>
        Abra o app do seu banco e vá em <strong>Pix</strong>
      </>
    ),
  },
  {
    num: 2,
    content: (
      <>
        Escolha <strong>Pagar com QR Code</strong> ou{" "}
        <strong>Copia e Cola</strong>
      </>
    ),
  },
  {
    num: 3,
    content: <>Confirme o pagamento — aprovação em segundos</>,
  },
];

export default function PixPanel({ pixCode, active }: PixPanelProps) {
  const qrRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [timer, setTimer] = useState("30:00");

  useEffect(() => {
    if (!active || !qrRef.current || !pixCode) return;

    qrRef.current.innerHTML = "";
    QRCode.toCanvas(pixCode, {
      width: 160,
      margin: 1,
      color: { dark: "#2c4620", light: "#ffffff" },
    }).then((canvas) => {
      if (qrRef.current) {
        qrRef.current.appendChild(canvas);
      }
    });
  }, [active, pixCode]);

  useEffect(() => {
    if (!active) return;
    let secs = 1800;
    const id = setInterval(() => {
      secs -= 1;
      if (secs < 0) secs = 1800;
      const m = String(Math.floor(secs / 60)).padStart(2, "0");
      const s = String(secs % 60).padStart(2, "0");
      setTimer(`${m}:${s}`);
    }, 1000);
    return () => clearInterval(id);
  }, [active]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pixCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="tab-content active">
      <div className="pix-box">
        <div className="pix-logo" aria-hidden="true">
          ⚡
        </div>
        <div className="pix-title">Pague com Pix</div>
        <p className="pix-subtitle">
          Aprovação instantânea. Use o QR Code
          <br />
          ou copie a chave Pix.
        </p>

        <div className="qr-wrap">
          <div ref={qrRef} />
        </div>

        <div className="pix-code-box">
          <div className="pix-code">{pixCode}</div>
          <button type="button" className="pix-copy-btn" onClick={handleCopy}>
            {copied ? "✓ Copiado!" : "Copiar"}
          </button>
        </div>

        <div className="pix-steps">
          {PIX_STEPS.map((step) => (
            <div key={step.num} className="pix-step">
              <div className="pix-step-num">{step.num}</div>
              <span>{step.content}</span>
            </div>
          ))}
        </div>

        <div className="pix-timer">
          <span style={{ fontSize: 13, color: "var(--stone-600)" }}>
            ⏱ Chave expira em
          </span>
          <span className="pix-timer-val">{timer}</span>
        </div>
      </div>
    </div>
  );
}
