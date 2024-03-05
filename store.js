let carts = document.querySelectorAll('.add-cart')

let products = [
  {
    name: 'Fully Assembled TOFU60 Acrylic Mechanical Keyboard',
    tag: 'tofu60',
    price: 148,
    inCart: 0
  },
  {
    name: 'Fully Assembled 60% Frosted Acrylic Keyboard',
    tag: 'frosted60',
    price: 139,
    inCart: 0
  },
  {
    name: 'Fully Assembled 60% Transparent Mechanical Keyboard',
    tag: 'transparent60',
    price: 112,
    inCart: 0
  },
  {
    name: 'Gateron Ink V2 Switches (10 pcs)',
    tag: 'gateroninkv2',
    price: 7.5,
    inCart: 0
  },
  {
    name: 'Gateron Switches (10 pcs)',
    tag: 'gateron',
    price: 2,
    inCart: 0
  },
  {
    name: 'Kalih Pro Switches (10 pcs)',
    tag: 'kalih',
    price: 3,
    inCart: 0
  },
  {
    name: 'GMK Lavender',
    tag: 'lavender',
    price: 129,
    inCart: 0
  },
  {
    name: 'GMK Nimbus',
    tag: 'nimbus',
    price: 149,
    inCart: 0
  },
  {
    name: 'GMK Retrotrip',
    tag: 'retrotrip',
    price: 138,
    inCart: 0
  },
];

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener('click', () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
  })
}

function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem('cartNumbers');

  if (productNumbers) {
    document.querySelector('.cart span').textContent = productNumbers;
  }
}

function cartNumbers(product) {
  let productNumbers = localStorage.getItem('cartNumbers');
  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    localStorage.setItem('cartNumbers', productNumbers + 1);
    document.querySelector('.cart span').textContent = productNumbers + 1;
  }
  else {
    localStorage.setItem('cartNumbers', 1);
    document.querySelector('.cart span').textContent = 1;

  }

  setItems(product);
}

function setItems(product) {
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);

  if(cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product
      }
    }
    cartItems[product.tag].inCart += 1;
  }
  else {
    product.inCart = 1;
    cartItems = {
      [product.tag]: product
    }
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
  let cartCost = localStorage.getItem('totalCost');

  console.log("My cartCost is", cartCost);

  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
  }
  else {
    localStorage.setItem("totalCost", product.price);
  }
}

function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector(".products")
  let cartCost = localStorage.getItem('totalCost');

  if (cartItems && productContainer) {
    productContainer.innerHTML = '';
    Object.values(cartItems).map(item => {
      productContainer.innerHTML += `
      <div class="product">
        <p>${item.name}<span class="price">$${item.price}</span></p>
      </div>
      `
    });

    productContainer.innerHTML += `
      <div class="basketTotalContainer">
        <h4 class+"basketTotalTitle">
          Total
        </h4>
        <h4 class="basketTotal">
          $${cartCost}
        </h4>
      </div>
    `
  }
}

function payment() {
  alert("Payment Completed")
}

function clearCart() {
  localStorage.removeItem('productsInCart');
  localStorage.removeItem('totalCost');
  localStorage.removeItem('cartNumbers');
}

onLoadCartNumbers()
displayCart();
