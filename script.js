const dishes = {
  chicken: [
    {id:'ch1',name:'Шашлык из курицы',description:'Нежное филе, маринованное в фирменных специях',weight:'250 г',price:490,image:'images/chicken.jpg'},
    {id:'ch2',name:'Крылышки BBQ',description:'Сочные крылышки в дымном соусе барбекю',weight:'300 г',price:420,image:'images/chicken.jpg'},
    {id:'ch3',name:'Цыплёнок на углях',description:'Половинка цыплёнка с овощами и соусом',weight:'500 г',price:690,image:'images/chicken.jpg'},
    {id:'ch4',name:'Куриное филе',description:'Филе на гриле с зеленью и лавашом',weight:'250 г',price:440,image:'images/chicken.jpg'}
  ],
  pizza: [
    {id:'p1',name:'Павлония',description:'Курица, грибы, моцарелла и фирменный соус',weight:'550 г',price:590,image:'images/pizza.jpg'},
    {id:'p2',name:'Маргарита',description:'Томаты, моцарелла, базилик и оливковое масло',weight:'450 г',price:450,image:'images/pizza.jpg'},
    {id:'p3',name:'Пепперони',description:'Пикантная пепперони, сыр и томатный соус',weight:'500 г',price:550,image:'images/pizza.jpg'},
    {id:'p4',name:'Четыре сыра',description:'Моцарелла, дорблю, пармезан и чеддер',weight:'480 г',price:620,image:'images/pizza.jpg'}
  ],
  sushi: [
    {id:'s1',name:'Филадельфия',description:'Лосось, сливочный сыр, огурец и авокадо',weight:'280 г',price:690,image:'images/sushi.jpg'},
    {id:'s2',name:'Калифорния',description:'Краб, авокадо, огурец и икра масаго',weight:'240 г',price:590,image:'images/sushi.jpg'},
    {id:'s3',name:'Темпура',description:'Креветка, сыр и хрустящая темпура',weight:'260 г',price:640,image:'images/sushi.jpg'},
    {id:'s4',name:'Сет Павлония',description:'Три любимых ролла для большой компании',weight:'720 г',price:1390,image:'images/sushi.jpg'}
  ],
  shawarma: [
    {id:'sh1',name:'Шаурма классическая',description:'Курица, овощи, зелень и фирменный соус',weight:'350 г',price:290,image:'images/shawarma.jpg'},
    {id:'sh2',name:'Шаурма сырная',description:'Курица, сыр, картофель и сливочный соус',weight:'380 г',price:330,image:'images/shawarma.jpg'},
    {id:'sh3',name:'Шаурма на тарелке',description:'Мясо на углях, овощи, картофель и лаваш',weight:'450 г',price:450,image:'images/shawarma.jpg'},
    {id:'sh4',name:'Детская шаурма',description:'Нежная курочка, сыр и овощи без острого',weight:'220 г',price:230,image:'images/shawarma.jpg'}
  ]
};
const allDishes = Object.values(dishes).flat();
let cart = JSON.parse(localStorage.getItem('pavlonia-cart') || '[]');
const menuGrid = document.querySelector('#menuGrid');
const cartDrawer = document.querySelector('#cartDrawer');
const backdrop = document.querySelector('#drawerBackdrop');
const money = value => `${value.toLocaleString('ru-RU')} ₽`;
function renderMenu(category = 'chicken') {
  menuGrid.innerHTML = dishes[category].map(dish => `<article class="dish-card"><img class="dish-image" src="${dish.image}" alt="${dish.name}" loading="lazy"><div class="dish-info"><h3>${dish.name}</h3><p>${dish.description}</p><div class="dish-meta"><span>${dish.weight}</span><strong class="dish-price">${money(dish.price)}</strong><button class="add-button" data-add="${dish.id}">В корзину</button></div></div></article>`).join('');
}
function saveCart() { localStorage.setItem('pavlonia-cart', JSON.stringify(cart)); }
function getCartItems() { return cart.map(item => ({...item, dish: allDishes.find(dish => dish.id === item.id)})).filter(item => item.dish); }
function renderCart() {
  const items = getCartItems();
  const totalCount = items.reduce((sum,item) => sum + item.qty, 0);
  const total = items.reduce((sum,item) => sum + item.qty * item.dish.price, 0);
  document.querySelector('#cartCount').textContent = totalCount;
  document.querySelector('#footerCartCount').textContent = totalCount;
  document.querySelector('#drawerCount').textContent = totalCount;
  document.querySelector('#cartTotal').textContent = money(total);
  document.querySelector('#cartEmpty').style.display = items.length ? 'none' : 'block';
  document.querySelector('#checkout').style.display = items.length ? 'block' : 'none';
  document.querySelector('#cartItems').innerHTML = items.map(item => `<div class="cart-row"><img src="${item.dish.image}" alt="${item.dish.name}"><div><h3>${item.dish.name}</h3><small>${money(item.dish.price)} · ${item.dish.weight}</small><div class="qty-control"><button data-decrease="${item.id}" aria-label="Уменьшить">−</button><b>${item.qty}</b><button data-increase="${item.id}" aria-label="Увеличить">+</button><button class="remove-item" data-remove="${item.id}">Удалить</button></div></div><strong class="row-price">${money(item.dish.price * item.qty)}</strong></div>`).join('');
}
function openCart() { cartDrawer.classList.add('open'); backdrop.classList.add('open'); cartDrawer.setAttribute('aria-hidden','false'); }
function closeCart() { cartDrawer.classList.remove('open'); backdrop.classList.remove('open'); cartDrawer.setAttribute('aria-hidden','true'); }
function addToCart(id) { const existing = cart.find(item => item.id === id); if(existing) existing.qty += 1; else cart.push({id,qty:1}); saveCart(); renderCart(); openCart(); }
renderMenu(); renderCart();
document.addEventListener('click', event => {
  const target = event.target;
  const category = target.closest('[data-category]');
  if(category) { document.querySelectorAll('[data-category]').forEach(button => button.classList.remove('active')); category.classList.add('active'); renderMenu(category.dataset.category); }
  const add = target.closest('[data-add]'); if(add) addToCart(add.dataset.add);
  const increase = target.closest('[data-increase]'); if(increase) { const item = cart.find(row => row.id === increase.dataset.increase); item.qty += 1; saveCart(); renderCart(); }
  const decrease = target.closest('[data-decrease]'); if(decrease) { const item = cart.find(row => row.id === decrease.dataset.decrease); item.qty -= 1; cart = cart.filter(row => row.qty > 0); saveCart(); renderCart(); }
  const remove = target.closest('[data-remove]'); if(remove) { cart = cart.filter(row => row.id !== remove.dataset.remove); saveCart(); renderCart(); }
});
document.querySelector('#cartTrigger').addEventListener('click', openCart); document.querySelector('#footerCart').addEventListener('click', openCart); document.querySelector('#closeCart').addEventListener('click', closeCart); backdrop.addEventListener('click', closeCart);
document.querySelector('#menuToggle').addEventListener('click', () => document.querySelector('.main-nav').classList.toggle('mobile-open'));
document.querySelectorAll('.order-method button').forEach(button => button.addEventListener('click', () => { document.querySelectorAll('.order-method button').forEach(item => item.classList.remove('selected')); button.classList.add('selected'); document.querySelectorAll('.delivery-field').forEach(field => field.style.display = button.dataset.method === 'delivery' ? 'block' : 'none'); }));
const modal = document.querySelector('#successModal');
document.querySelector('#orderForm').addEventListener('submit', event => { event.preventDefault(); cart = []; saveCart(); renderCart(); closeCart(); modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); });
function closeModal() { modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); }
document.querySelector('#closeModal').addEventListener('click', closeModal); document.querySelector('#continueButton').addEventListener('click', closeModal); modal.addEventListener('click', event => { if(event.target === modal) closeModal(); });
