document.addEventListener('DOMContentLoaded', () => {
  const loginView = document.getElementById('login-view');
  const adminView = document.getElementById('admin-view');
  const loginForm = document.getElementById('login-form');
  const logoutBtn = document.getElementById('logout-btn');
  const sidebarButtons = document.querySelectorAll('.admin-sidebar button');
  const productForm = document.getElementById('product-form');
  const cancelEditBtn = document.getElementById('product-cancel-btn');

  showDashboard();

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showDashboard();
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      alert('Logged out successfully!');
    });
  }

  sidebarButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      sidebarButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const tabProducts = document.getElementById('tab-products');
      const tabOrders = document.getElementById('tab-orders');

      if (tabProducts) tabProducts.classList.add('hidden');
      if (tabOrders) tabOrders.classList.add('hidden');

      const activeSection = document.getElementById(`tab-${targetTab}`);
      if (activeSection) activeSection.classList.remove('hidden');

      if (targetTab === 'orders') {
        loadOrders();
      }
    });
  });

  if (productForm) {
    productForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('product-id').value;
      const productData = {
        id: id || Date.now().toString(),
        name: document.getElementById('p-name').value.trim(),
        price: parseFloat(document.getElementById('p-price').value) || 0,
        unit: document.getElementById('p-unit').value.trim() || 'unit',
        category: document.getElementById('p-category').value.trim() || 'other',
        icon: document.getElementById('p-icon').value || 'tomato',
        stock: parseInt(document.getElementById('p-stock').value) || 0,
        description: document.getElementById('p-description').value.trim()
      };

      if (!id) {
        globalProducts.unshift(productData);
      } else {
        const idx = globalProducts.findIndex(p => (p.id || p._id) == id);
        if (idx !== -1) globalProducts[idx] = productData;
      }

      localStorage.setItem('custom_products', JSON.stringify(globalProducts));
      renderProductsTable();
      resetProductForm();
      alert(id ? 'Updated product successfully!' : 'Added product successfully!');
    });
  }

  if (cancelEditBtn) {
    cancelEditBtn.addEventListener('click', resetProductForm);
  }

  function showDashboard() {
    if (loginView) loginView.classList.add('hidden');
    if (adminView) adminView.classList.remove('hidden');
    if (logoutBtn) logoutBtn.classList.remove('hidden');
    loadProducts();
    loadOrders();
  }
});

let defaultProducts = [
  { id: '1', name: 'Fresh Tomatoes', category: 'vegetable', price: 5.36, unit: 'basket', stock: 42, icon: 'tomato' },
  { id: '2', name: 'Raw Wildflower Honey', category: 'pantry', price: 9.78, unit: 'jar', stock: 30, icon: 'honey' },
  { id: '3', name: 'Broccoli Florets', category: 'vegetable', price: 3.48, unit: 'head', stock: 55, icon: 'broccoli' },
  { id: '4', name: 'Mixed Roasted Nuts', category: 'pantry', price: 6.28, unit: 'bag', stock: 60, icon: 'nuts' },
  { id: '5', name: 'Organic Avocado', category: 'vegetable', price: 2.15, unit: 'each', stock: 80, icon: 'avocado' },
  { id: '6', name: 'Baby Spinach', category: 'vegetable', price: 3.10, unit: 'bunch', stock: 38, icon: 'spinach' },
  { id: '7', name: 'Fresh Apple', category: 'other', price: 3.50, unit: 'kg', stock: 20, icon: 'apple' }
];

let globalProducts = [];

function loadProducts() {
  const savedProducts = localStorage.getItem('custom_products');
  if (savedProducts) {
    try { globalProducts = JSON.parse(savedProducts); } catch (e) { globalProducts = defaultProducts; }
  } else {
    globalProducts = defaultProducts;
    localStorage.setItem('custom_products', JSON.stringify(globalProducts));
  }
  renderProductsTable();
}

function renderProductsTable() {
  const tbody = document.getElementById('product-table-body');
  if (!tbody) return;

  if (globalProducts.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:20px; color:#777;">No products available.</td></tr>`;
    return;
  }

  tbody.innerHTML = globalProducts.map(p => {
    const pId = p.id || p._id;
    return `
      <tr>
        <td><strong>${p.name || ''}</strong></td>
        <td>${p.category || 'other'}</td>
        <td>$${Number(p.price || 0).toFixed(2)} / ${p.unit || 'unit'}</td>
        <td>${p.stock || 0}</td>
        <td>
          <button onclick="editProduct('${pId}')" style="color: #2b5329; cursor:pointer; border:none; background:none; font-weight:600; margin-right:12px;">Edit</button>
          <button onclick="deleteProduct('${pId}')" style="color: #d9534f; cursor:pointer; border:none; background:none; font-weight:600;">Delete</button>
        </td>
      </tr>
    `;
  }).join('');
}

function editProduct(id) {
  const product = globalProducts.find(p => (p.id || p._id) == id);
  if (!product) return;

  document.getElementById('product-id').value = product.id || product._id || '';
  document.getElementById('p-name').value = product.name || '';
  document.getElementById('p-price').value = product.price || '';
  document.getElementById('p-unit').value = product.unit || '';
  document.getElementById('p-category').value = product.category || '';
  document.getElementById('p-icon').value = product.icon || 'tomato';
  document.getElementById('p-stock').value = product.stock || 0;
  document.getElementById('p-description').value = product.description || '';

  const submitBtn = document.getElementById('product-submit-btn');
  const cancelBtn = document.getElementById('product-cancel-btn');

  if (submitBtn) submitBtn.textContent = 'Update Product';
  if (cancelBtn) cancelBtn.classList.remove('hidden');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetProductForm() {
  const form = document.getElementById('product-form');
  const productIdInput = document.getElementById('product-id');
  const submitBtn = document.getElementById('product-submit-btn');
  const cancelBtn = document.getElementById('product-cancel-btn');

  if (productIdInput) productIdInput.value = '';
  if (form) form.reset();
  if (submitBtn) submitBtn.textContent = 'Add Product';
  if (cancelBtn) cancelBtn.classList.add('hidden');
}

function deleteProduct(id) {
  if (!confirm('Are you sure you want to delete this product?')) return;
  globalProducts = globalProducts.filter(p => (p.id || p._id) != id);
  localStorage.setItem('custom_products', JSON.stringify(globalProducts));
  renderProductsTable();
  alert('Product deleted successfully!');
}

// ================= ORDERS SECTION (គ្មាន FAKE DATA ដាច់ខាត) =================
let globalOrders = [];

function loadOrders() {
  const localOrders = localStorage.getItem('custom_orders');
  if (localOrders) {
    try {
      globalOrders = JSON.parse(localOrders);
    } catch (e) {
      globalOrders = [];
    }
  } else {
    globalOrders = [];
  }
  renderOrdersTable(globalOrders);
}

function renderOrdersTable(orders) {
  const tbody = document.getElementById('order-table-body');
  if (!tbody) return;

  if (!orders || orders.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:20px; color:#777;">No orders placed yet.</td></tr>`;
    return;
  }

  tbody.innerHTML = orders.map(order => {
    const orderId = order.id || order._id || 'N/A';
    const customer = order.fullName || order.customer_name || order.name || 'Customer';
    const email = order.email || '';
    
    let itemsCount = 1;
    if (Array.isArray(order.items)) {
      itemsCount = order.items.reduce((sum, item) => sum + (item.qty || item.quantity || 1), 0);
    } else if (Array.isArray(order.cartItems)) {
      itemsCount = order.cartItems.length;
    }

    const total = Number(order.totalAmount || order.total || 0).toFixed(2);
    const status = order.status || 'Pending';

    return `
      <tr>
        <td><strong>${orderId}</strong></td>
        <td>
          <strong>${customer}</strong>
          ${email ? `<br><small style="color:#666;">${email}</small>` : ''}
        </td>
        <td>${itemsCount} item(s)</td>
        <td><strong>$${total}</strong></td>
        <td><span class="badge ${status.toLowerCase()}">${status}</span></td>
        <td>
          <select onchange="changeOrderStatus('${orderId}', this.value)" style="padding:4px; border-radius:4px;">
            <option value="Pending" ${status === 'Pending' ? 'selected' : ''}>Pending</option>
            <option value="Completed" ${status === 'Completed' ? 'selected' : ''}>Completed</option>
            <option value="Cancelled" ${status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
          </select>
        </td>
      </tr>
    `;
  }).join('');
}

function changeOrderStatus(orderId, newStatus) {
  const order = globalOrders.find(o => (o.id || o._id) == orderId);
  if (order) {
    order.status = newStatus;
    localStorage.setItem('custom_orders', JSON.stringify(globalOrders));
  }
  renderOrdersTable(globalOrders);
  alert('Order status updated!');
}