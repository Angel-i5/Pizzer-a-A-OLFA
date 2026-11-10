# Pizzería ÑA OLFA — Menú digital

Sitio web estático creado con React + Vite para que los clientes consulten el menú desde un teléfono, agreguen productos a un carrito y envíen el pedido al WhatsApp del negocio. También está preparado para publicar la URL y generar códigos QR para las mesas.

> **Estado:** MVP funcional de frontend. Antes de publicar, completa y verifica los datos comerciales indicados en `src/data/business.js`.

## 1. Funcionalidades

- Diseño responsive, priorizando teléfonos.
- Menú organizado por categorías.
- Fotografía individual por producto (imágenes remotas de referencia).
- Búsqueda de productos.
- Carrito con cantidades y eliminación de productos.
- Subtotal y total calculados automáticamente.
- Selección de delivery o retiro en el local.
- Para delivery solicita dirección y referencia.
- Nombre y observaciones del pedido.
- Generación de mensaje estructurado y apertura de WhatsApp.
- Métodos de pago informativos, configurables sin publicar datos bancarios.
- Datos del negocio centralizados en un único archivo.
- SEO básico, metadatos sociales, `robots.txt` y `sitemap.xml` de ejemplo.
- Sin base de datos, backend, cuentas de usuario ni panel administrativo.

## 2. Requisitos

- Node.js 20 o superior recomendado.
- npm.
- Visual Studio Code (opcional).
- Conexión a Internet para descargar dependencias y mostrar las fotografías remotas.

## 3. Instalación local

Abre una terminal dentro de la carpeta del proyecto y ejecuta:

```bash
npm install
npm run dev
```

Vite mostrará una dirección local, normalmente `http://localhost:5173`. Ábrela en el navegador.

Para comprobar la versión de producción:

```bash
npm run build
npm run preview
```

El resultado compilado se genera en `dist/`.

## 4. Configuración obligatoria antes de publicar

### Datos del negocio

Edita `src/data/business.js`:

```js
export const business = {
  name: "Pizzería ÑA OLFA",
  whatsappNumber: "", // Solo dígitos con código de país. Ej.: 584121234567
  address: "Espino, calle Urdaneta",
  city: "Espino",
  schedule: "Consultar horario",
  instagramUrl: "",
  facebookUrl: "",
  currency: "USD",
  locale: "es-VE",
  paymentMethods: []
};
```

- `whatsappNumber`: **déjalo vacío hasta que el propietario confirme el número**. Usa formato internacional, solo dígitos, sin `+`, espacios ni guiones. Ejemplo ficticio: `584121234567`.
- `address`: confirma la dirección exacta con el negocio.
- `schedule`: sustituye por el horario real.
- `paymentMethods`: agrega únicamente los métodos que el local confirme. Ejemplo: `["Efectivo", "Pago móvil", "Punto de venta"]`. No agregues números de cuenta ni datos bancarios.
- Redes sociales: usa URLs completas y reales. Si no existen, déjalas vacías.

Si el número no está configurado, la web mostrará un aviso y no intentará enviar el pedido.

### Productos, precios y fotos

Edita `src/data/menu.json`. Cada producto tiene:

- `id`: identificador único.
- `name`: nombre visible.
- `category`: categoría.
- `description`: descripción.
- `price`: precio numérico en USD.
- `image`: URL de fotografía.
- `featured`: si se muestra en destacados.

Los precios incluidos son **provisionales de demostración**. Verifica y reemplaza todos los importes antes de publicar.

Las imágenes son fotografías profesionales remotas de referencia desde Unsplash. Necesitan conexión a Internet y pueden cambiarse por fotografías propias o archivos locales. Para usar una imagen local, guarda el archivo en `public/images/` y coloca una ruta como `/images/pizza-margarita.jpg` en `menu.json`. Comprueba que tienes derecho a utilizar las imágenes que publiques.

## 5. Flujo de pedido

1. El cliente entra desde el enlace web o escanea el QR.
2. Selecciona productos y cantidades.
3. Abre el carrito y completa nombre, modalidad y observaciones.
4. Si elige delivery, escribe dirección y referencia.
5. La web construye un mensaje con productos, cantidades y total.
6. Se abre WhatsApp con el mensaje preparado.
7. **El cliente debe pulsar Enviar dentro de WhatsApp.** La web no envía mensajes silenciosamente ni confirma que el negocio haya aceptado el pedido.

No se almacenan pedidos en un servidor. El contenido del pedido se transfiere a WhatsApp mediante un enlace `wa.me`.

## 6. Códigos QR para las mesas

El QR debe apuntar a la URL pública definitiva, por ejemplo:

`https://tu-proyecto.vercel.app`

Una vez desplegada la web:

1. Copia la URL HTTPS definitiva.
2. Genera un QR estático con esa URL.
3. Descarga el QR en SVG o PNG de alta resolución.
4. Imprime y prueba el QR con varios teléfonos antes de colocar los soportes en las mesas.

El QR no contiene el menú ni los precios: solo contiene la URL. Por eso seguirá funcionando aunque actualices `menu.json`, siempre que conserves el mismo dominio y ruta.

## 7. Publicación gratuita en Vercel

### Opción A — Desde GitHub

1. Crea un repositorio en GitHub.
2. Sube todo el contenido del proyecto.
3. Entra en Vercel y selecciona **Add New → Project**.
4. Importa el repositorio.
5. Vercel detectará Vite. Verifica:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Pulsa Deploy.
7. Prueba la URL HTTPS que Vercel asigne.

### Opción B — Vercel CLI

```bash
npm install -g vercel
vercel
```

Sigue las instrucciones de la CLI. Para desplegar a producción:

```bash
vercel --prod
```

## 8. SEO y presencia en Google

Antes de publicar:

- Reemplaza el dominio de ejemplo en `public/sitemap.xml`.
- Actualiza `public/robots.txt` si cambias la ruta del sitemap.
- Confirma nombre, dirección y teléfono.
- Crea o reclama el Perfil de Empresa en Google y completa sus datos reales.
- Añade el enlace del menú al Perfil de Empresa y a las redes sociales.
- Registra el dominio en Google Search Console y envía el sitemap.

La indexación no es inmediata ni está garantizada. El SEO técnico ayuda a que los buscadores entiendan la página, pero no garantiza aparecer en una posición concreta.

## 9. Estructura del proyecto

```text
pizzeria-na-olfa/
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── CartDrawer.jsx
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── ProductCard.jsx
│   │   └── Footer.jsx
│   ├── data/
│   │   ├── business.js
│   │   └── menu.json
│   ├── utils/
│   │   ├── format.js
│   │   └── whatsapp.js
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 10. Seguridad, privacidad y límites

- No hay panel administrativo ni autenticación.
- No se publican datos bancarios ni números de pago.
- El número de WhatsApp del negocio será visible públicamente en el enlace de pedidos una vez configurado; utiliza un número comercial autorizado.
- No se guardan nombres, teléfonos, direcciones ni pedidos en una base de datos.
- El cliente decide enviar el mensaje desde WhatsApp.
- El importe mostrado es una referencia calculada en el navegador. El negocio debe confirmar disponibilidad, precio final, delivery y condiciones antes de preparar el pedido.
- No introduzcas claves, contraseñas ni credenciales en archivos del frontend.

## 11. Lista de verificación previa al lanzamiento

- [ ] Confirmar escritura del nombre comercial.
- [ ] Confirmar WhatsApp con código de país.
- [ ] Confirmar dirección y ubicación.
- [ ] Confirmar horario.
- [ ] Confirmar métodos de pago aceptados.
- [ ] Verificar todos los precios.
- [ ] Revisar nombres, ingredientes y descripciones.
- [ ] Revisar que cada imagen represente el producto correcto.
- [ ] Probar carrito, cantidades, total y observaciones.
- [ ] Probar pedido de delivery y retiro.
- [ ] Enviar un pedido de prueba al WhatsApp autorizado.
- [ ] Probar la web en Android, iPhone y escritorio.
- [ ] Publicar y comprobar el enlace HTTPS.
- [ ] Generar, imprimir y probar los códigos QR.
- [ ] Actualizar sitemap y Perfil de Empresa de Google.

---

**Mantenimiento:** para cambiar productos, precios, descripciones o imágenes, edita `src/data/menu.json`. Para cambiar datos comerciales, edita `src/data/business.js`. Después ejecuta `npm run build` y vuelve a desplegar en Vercel.
