function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

async function renderSummary() {
  const summaryEl = document.getElementById('checkout-summary');
  const items = CartStore.getItems();

  if (items.length === 0) {
    document.getElementById('checkout-content').innerHTML = `
      <div class="empty-state">
        <p>Your cart is empty, so there's nothing to check out yet.</p>
        <a class="btn btn-primary" href="index.html#products">Browse Products</a>
      </div>`;
    return null;
  }

  const products = await Api.getProducts();
  let total = 0;
  const rows = items.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    if (!product) return '';
    const lineTotal = product.price * item.qty;
    total += lineTotal;
    return `<div class="summary-row"><span>${escapeHtml(product.name)} &times; ${item.qty}</span><span>$${lineTotal.toFixed(2)}</span></div>`;
  }).join('');

  summaryEl.innerHTML = `${rows}<div class="summary-row total"><span>Total</span><span>$${total.toFixed(2)}</span></div>`;
  return items;
}

async function handleSubmit(e) {
  e.preventDefault();
  const errorEl = document.getElementById('checkout-error');
  errorEl.classList.add('hidden');

  const items = CartStore.getItems();
  const form = e.target;
  const order = {
    items: items.map((i) => ({ productId: i.productId, qty: i.qty })),
    customer: {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      address: form.address.value.trim()
    }
  };

  try {
    const created = await Api.placeOrder(order);
    CartStore.clear();
    document.getElementById('checkout-content').innerHTML = `
      <div class="empty-state">
        <h2 style="font-family: var(--display-font); color: var(--forest-900);">Order placed!</h2>
        <p>Thanks, ${escapeHtml(created.customer.name)}. Your order <strong>#${created.id}</strong> for
        $${created.total.toFixed(2)} has been received.</p>
        <a class="btn btn-primary" href="index.html">Continue Shopping</a>
      </div>`;
  } catch (err) {
    errorEl.textContent = err.message;
    errorEl.classList.remove('hidden');
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const items = await renderSummary();
  const form = document.getElementById('checkout-form');
  if (items && form) {
    form.addEventListener('submit', handleSubmit);
  }
});
