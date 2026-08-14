document.addEventListener('DOMContentLoaded', async () => {
  await renderCart();
});

async function renderCart() {
  const container = document.getElementById('cart-content');
  if (!container) return;

  const cartItems = typeof CartStore !== 'undefined' ? CartStore.getItems() : [];

  if (!cartItems || cartItems.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding: 40px 0;">
        <p style="font-size: 1.2rem; margin-bottom: 20px;">Your cart is currently empty.</p>
        <a href="index.html#products" class="btn btn-primary">Continue Shopping</a>
      </div>
    `;
    return;
  }

  container.innerHTML = `<p style="text-align:center;">Loading your cart...</p>`;

  try {
    const allProducts = await Api.getProducts();

    let total = 0;
    const rows = cartItems.map((item) => {
      const product = allProducts.find(p => p.id === item.productId || p._id === item.productId);
      if (!product) return '';

      const itemTotal = product.price * item.qty;
      total += itemTotal;
      const pId = product.id || product._id;

      return `
        <tr>
          <td><strong>${product.name}</strong></td>
          <td>$${Number(product.price).toFixed(2)}</td>
          <td>
            <input type="number" min="1" value="${item.qty}" 
                   style="width:60px; padding:4px; text-align:center;"
                   onchange="updateQuantity('${pId}', this.value)">
          </td>
          <td>$${itemTotal.toFixed(2)}</td>
          <td>
            <button class="btn btn-outline" style="padding:4px 8px;" 
                    onclick="handleRemove('${pId}')">Remove</button>
          </td>
        </tr>
      `;
    }).join('');

    container.innerHTML = `
      <table class="admin-table" style="margin-bottom:24px;">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>

      <div style="text-align:right; margin-bottom:32px;">
        <h3>Total Amount: <span style="color:#2e7d32;">$${total.toFixed(2)}</span></h3>
      </div>

      <form class="form-card" id="checkout-form" onsubmit="handleCheckout(event, ${total})" style="max-width:500px; margin:0 auto;">
        <h3 style="margin-bottom:16px;">Shipping Details</h3>
        
        <div class="field">
          <label for="cust-name">Full Name</label>
          <input id="cust-name" required placeholder="THOU REAKSA">
        </div>

        <div class="field">
          <label for="cust-email">Email Address</label>
          <input id="cust-email" type="email" required placeholder="thoureaksa17@gmail.com">
        </div>

        <div class="field">
          <label for="cust-address">Delivery Address</label>
          <input id="cust-address" required placeholder="Street 372">
        </div>

        <div class="field">
          <label for="cust-phone">Phone Number</label>
          <input id="cust-phone" required placeholder="093334176">
        </div>

        <button class="btn btn-primary" type="submit" style="width:100%; margin-top:12px;">Place Order</button>
      </form>
    `;
  } catch (err) {
    container.innerHTML = `<p style="color:red; text-align:center;">Failed to load cart items: ${err.message}</p>`;
  }
}

function updateQuantity(productId, newQty) {
  if (typeof CartStore !== 'undefined') {
    CartStore.setQty(productId, parseInt(newQty, 10));
  }
  renderCart();
}

function handleRemove(productId) {
  if (typeof CartStore !== 'undefined') {
    CartStore.removeItem(productId);
  }
  renderCart();
}

async function handleCheckout(event, total) {
  event.preventDefault();

  const cartItems = typeof CartStore !== 'undefined' ? CartStore.getItems() : [];

  const nameVal = document.getElementById('cust-name').value.trim();
  const emailVal = document.getElementById('cust-email').value.trim();
  const addressVal = document.getElementById('cust-address').value.trim();
  const phoneVal = document.getElementById('cust-phone').value.trim();

  const orderData = {
    customer_name: nameVal,
    email: emailVal,
    address: addressVal,
    phone: phoneVal,
    items: cartItems,
    total: total
  };

  try {
    await Api.placeOrder(orderData);
    alert('Thank you! Your order has been placed successfully.');
    if (typeof CartStore !== 'undefined') {
      CartStore.clear();
    }
    window.location.href = 'index.html';
  } catch (err) {
    alert('Error placing order: ' + err.message);
  }
}
