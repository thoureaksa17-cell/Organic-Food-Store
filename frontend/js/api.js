const API_BASE_URL = 'http://localhost:4000/api';

const Api = {
  // ១. ទាញយក Products
  async getProducts() {
    const localData = localStorage.getItem('custom_products');
    if (localData) {
      try { return JSON.parse(localData); } catch (e) {}
    }
    return [
      { id: '1', name: 'Fresh Tomatoes', category: 'vegetable', price: 5.36, unit: 'basket', stock: 42, icon: 'tomato' },
      { id: '2', name: 'Raw Wildflower Honey', category: 'pantry', price: 9.78, unit: 'jar', stock: 30, icon: 'honey' },
      { id: '3', name: 'Broccoli Florets', category: 'vegetable', price: 3.48, unit: 'head', stock: 55, icon: 'broccoli' },
      { id: '4', name: 'Mixed Roasted Nuts', category: 'pantry', price: 6.28, unit: 'bag', stock: 60, icon: 'nuts' },
      { id: '5', name: 'Organic Avocado', category: 'vegetable', price: 2.15, unit: 'each', stock: 80, icon: 'avocado' },
      { id: '6', name: 'Baby Spinach', category: 'vegetable', price: 3.10, unit: 'bunch', stock: 38, icon: 'spinach' },
      { id: '7', name: 'Fresh Apple', category: 'other', price: 3.50, unit: 'kg', stock: 20, icon: 'apple' }
    ];
  },

  // ២. រក្សាទុក Order ថ្មីភ្លាមៗចូល localStorage (រក្សាទុកពិតៗ គ្មាន Fake)
  async placeOrder(orderData) {
    const existingOrders = JSON.parse(localStorage.getItem('custom_orders') || '[]');
    
    const newOrder = {
      id: 'ORD-' + Math.floor(1000 + Math.random() * 9000),
      fullName: orderData.fullName || orderData.customer_name || orderData.name || 'Customer',
      email: orderData.email || '',
      items: orderData.items || orderData.cartItems || [],
      totalAmount: orderData.totalAmount || orderData.total || 0,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    existingOrders.unshift(newOrder); // បញ្ចូល order ថ្មីទៅដើមគេ
    localStorage.setItem('custom_orders', JSON.stringify(existingOrders));
    return { success: true, order: newOrder };
  }
};
