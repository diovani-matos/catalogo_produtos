"use client";

type FooterProps = {
  message: string;
  visible: boolean;
};

export default function Footer({ message, visible }: FooterProps) {
  return (
    <div
      className={`toast${visible ? " show" : ""}`}
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  );
}
