const express = require('express');
const { nanoid } = require('nanoid');
const { readDb, writeDb } = require('../db');
const { requireAdmin } = require('../middleware/auth');

const router = express.Router();

// GET /api/products - list all products (public)
router.get('/', (req, res) => {
  const db = readDb();
  res.json(db.products);
});

// GET /api/products/:id - single product (public)
router.get('/:id', (req, res) => {
  const db = readDb();
  const product = db.products.find((p) => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found.' });
  res.json(product);
});

// POST /api/products - create product (admin only)
router.post('/', requireAdmin, (req, res) => {
  const { name, category, icon, price, unit, description, stock } = req.body;

  if (!name || price === undefined) {
    return res.status(400).json({ error: 'name and price are required.' });
  }

  const db = readDb();
  const product = {
    id: nanoid(8),
    name,
    category: category || 'other',
    icon: icon || 'leaf',
    price: Number(price),
    unit: unit || 'each',
    description: description || '',
    stock: stock !== undefined ? Number(stock) : 0
  };

  db.products.push(product);
  writeDb(db);
  res.status(201).json(product);
});

// PUT /api/products/:id - update product (admin only)
router.put('/:id', requireAdmin, (req, res) => {
  const db = readDb();
  const idx = db.products.findIndex((p) => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Product not found.' });

  const allowed = ['name', 'category', 'icon', 'price', 'unit', 'description', 'stock'];
  for (const key of allowed) {
    if (req.body[key] !== undefined) {
      db.products[idx][key] = key === 'price' || key === 'stock'
        ? Number(req.body[key])
        : req.body[key];
    }
  }

  writeDb(db);
  res.json(db.products[idx]);
});

// DELETE /api/products/:id - delete product (admin only)
router.delete('/:id', requireAdmin, (req, res) => {
  const db = readDb();
  const idx = db.products.findIndex((p) => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Product not found.' });

  const [removed] = db.products.splice(idx, 1);
  writeDb(db);
  res.json({ deleted: removed });
});

module.exports = router;
