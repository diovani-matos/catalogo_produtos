"use client";

import CheckoutHeader from "@/components/checkout/CheckoutHeader";
import DeliveryPanel from "@/components/checkout/DeliveryPanel";
import OrderSummary from "@/components/checkout/OrderSummary";
import PaymentPanel from "@/components/checkout/PaymentPanel";
import SuccessOverlay from "@/components/checkout/SuccessOverlay";
import {
  clearCheckoutCart,
  loadCheckoutCart,
  type CheckoutSnapshot,
} from "@/lib/cart-storage";
import {
  detectCardFlag,
  formatDueDate,
  generateBoletoCode,
  generatePixCode,
  getFrete,
  getGrandTotal,
  getInstallmentOptions,
  getSubtotal,
  getSuccessMessages,
  validateCardFields,
  type CardFieldErrors,
  type PaymentMethod,
} from "@/lib/checkout-utils";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const PROCESSING_MS = 1800;

export default function CheckoutClient() {
  const router = useRouter();
  const [snapshot, setSnapshot] = useState<CheckoutSnapshot | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [method, setMethod] = useState<PaymentMethod>("card");
  const [discount, setDiscount] = useState(0);
  const [couponInput, setCouponInput] = useState("");
  const [couponStatus, setCouponStatus] = useState<"idle" | "success" | "error">(
    "idle",
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMethod, setSuccessMethod] = useState<PaymentMethod>("card");
  const [orderNumber, setOrderNumber] = useState("");

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardFlag, setCardFlag] = useState("💳");
  const [selectedInstallment, setSelectedInstallment] = useState(1);
  const [cardErrors, setCardErrors] = useState<CardFieldErrors>({});

  useEffect(() => {
    setSnapshot(loadCheckoutCart());
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady && !snapshot && !showSuccess) {
      router.replace("/");
    }
  }, [isReady, snapshot, showSuccess, router]);

  const subtotal = useMemo(
    () => (snapshot ? getSubtotal(snapshot.items) : 0),
    [snapshot],
  );
  const frete = useMemo(() => getFrete(subtotal), [subtotal]);
  const grandTotal = useMemo(
    () => getGrandTotal(subtotal, discount),
    [subtotal, discount],
  );
  const installments = useMemo(
    () => getInstallmentOptions(grandTotal),
    [grandTotal],
  );
  const dueDate = useMemo(
    () => (snapshot ? formatDueDate(3) : ""),
    [snapshot],
  );
  const boletoCode = useMemo(
    () => (snapshot ? generateBoletoCode(grandTotal) : ""),
    [snapshot, grandTotal],
  );
  const pixCode = useMemo(
    () => (snapshot ? generatePixCode(grandTotal) : ""),
    [snapshot, grandTotal],
  );

  const [successTitle, successSub] = getSuccessMessages(successMethod);

  const handleCardNumberChange = (value: string) => {
    setCardNumber(value);
    setCardFlag(detectCardFlag(value.replace(/\s/g, "")));
  };

  const handleApplyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (code === "TERRA10") {
      setDiscount(subtotal * 0.1);
      setCouponStatus("success");
    } else {
      setCouponStatus("error");
      setTimeout(() => setCouponStatus("idle"), 1500);
    }
  };

  const handleSubmit = () => {
    if (method === "card") {
      const errors = validateCardFields(
        cardNumber,
        cardName,
        cardExpiry,
        cardCvv,
      );
      setCardErrors(errors);
      if (Object.keys(errors).length > 0) return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setSuccessMethod(method);
      setOrderNumber(String(Math.floor(10000 + Math.random() * 90000)));
      setShowSuccess(true);
      clearCheckoutCart();
      localStorage.removeItem("catalog-cart");
    }, PROCESSING_MS);
  };

  if (!isReady) {
    return (
      <div className="checkout-loading">
        <p>Carregando...</p>
      </div>
    );
  }

  if (!snapshot) {
    return (
      <div className="checkout-loading">
        <p>Redirecionando...</p>
      </div>
    );
  }

  return (
    <>
      <CheckoutHeader showConfirmationStep={showSuccess} />

      <div className="checkout-wrap">
        <div className="checkout-col-left">
          <DeliveryPanel />
          <PaymentPanel
            method={method}
            onMethodChange={setMethod}
            grandTotal={grandTotal}
            dueDate={dueDate}
            boletoCode={boletoCode}
            pixCode={pixCode}
            cardNumber={cardNumber}
            cardName={cardName}
            cardExpiry={cardExpiry}
            cardCvv={cardCvv}
            cardFlag={cardFlag}
            installments={installments}
            selectedInstallment={selectedInstallment}
            cardErrors={cardErrors}
            onCardNumberChange={handleCardNumberChange}
            onCardNameChange={setCardName}
            onCardExpiryChange={setCardExpiry}
            onCardCvvChange={setCardCvv}
            onInstallmentChange={setSelectedInstallment}
          />
        </div>

        <OrderSummary
          items={snapshot.items}
          subtotal={subtotal}
          frete={frete}
          discount={discount}
          grandTotal={grandTotal}
          couponInput={couponInput}
          couponStatus={couponStatus}
          method={method}
          isProcessing={isProcessing}
          onCouponChange={(v) => {
            setCouponInput(v);
            if (couponStatus !== "idle") setCouponStatus("idle");
          }}
          onApplyCoupon={handleApplyCoupon}
          onSubmit={handleSubmit}
        />
      </div>

      <SuccessOverlay
        visible={showSuccess}
        title={successTitle}
        subtitle={successSub}
        orderNumber={orderNumber}
      />
    </>
  );
}
