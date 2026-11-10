import { useMemo, useState } from "react";
import { Search, ShoppingBag, Flame, MapPin, CreditCard } from "lucide-react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductCard from "./components/ProductCard";
import CartDrawer from "./components/CartDrawer";
import Footer from "./components/Footer";
import menu from "./data/menu.json";
import { business } from "./data/business";

const categories = ["Todos", ...new Set(menu.map((item) => item.category))];

export default function App() {
  const [category, setCategory] = useState("Todos");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const filtered = useMemo(() => menu.filter((item) => {
    const categoryMatch = category === "Todos" || item.category === category;
    const query = search.trim().toLocaleLowerCase("es");
    const searchMatch = !query || `${item.name} ${item.description} ${item.category}`.toLocaleLowerCase("es").includes(query);
    return categoryMatch && searchMatch;
  }), [category, search]);

  const addToCart = (product) => {
    setCart((items) => {
      const found = items.find((item) => item.id === product.id);
      return found ? items.map((item) => item.id === product.id ? {...item, quantity: item.quantity + 1} : item) : [...items, {...product, quantity: 1}];
    });
  };
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <Header cartCount={cartCount} onCartClick={() => setCartOpen(true)} />
      <main>
        <Hero />
        <section className="menu-section" id="menu">
          <div className="section-heading">
            <div><span className="eyebrow"><Flame size={15}/> PREPARADO PARA TI</span><h2>Explora nuestro <em>menú</em></h2><p>Encuentra tu favorito y agrégalo a tu pedido.</p></div>
            <div className="search-box"><Search size={18}/><input aria-label="Buscar en el menú" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Buscar algo rico..."/></div>
          </div>
          <div className="category-list" role="tablist" aria-label="Categorías del menú">
            {categories.map((item) => <button key={item} role="tab" aria-selected={category === item} className={category === item ? "category-chip active" : "category-chip"} onClick={()=>setCategory(item)}>{item}</button>)}
          </div>
          {filtered.length ? <div className="product-grid">{filtered.map((product)=><ProductCard key={product.id} product={product} onAdd={addToCart}/>)}</div> : <div className="no-results">No encontramos productos con esa búsqueda.</div>}
        </section>
        <section className="info-band">
          <div><MapPin/><span><b>Estamos en</b><small>{business.address}</small></span></div>
          <div><CreditCard/><span><b>Formas de pago</b><small>{business.paymentMethods.length ? business.paymentMethods.join(" · ") : "Consulta los métodos disponibles al confirmar tu pedido."}</small></span></div>
          <div><ShoppingBag/><span><b>Como prefieras</b><small>Delivery o retiro en el local.</small></span></div>
        </section>
      </main>
      <Footer />
      <button className="floating-cart" onClick={()=>setCartOpen(true)} aria-label="Abrir carrito"><ShoppingBag/><span>Mi pedido</span><b>{cartCount}</b></button>
      <CartDrawer open={cartOpen} onClose={()=>setCartOpen(false)} cart={cart} setCart={setCart}/>
    </>
  );
}