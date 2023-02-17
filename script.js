let products;
const cart = [];
const favorites = [];
let checkoutPrice = 0;

fetch('./products.json')
  .then(d => d.json())
  .then(data => {
    products = data;
    renderProductList(data);
  });

const productContainer = document.getElementById('productContainer');
const cartButton = document.getElementById('displayCart');
const overlay = document.querySelector('.overlay');
const cartCloseButton = document.getElementById('cartCloseBtn');

cartCloseButton.addEventListener('click', () => {
  overlay.classList.add('hidden');
});

const renderCartItemsQuantity = () => {
  const cartItemQuantity = document.querySelector('.nav-cart-quantity-icon');
  cartItemQuantity.classList.add('item-added');

  setTimeout(() => {
    cartItemQuantity.classList.remove('item-added');
  }, 400);
  let totalItemsInCart = 0;
  cart.forEach(v => (totalItemsInCart += v.quantity));
  cartItemQuantity.innerHTML = totalItemsInCart;
};

cartButton.addEventListener('click', () => {
  overlay.classList.remove('hidden');
  renderCart();
});

const incrementItem = id => {
  const itemInCart = cart.find(item => item.id === id);
  if (!itemInCart) {
    cart.push({
      id,
      quantity: 1,
    });
  } else {
    itemInCart.quantity += 1;
  }
  renderCartItemsQuantity();
  console.log(cart);
};

const decrementItem = id => {
  const itemInCart = cart.find(item => item.id === id);
  if (!itemInCart) {
    cart.push({
      id,
      quantity: 1,
    });
  } else {
    itemInCart.quantity -= 1;
  }

  renderCartItemsQuantity();
  console.log(cart);
};

const renderCart = () => {
  const cartContent = document.querySelector('.cart-content');
  cartContent.innerHTML = '';

  if (!cart.length) {
    const emptyCartMarkup = `
    <div class="empty-cart-container">
      <div class="empty-cart-image">
        <img src="./src/images/empty-cart.png" alt="empty cart" />
      </div>
      <p class="empty-cart-title">your cart is empty</p>
    </div>`;

    cartContent.insertAdjacentHTML('afterbegin', emptyCartMarkup);
  } else {
    const cartItemsMarkup = cart.map(c => {
      const { id, title, image, price, oldPrice } = products.find(
        p => p.id === c.id
      );

      checkoutPrice += price * c.quantity;

      return `
    <li>
      <div class="cart-item">
        <div class="cart-item-image-container">
          <img src="./src/images/${image}" alt="product image" />
        </div>
        <div class="cart-item-details">
          <div>
            <p class="product-title">${title}</p>
            <p class="product-category">gifts</p>
          </div>
          <div class="flex-container">
            <p class="current-price">₹${price}</p>
            <p class="old-price">₹${oldPrice}</p>
          </div>
          <div class="flex-container">
            <button
              type="button"
              id="decreaseQuantity${id}"
              class="cart-quantity-btn"
              data-item-id="${id}"
            >
              <svg class="icon">
                <use href="./src/sprite.svg#minus" />
              </svg>
            </button>
            <p>${c.quantity}</p>
            <button
              type="button"
              id="increaseQuantity${id}"
              class="cart-quantity-btn"
              data-item-id="${id}"
            >
              <svg class="icon">
                <use href="./src/sprite.svg#plus" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </li>
    `;
    });

    const markup = `
    <div class="cart-items-container">
          <ul class="cart-items-list">
          ${cartItemsMarkup.join('')} 
          </ul>
    </div>
    <div class="cart-footer">
    <div class="cart-price-details-container">
          <p>total </p>
          <h2>₹ ${checkoutPrice}</h2>
    </div>
    <button type="button" class="btn checkout-btn">checkout</button>
    </div>
    `;

    cartContent.insertAdjacentHTML('beforeend', markup);
  }
};

const renderProductList = products => {
  products.forEach(p => {
    const productMarkup = `
     <div class="product-card">
      <div class="favorite-btn-container">
        <button class="icon-btn ${p.liked ? 'liked' : ''}">
          <svg class="icon">
            <use href="./src/sprite.svg#heart" />
          </svg>
        </button>
        <div class="hint-container">
          <p>${p.liked ? 'remove' : 'add to favorite'}</p>
        </div>
      </div>
      <div class="product-card-image-container">
        <img src="./src/images/${p.image}" alt="product image" />
      </div>
      <div class="product-card-details">
        <div>
          <p class="product-card-product-title">${p.title}</p>
          <p class="product-category">gifts</p>
        </div>

        <div class="flex-space-between">
          <div class="flex-container">
            <p class="current-price">₹${p.price}</p>
            <p class="old-price">₹${p.oldPrice}</p>
          </div>

          <div class="flex-container">
            <p>${p.rating}</p>
            <svg class="icon">
              <use href="./src/sprite.svg#star" />
            </svg>
          </div>
        </div>
        <button
          class="btn btn-icon"
          id="addToCart${p.id}"
          data-product-id="${p.id}"
        >
          <svg class="icon">
            <use href="./src/sprite.svg#cart" />
          </svg>
          <p>add to cart</p>
        </button>
      </div>
    </div>`;

    productContainer.insertAdjacentHTML('beforeend', productMarkup);

    const addToCartButton = document.getElementById(`addToCart${p.id}`);

    addToCartButton.addEventListener('click', () => {
      incrementItem(p.id);
    });
  });
};

const updateCheckoutPrice = () => {};
