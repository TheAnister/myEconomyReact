// Optional: helper functions (for example, formatCurrency if needed)
export function formatCurrency(n) {
  if (n >= 1e6) return `£${(n / 1e6).toFixed(2)}mln`;
  if (n >= 1e3) return `£${(n / 1e3).toFixed(2)}k`;
  return `£${n.toFixed(2)}`;
}
