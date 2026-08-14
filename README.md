# Organic — Healthy Organic Food Shop

A full online food shop built to match the "Healthy Organic Food" design:
green/cream palette, serif headline, product grid, promo banners, dark footer.

- **Frontend:** plain HTML / CSS / JavaScript (no build step, no framework)
- **Backend:** Node.js + Express, with a small JSON file as the database (no
  external database server to install)
- **Admin panel:** login-protected page to add, edit and delete products, and
  to view and update customer orders

## Project structure

```
organic-shop/
  backend/
    server.js          # Express app: serves the API and the frontend
    db.js               # tiny JSON-file "database" (backend/data.json)
    middleware/auth.js   # JWT check for admin-only routes
    routes/
      products.js        # GET/POST/PUT/DELETE /api/products
      orders.js           # POST/GET /api/orders
      admin.js             # POST /api/admin/login
    package.json
  frontend/
    index.html      # homepage: hero + product grid + promo banners
    cart.html         # shopping cart (uses browser localStorage)
    checkout.html       # customer details + places the order
    admin.html            # admin login + product/order management
    css/style.css
    js/
      icons.js       # inline SVG produce icons (no external images needed)
      api.js           # fetch() wrapper for the backend API
      cart-store.js      # localStorage cart logic + header cart badge
      main.js               # homepage product grid
      cart.js                 # cart page logic
      checkout.js               # checkout form + order submission
      admin.js                    # admin login, product CRUD, order list
```

## Running it

You need [Node.js](https://nodejs.org) 18+ installed.

```bash
cd backend
npm install
npm start
```

Then open **http://localhost:4000** in your browser. The same server serves
both the website and the `/api/...` endpoints, so there's nothing else to run.

The first time it starts, `backend/data.json` is created automatically with
6 seed products (tomatoes, honey, broccoli, nuts, avocado, spinach). Delete
that file at any time to reset back to the seed data.

## Using the site

- **Shop:** browse products on the homepage, click **+** to add to cart.
- **Cart:** `cart.html` — adjust quantities or remove items.
- **Checkout:** `checkout.html` — enter name/email/address and place the
  order. This is a demo checkout: no real payment is processed.
- **Admin:** `admin.html`
  - Username: `admin`
  - Password: `organic123`
  - Add / edit / delete products (changes appear on the shop immediately).
  - View orders and advance their status
    (received → preparing → out for delivery → delivered).

## Changing the admin password

By default the password is `organic123` (hashed in `routes/admin.js`). To use
your own, set two environment variables before starting the server:

```bash
ADMIN_USER=youradmin \
ADMIN_PASSWORD_HASH=$(node -e "console.log(require('bcryptjs').hashSync('yourpassword',10))") \
npm start
```

You should also set a real `JWT_SECRET` environment variable in production
(a random 32+ character string).

## Notes on the design

- The layout follows the reference mockup: sticky header with nav, big
  serif "Healthy Organic Food" hero with a CTA, a 4-column "Our Products"
  grid, two promo banner cards (Organic Vegetables / Natural & Healthy),
  and a dark-green footer with About/Quick Links/Follow Us columns.
- Product photography in the mockup is replaced with lightweight inline
  SVG icons (tomato, honey jar, broccoli, nuts, avocado, spinach) so the
  site has no external image dependencies and loads instantly. You can
  swap these for real photos later by editing `frontend/js/icons.js` or
  the `product-media` elements.
- The whole frontend is framework-free plain HTML/CSS/JS as requested, and
  talks to the backend only through the documented `/api/...` endpoints.
