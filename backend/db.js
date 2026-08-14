// Tiny file-based JSON "database". Good enough for a small shop demo -
// no native build steps, no external DB server required.
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'data.json');

const SEED = {
  products: [
    {
      id: 'p1',
      name: 'Fresh Tomatoes',
      category: 'vegetable',
      icon: 'tomato',
      price: 5.36,
      unit: 'basket',
      description: 'Vine-ripened, sun-sweet tomatoes picked at their peak.',
      stock: 42
    },
    {
      id: 'p2',
      name: 'Raw Wildflower Honey',
      category: 'pantry',
      icon: 'honey',
      price: 9.78,
      unit: 'jar',
      description: 'Unfiltered honey straight from small local apiaries.',
      stock: 30
    },
    {
      id: 'p3',
      name: 'Broccoli Florets',
      category: 'vegetable',
      icon: 'broccoli',
      price: 3.48,
      unit: 'head',
      description: 'Crisp, deep-green broccoli, hand trimmed.',
      stock: 55
    },
    {
      id: 'p4',
      name: 'Mixed Roasted Nuts',
      category: 'pantry',
      icon: 'nuts',
      price: 6.28,
      unit: 'bag',
      description: 'A hearty mix of almonds, cashews and hazelnuts.',
      stock: 60
    },
    {
      id: 'p5',
      name: 'Organic Avocado',
      category: 'vegetable',
      icon: 'avocado',
      price: 2.15,
      unit: 'each',
      description: 'Creamy, buttery avocados, ready to eat in 2-3 days.',
      stock: 80
    },
    {
      id: 'p6',
      name: 'Baby Spinach',
      category: 'vegetable',
      icon: 'spinach',
      price: 3.10,
      unit: 'bunch',
      description: 'Tender baby spinach leaves, triple washed.',
      stock: 38
    }
  ],
  orders: []
};

function ensureDb() {
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify(SEED, null, 2));
  }
}

function readDb() {
  ensureDb();
  const raw = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(raw);
}

function writeDb(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

module.exports = { readDb, writeDb };
