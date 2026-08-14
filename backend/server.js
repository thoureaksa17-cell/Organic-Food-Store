const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

// ==========================================
// 1. MIDDLEWARES (អាន JSON ពី Frontend)
// ==========================================
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// ==========================================
// 2. SERVE FRONTEND STATIC FILES
// ថែម '..' ដើម្បីឱ្យ Node.js ចេញពី Folder backend ទៅអាន frontend នៅខាងក្រៅ
// ==========================================
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// ==========================================
// 3. API ROUTES
// ==========================================
try {
  const adminRoutes = require('./routes/admin');
  const orderRoutes = require('./routes/orders');
  const productRoutes = require('./routes/products');

  // ប្រសិនបើ Routes ក្នុង Folder routes/ សរសេរទម្រង់ /api/...
  app.use('/api/admin', adminRoutes);
  app.use('/api/orders', orderRoutes);
  app.use('/api/products', productRoutes);
} catch (err) {
  console.log('⚠️ Warning loading route files:', err.message);
}

// ==========================================
// 4. FALLBACK ROUTE (បើក Frontend Index)
// ==========================================
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

// ==========================================
// 5. START SERVER
// ==========================================
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});