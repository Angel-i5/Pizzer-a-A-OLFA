import { MapPin, Clock3, Instagram, Facebook } from "lucide-react";
import { business } from "../data/business";

export default function Footer() {
  return (
    <footer id="contacto" className="footer">
      <div className="footer-main">
        <div><a className="brand footer-brand" href="#inicio"><span className="brand-mark">🍕</span><span><strong>ÑA OLFA</strong><small>PIZZERÍA & MÁS</small></span></a><p>Un menú para disfrutar y compartir.</p></div>
        <div className="footer-details" id="nosotros">
          <span><MapPin size={17}/>{business.address}</span>
          <span><Clock3 size={17}/>{business.schedule}</span>
          {business.paymentMethods.length > 0 && <div className="payment-list"><b>Métodos de pago</b><p>{business.paymentMethods.join(" · ")}</p></div>}
          <div className="social-links">
            {business.instagramUrl && <a href={business.instagramUrl} target="_blank" rel="noreferrer"><Instagram size={18}/> Instagram</a>}
            {business.facebookUrl && <a href={business.facebookUrl} target="_blank" rel="noreferrer"><Facebook size={18}/> Facebook</a>}
          </div>
        </div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} {business.name}</span><span>Menú digital · Pedidos por WhatsApp</span></div>
    </footer>
  );
}