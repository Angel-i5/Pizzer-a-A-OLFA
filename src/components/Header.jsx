import { ShoppingBag, UtensilsCrossed } from "lucide-react";
import { business } from "../data/business";

export default function Header({ cartCount, onCartClick }) {
  return (
    <header className="site-header">
      <a className="brand" href="#inicio" aria-label={`${business.name}, inicio`}>
        <span className="brand-mark"><UtensilsCrossed size={21} /></span>
        <span><strong>ÑA OLFA</strong><small>PIZZERÍA & MÁS</small></span>
      </a>
      <nav className="desktop-nav">
        <a href="#menu">Menú</a><a href="#nosotros">Nosotros</a><a href="#contacto">Contacto</a>
      </nav>
      <button className="cart-trigger" onClick={onCartClick} aria-label="Abrir carrito">
        <ShoppingBag size={19} /><span>Mi pedido</span><b>{cartCount}</b>
      </button>
    </header>
  );
}