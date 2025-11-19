const express = require('express');
const path = require('path');
const products = require('./products.json');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Products API
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Temporary checkout endpoint
app.post('/api/checkout', (req, res) => {
  const { cart } = req.body;
  console.log('Checkout request:', cart);
  res.json({ ok: true });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
