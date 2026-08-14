function productCard(product) {
  return `
    <div class="product-card">
      <div class="product-media">${getIcon(product.icon)}</div>
      <div class="product-body">
        <h3>${escapeHtml(product.name)}</h3>
        <div class="product-meta">
          <div>
            <div class="price">$${product.price.toFixed(2)}</div>
            <div class="unit">per ${escapeHtml(product.unit)}</div>
          </div>
          <button class="add-btn" data-add="${product.id}" aria-label="Add ${escapeHtml(product.name)} to cart">+</button>
        </div>
      </div>
    </div>
  `;
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 1800);
}

async function loadProducts() {
  const grid = document.getElementById('product-grid');
  if (!grid) return;

  try {
    const products = await Api.getProducts();
    grid.innerHTML = products.map(productCard).join('');

    grid.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-add]');
      if (!btn) return;
      CartStore.addItem(btn.dataset.add, 1);
      showToast('Added to cart');
    });
  } catch (err) {
    grid.innerHTML = `<p>Couldn't load products right now. Is the backend server running?</p>`;
  }
}

document.addEventListener('DOMContentLoaded', loadProducts);
