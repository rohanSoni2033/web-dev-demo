const products = [];

fetch('./products.json')
  .then(d => d.json())
  .then(data => renderProductList(data));

const productContainer = document.getElementById('productContainer');
const renderProductList = products => {
  products.forEach(p => {
    const productMarkup = `
     <div class="product-card">
            <button class="icon-btn like-btn ${p.liked ? 'liked' : ''}">
              <svg class="icon">
                <use href="./src/sprite.svg#heart" />
              </svg>
            </button>
            <div class="product-card-image-container">
              <img src="./src/images/${p.image}" alt="product image" />
            </div>
            <div class="product-card-details">
              <p class="product-card-product-title">
                ${p.title}
              </p>
              <div class="product-card-column">
                <div class="product-card-price-container">
                  <p class="current-price">₹${p.price}</p>
                  <p class="old-price">₹${p.oldPrice}</p>
                </div>

                <div class="ratings-container">
                  <p>${p.rating}</p>
                  <svg class="icon">
                    <use href="./src/sprite.svg#star" />
                  </svg>
                </div>
              </div>
              <button class="btn">
                <div class="btn-icon-text-container">
                  <svg class="icon">
                    <use href="./src/sprite.svg#cart" />
                  </svg>
                  <p>add to cart</p>
                </div>
              </button>
            </div>
          </div>
    `;

    productContainer.insertAdjacentHTML('beforeend', productMarkup);
  });
};
