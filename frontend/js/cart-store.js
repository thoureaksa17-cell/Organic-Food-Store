// Cart is kept in localStorage as [{ productId, qty }, ...]
// so it survives reloads without needing user accounts.
const CART_KEY = 'organic_shop_cart';

const CartStore = {
  getItems() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch (e) {
      return [];
    }
  },

  saveItems(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    CartStore.refreshCount();
  },

  addItem(productId, qty = 1) {
    const items = CartStore.getItems();
    const existing = items.find((i) => i.productId === productId);
    if (existing) {
      existing.qty += qty;
    } else {
      items.push({ productId, qty });
    }
    CartStore.saveItems(items);
  },

  setQty(productId, qty) {
    let items = CartStore.getItems();
    if (qty <= 0) {
      items = items.filter((i) => i.productId !== productId);
    } else {
      const existing = items.find((i) => i.productId === productId);
      if (existing) existing.qty = qty;
    }
    CartStore.saveItems(items);
  },

  removeItem(productId) {
    const items = CartStore.getItems().filter((i) => i.productId !== productId);
    CartStore.saveItems(items);
  },

  clear() {
    CartStore.saveItems([]);
  },

  totalCount() {
    return CartStore.getItems().reduce((sum, i) => sum + i.qty, 0);
  },

  refreshCount() {
    document.querySelectorAll('[data-cart-count]').forEach((el) => {
      el.textContent = CartStore.totalCount();
    });
  }
};

document.addEventListener('DOMContentLoaded', CartStore.refreshCount);
