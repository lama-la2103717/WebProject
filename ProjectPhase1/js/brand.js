document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  const brandName = urlParams.get('brand');

  const headerBrandName = document.createElement('h2');
  headerBrandName.textContent = brandName;
  document.querySelector('header').appendChild(headerBrandName);
  const img =document.querySelector(".logo-img")
  img.addEventListener("click", goToMain)

  async function loadProducts() {
      try {
          const response = await fetch('/json/products.json');
          const products = await response.json();
          const filteredProducts = products.filter(product => product.brand === brandName);
          displayProducts(filteredProducts);
      } catch (error) {
          console.error("Error fetching data:", error);
      }
  }

  loadProducts();

  function displayProducts(products) {
      const productsList = document.querySelector('#productsList');
      productsList.innerHTML = '';
      products.forEach(product => {
          const productContainer = document.createElement('div');
          productContainer.classList.add('product');
          productContainer.innerHTML = `
              <div class="productInfo">
                  <img src="${product.image}" alt="${product.title}" />
                  <h4 class="productTitle">${product.title}</h4>
                  <p class="productDescription"><b>Description:</b> ${product.description}</p>
                  <p class="productPrice"><b>Price:</b> ${product.price}</p>
                  <button class="purchaseButton" data-title="${product.title}">Purchase</button>
              </div>
          `;
          productsList.appendChild(productContainer);
      });

      // Add event listener to Purchase buttons
      const purchaseButtons = document.querySelectorAll('.purchaseButton');
      purchaseButtons.forEach(button => {
          button.addEventListener('click', function () {
              const productTitle = this.getAttribute('data-title');
              window.location.href = `purchase.html?productTitle=${encodeURIComponent(productTitle)}`;
          });
      });
  }
});

function goToMain(){
    window.location.href="/html/main.html"
}