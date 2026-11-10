import { ArrowDown, Clock3, MapPin } from "lucide-react";
import { business } from "../data/business";

export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero-copy">
        <span className="eyebrow"><span className="eyebrow-dot" /> SABOR PARA COMPARTIR</span>
        <h1>Tu antojo<br />tiene <em>dirección.</em></h1>
        <p>Pizzas, hamburguesas, parrillas y mucho más. Explora nuestro menú y pide fácilmente.</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#menu">Explorar menú <ArrowDown size={17} /></a>
          <a className="button button-quiet" href="#contacto">Cómo llegar</a>
        </div>
        <div className="hero-meta">
          <span><MapPin size={16}/>{business.address}</span>
          <span><Clock3 size={16}/>{business.schedule}</span>
        </div>
      </div>
      <div className="hero-visual">
        <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=90" alt="Pizza recién horneada" />
        <div className="hero-sticker"><span>HECHO PARA</span><strong>DISFRUTAR</strong><small>🍕 BUEN SABOR</small></div>
      </div>
    </section>
  );
}