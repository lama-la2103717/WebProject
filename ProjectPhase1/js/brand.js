document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  const brandName = urlParams.get('brand');

  const headerBrandName = document.createElement('h2');
  headerBrandName.textContent = brandName;
  document.querySelector('header').appendChild(headerBrandName);
  const img =document.querySelector(".logo-img")
  

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
          
          const ratingValue = parseFloat(product.rating);
          const fullStars = '\u2605'.repeat(Math.floor(ratingValue));
          let halfStar = '';
          if (ratingValue % 1 !== 0) {
              halfStar = '\u00BD'; // Unicode for half star
          }
          const productContainer = document.createElement('div');
          productContainer.classList.add('product');
      
          // Make price bold
          const boldPrice = `<h3>${product.price}</h3>`;
          productContainer.innerHTML = `
              <div class="productInfo">
                  <img src="${product.image}" alt="${product.title}" />
                  <h4 class="productTitle">${product.title}</h4>
                  <p class="productPrice"><b></b> ${product.price}</p>
                  <p class="rating">${fullStars}<span class="half-star">${halfStar}</span></p>
                  <p class="product-price">${boldPrice}</p>
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
