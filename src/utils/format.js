import { business } from "../data/business";

export function formatPrice(value) {
  return new Intl.NumberFormat(business.locale, {
    style: "currency",
    currency: business.currency,
    maximumFractionDigits: 2,
  }).format(value);
}