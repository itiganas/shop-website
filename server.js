const express = require('express');
const path = require('path');
const products = require('./products.json');


const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


// API endpoint to fetch products
app.get('/api/products', (req, res) => {
res.json(products);
});


// Simple placeholder checkout endpoint (we'll replace with Stripe later)
app.post('/api/checkout', (req, res) => {
const { cart } = req.body;
console.log('Checkout request:', cart);
// For now just respond OK — no payment processing yet
res.json({ ok: true });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));