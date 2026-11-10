import { business } from "../data/business";
import { formatPrice } from "./format";

export function buildWhatsAppUrl({ cart, customer, orderType, address, reference, notes, total }) {
  const phone = (business.whatsappNumber || "").replace(/\D/g, "");
  if (!phone) return null;

  const lines = [
    `¡Hola! Quiero realizar un pedido en ${business.name}.`,
    "",
    "MI PEDIDO:",
    ...cart.map((item) => `${item.quantity} x ${item.name} — ${formatPrice(item.price * item.quantity)}`),
    "",
    `Total: ${formatPrice(total)}`,
    `Modalidad: ${orderType === "delivery" ? "Delivery" : "Retiro en el local"}`,
    `Nombre: ${customer || "No indicado"}`,
  ];

  if (orderType === "delivery") {
    lines.push(`Dirección: ${address || "Pendiente"}`);
    if (reference) lines.push(`Referencia: ${reference}`);
  }
  if (notes) lines.push(`Observaciones: ${notes}`);

  lines.push("", "Por favor, confirmen disponibilidad, costo de envío y total final. ¡Gracias!");
  return `https://wa.me/${phone}?text=${encodeURIComponent(lines.join("\n"))}`;
}