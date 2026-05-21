import { categories, products } from "./products";
import type { Product, ProductBadge } from "./types";

export function getBadgeClass(badge: ProductBadge): string {
  if (badge === "Novo") return "badge-new";
  if (badge === "Oferta") return "badge-sale";
  return "badge-last";
}

export function filterProducts(
  activeCategory: string,
  searchQuery: string,
): Product[] {
  const query = searchQuery.trim().toLowerCase();

  return products.filter((p) => {
    const matchCat = activeCategory === "Todos" || p.cat === activeCategory;
    const matchQ =
      !query ||
      p.name.toLowerCase().includes(query) ||
      p.cat.toLowerCase().includes(query) ||
      p.desc.toLowerCase().includes(query);
    return matchCat && matchQ;
  });
}

export function groupProducts(
  filtered: Product[],
  activeCategory: string,
  searchQuery: string,
): { title: string; items: Product[] }[] {
  if (activeCategory === "Todos" && !searchQuery.trim()) {
    return categories.slice(1).map((cat) => ({
      title: cat,
      items: products.filter((p) => p.cat === cat),
    }));
  }

  return [{ title: "Resultados", items: filtered }];
}
