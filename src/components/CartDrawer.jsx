import { useMemo, useState } from "react";
import { Minus, Plus, Trash2, X, MessageCircle, ShoppingBag } from "lucide-react";
import { business } from "../data/business";
import { formatPrice } from "../utils/format";
import { buildWhatsAppUrl } from "../utils/whatsapp";

export default function CartDrawer({ open, onClose, cart, setCart }) {
  const [customer, setCustomer] = useState("");
  const [orderType, setOrderType] = useState("delivery");
  const [address, setAddress] = useState("");
  const [reference, setReference] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const total = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);
  const updateQty = (id, delta) => setCart((items) => items.map((item) => item.id === id ? {...item, quantity: item.quantity + delta} : item).filter((item) => item.quantity > 0));
  const remove = (id) => setCart((items) => items.filter((item) => item.id !== id));

  const sendOrder = () => {
    if (!cart.length) return setError("Agrega al menos un producto.");
    if (!customer.trim()) return setError("Escribe tu nombre.");
    if (orderType === "delivery" && !address.trim()) return setError("Escribe la dirección de entrega.");
    const url = buildWhatsAppUrl({ cart, customer, orderType, address, reference, notes, total });
    if (!url) return setError("El WhatsApp del negocio todavía no está configurado. Contacta al establecimiento.");
    window.open(url, "_blank", "noopener,noreferrer");
    setError("");
  };

  if (!open) return null;
  return (
    <div className="drawer-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <aside className="cart-drawer" aria-label="Tu pedido">
        <div className="drawer-head"><div><span className="eyebrow">TU SELECCIÓN</span><h2>Mi pedido</h2></div><button className="icon-button" onClick={onClose} aria-label="Cerrar"><X/></button></div>
        <div className="cart-items">
          {!cart.length && <div className="empty-cart"><ShoppingBag size={36}/><h3>Tu carrito está vacío</h3><p>Agrega algo rico del menú para comenzar.</p></div>}
          {cart.map((item) => <div className="cart-line" key={item.id}>
            <img src={item.image} alt="" />
            <div className="cart-line-main"><strong>{item.name}</strong><small>{formatPrice(item.price)} c/u</small><div className="quantity-control"><button onClick={() => updateQty(item.id,-1)} aria-label="Restar"><Minus size={14}/></button><b>{item.quantity}</b><button onClick={() => updateQty(item.id,1)} aria-label="Sumar"><Plus size={14}/></button></div></div>
            <div className="cart-line-end"><b>{formatPrice(item.price * item.quantity)}</b><button className="remove-button" onClick={() => remove(item.id)} aria-label="Eliminar"><Trash2 size={15}/></button></div>
          </div>)}
        </div>
        <div className="checkout">
          <div className="total-row"><span>Subtotal estimado</span><strong>{formatPrice(total)}</strong></div>
          <p className="checkout-note">El negocio confirmará disponibilidad, envío y total final.</p>
          <label>Tu nombre<input value={customer} onChange={(e)=>setCustomer(e.target.value)} placeholder="¿Cómo te llamas?"/></label>
          <label>¿Cómo deseas recibirlo?
            <select value={orderType} onChange={(e)=>setOrderType(e.target.value)}>
              {business.deliveryAvailable && <option value="delivery">Delivery</option>}
              {business.pickupAvailable && <option value="pickup">Retirar en el local</option>}
            </select>
          </label>
          {orderType === "delivery" && <><label>Dirección de entrega<input value={address} onChange={(e)=>setAddress(e.target.value)} placeholder="Calle, sector y casa"/></label><label>Referencia (opcional)<input value={reference} onChange={(e)=>setReference(e.target.value)} placeholder="Punto de referencia"/></label></>}
          <label>Observaciones (opcional)<textarea value={notes} onChange={(e)=>setNotes(e.target.value)} placeholder="Indicaciones para tu pedido..." rows="2"/></label>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="button button-primary send-order" onClick={sendOrder}><MessageCircle size={18}/> Enviar pedido por WhatsApp</button>
        </div>
      </aside>
    </div>
  );
}