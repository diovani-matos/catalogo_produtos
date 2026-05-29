export type ProductBadge = "Novo" | "Oferta" | "Último";

export type Product = {
  id: number;
  name: string;
  cat: string;
  desc: string;
  price: number;
  original?: number;
  emoji: string;
  image: string;
  imagePosition?: string;
  badge?: ProductBadge;
  inStock: boolean;
};

export type CartItem = Product & { qty: number };

export type CartState = Record<number, CartItem>;

export type AddButtonState = "idle" | "loading" | "added";
