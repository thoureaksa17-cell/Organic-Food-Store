const express = require('express');
const router = express.Router();

// ករណីគ្មាន Database យើងប្រើ In-Memory Array ដើម្បីរក្សាទុក Order បណ្ដោះអាសន្ន
// (ឬទាញចេញពី global.orders ប្រសិនបើមានស្រាប់)
if (!global.orders) {
  global.orders = [];
}

// ==========================================
// 1. POST /api/orders (បង្កើត Order ថ្មី)
// ==========================================
router.post('/', (req, res) => {
  try {
    const { 
      customer_name, 
      name, 
      customerName, 
      email, 
      address, 
      phone, 
      items, 
      total 
    } = req.body;

    // ទទួលយកឈ្មោះអតិថិជនពី field ណាមួយដែលមានផ្ញើមក
    const finalName = customer_name || name || customerName;

    // ពិនិត្យ Validation៖ ប្រសិនបើខ្វះ field ចាំបាច់ណាមួយ
    if (!finalName || !email || !address) {
      return res.status(400).json({ 
        error: "Customer name, email and address are required." 
      });
    }

    // បង្កើត Object Order ថ្មី
    const newOrder = {
      id: 'ORD-' + Date.now(),
      customer_name: finalName,
      email: email.trim(),
      address: address.trim(),
      phone: phone ? phone.trim() : '',
      items: items || [],
      total: total || 0,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    // រក្សាទុក Order ចូលក្នុង Array
    global.orders.push(newOrder);

    console.log('✅ New Order Created:', newOrder);

    return res.status(201).json({
      message: 'Order placed successfully!',
      order: newOrder
    });
  } catch (err) {
    console.error('❌ Error processing order:', err);
    return res.status(500).json({ error: 'Internal server error while placing order.' });
  }
});

// ==========================================
// 2. GET /api/orders (ទាញយក Order ទាំងអស់សម្រាប់ Admin)
// ==========================================
router.get('/', (req, res) => {
  res.json(global.orders);
});

// ==========================================
// 3. PUT /api/orders/:id/status (កែប្រែ Status សម្រាប់ Admin)
// ==========================================
router.put('/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const order = global.orders.find(o => o.id === id);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  order.status = status || order.status;
  res.json({ message: 'Order status updated', order });
});

module.exports = router;
