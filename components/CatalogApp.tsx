"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Features from "@/components/Features";
import { saveCheckoutCart } from "@/lib/cart-storage";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { filterProducts, groupProducts } from "@/lib/catalog-utils";
import { products } from "@/lib/products";
import type { AddButtonState, CartItem, CartState } from "@/lib/types";

const SEARCH_DEBOUNCE_MS = 280;
const INITIAL_LOAD_MS = 1000;
const ADD_ANIMATION_MS = 700;
const ADDED_RESET_MS = 2000;
const TOAST_DURATION_MS = 2500;

export default function CatalogApp() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartState>({});
  const [buttonStates, setButtonStates] = useState<Record<number, AddButtonState>>(
    {},
  );
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [badgePop, setBadgePop] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  const addingRef = useRef<Set<number>>(new Set());
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const buttonResetTimers = useRef<Map<number, ReturnType<typeof setTimeout>>>(
    new Map(),
  );

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), INITIAL_LOAD_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchInput.trim().toLowerCase());
    }, SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      buttonResetTimers.current.forEach((t) => clearTimeout(t));
    };
  }, []);

  const filtered = useMemo(
    () => filterProducts(activeCategory, searchQuery),
    [activeCategory, searchQuery],
  );

  const groups = useMemo(
    () => groupProducts(filtered, activeCategory, searchQuery),
    [filtered, activeCategory, searchQuery],
  );

  const cartItems = useMemo(() => Object.values(cart), [cart]);
  const cartTotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.qty, 0),
    [cartItems],
  );
  const cartValue = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cartItems],
  );

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    setToastVisible(true);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => {
      setToastVisible(false);
    }, TOAST_DURATION_MS);
  }, []);

  const updateCartBadge = useCallback(() => {
    setBadgePop(false);
    requestAnimationFrame(() => setBadgePop(true));
  }, []);

  const addToCart = useCallback(
    (id: number) => {
      if (addingRef.current.has(id)) return;

      const product = products.find((p) => p.id === id);
      if (!product) return;

      addingRef.current.add(id);
      setButtonStates((prev) => ({ ...prev, [id]: "loading" }));

      setTimeout(() => {
        setButtonStates((prev) => ({ ...prev, [id]: "added" }));
        setCart((prev) => {
          const existing = prev[id];
          if (existing) {
            return { ...prev, [id]: { ...existing, qty: existing.qty + 1 } };
          }
          return { ...prev, [id]: { ...product, qty: 1 } as CartItem };
        });
        updateCartBadge();
        showToast(`${product.name} adicionado ao carrinho ✓`);

        const resetTimer = setTimeout(() => {
          setButtonStates((prev) => {
            const next = { ...prev };
            delete next[id];
            return next;
          });
          addingRef.current.delete(id);
          buttonResetTimers.current.delete(id);
        }, ADDED_RESET_MS);

        buttonResetTimers.current.set(id, resetTimer);
      }, ADD_ANIMATION_MS);
    },
    [showToast, updateCartBadge],
  );

  const updateQty = useCallback(
    (id: number, action: "plus" | "minus") => {
      setCart((prev) => {
        const item = prev[id];
        if (!item) return prev;

        if (action === "plus") {
          return { ...prev, [id]: { ...item, qty: item.qty + 1 } };
        }

        const nextQty = item.qty - 1;
        if (nextQty <= 0) {
          const next = { ...prev };
          delete next[id];
          return next;
        }
        return { ...prev, [id]: { ...item, qty: nextQty } };
      });
      updateCartBadge();
    },
    [updateCartBadge],
  );

  const handleSearchClear = () => {
    setSearchInput("");
    setSearchQuery("");
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    saveCheckoutCart(cartItems, cartValue);
    setIsCartOpen(false);
    router.push("/checkout");
  };

  return (
    <>
      <Header
        cartTotal={cartTotal}
        badgePop={badgePop}
        searchValue={searchInput}
        activeCategory={activeCategory}
        onSearchChange={setSearchInput}
        onSearchClear={handleSearchClear}
        onCategoryChange={setActiveCategory}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <Hero
        isLoading={isLoading}
        groups={groups}
        isEmpty={filtered.length === 0}
        buttonStates={buttonStates}
        onAddToCart={addToCart}
      />

      <Features
        isOpen={isCartOpen}
        items={cartItems}
        total={cartValue}
        onClose={() => setIsCartOpen(false)}
        onUpdateQty={updateQty}
        onCheckout={handleCheckout}
      />

      <Footer message={toastMessage} visible={toastVisible} />
    </>
  );
}
