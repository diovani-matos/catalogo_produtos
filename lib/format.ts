/** Formatação BRL determinística (evita diferença servidor vs navegador na hidratação). */
export function formatCurrency(value: number): string {
  const [intPart, decPart = "00"] = value.toFixed(2).split(".");
  const withThousands = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `R$\u00a0${withThousands},${decPart}`;
}
