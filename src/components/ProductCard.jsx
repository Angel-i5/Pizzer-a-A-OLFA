import { Plus } from "lucide-react";
import { formatPrice } from "../utils/format";

export default function ProductCard({ product, onAdd }) {
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img src={product.image} alt={product.name} loading="lazy" onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80"; }} />
        {product.featured && <span className="product-tag">Favorito</span>}
      </div>
      <div className="product-info">
        <div><h3>{product.name}</h3><p>{product.description}</p></div>
        <div className="product-bottom">
          <strong>{formatPrice(product.price)}</strong>
          <button className="add-button" onClick={() => onAdd(product)} aria-label={`Agregar ${product.name}`}><Plus size={19}/></button>
        </div>
      </div>
    </article>
  );
}