const productListEl = document.getElementById('product-list');
const cartToggle = document.getElementById('cart-toggle');
const cartCount = document.getElementById('cart-count');
const cartEl = document.getElementById('cart');
const cartItemsEl = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout');

let products = [];
let cart = JSON.parse(localStorage.getItem('cart') || '[]');

function saveCart(){
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

function addToCart(productId){
  const item = cart.find(i => i.id === productId);
  if(item) item.qty++;
  else{
    const p = products.find(p => p.id === productId);
    cart.push({ id: p.id, name: p.name, price: p.price, qty: 1 });
  }
  saveCart();
}

function removeFromCart(productId){
  cart = cart.filter(i => i.id !== productId);
  saveCart();
}

function renderProducts(){
  productListEl.innerHTML = '';
  products.forEach(p =>{
    const card = document.createElement('article');
    card.className = 'product';
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>Inna</p>
      <p class="price">€${p.price.toFixed(2)}</p>
      <button data-id="${p.id}" class="add">Add to cart</button>
    `;
    productListEl.appendChild(card);
  });
  productListEl.querySelectorAll('.add').forEach(btn => {
    btn.addEventListener('click', e => addToCart(Number(e.currentTarget.dataset.id)));
  });
}

function renderCart(){
  cartItemsEl.innerHTML = '';
  let total = 0;
  let count = 0;
  cart.forEach(i =>{
    total += i.price * i.qty;
    count += i.qty;
    const li = document.createElement('li');
    li.innerHTML = `${i.name} × ${i.qty} — €${(i.price * i.qty).toFixed(2)} 
      <button data-id="${i.id}" class="remove">Remove</button>`;
    cartItemsEl.appendChild(li);
  });
  cartItemsEl.querySelectorAll('.remove').forEach(btn =>
    btn.addEventListener('click', e => removeFromCart(Number(e.currentTarget.dataset.id)))
  );
  cartTotalEl.textContent = total.toFixed(2);
  cartCount.textContent = String(count);
}

cartToggle.addEventListener('click', () => cartEl.classList.toggle('hidden'));

checkoutBtn.addEventListener('click', async () => {
  const resp = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cart })
  });
  const data = await resp.json();
  if(data.ok){
    cart = [];
    saveCart();
    alert('Checkout simulated! (Stripe integration comes later)');
  }
});

async function init(){
  products = await fetch('/api/products').then(r => r.json());
  renderProducts();
  renderCart();
}

init();
