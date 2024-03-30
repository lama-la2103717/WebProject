document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  const brandName = urlParams.get('brand');
  const username = urlParams.get('username');
  const balance = urlParams.get('balance');
  const type = urlParams.get('type');
  const shipping_address= urlParams.get('shippingAddress');


  //attrib from url
  const pageUrl = window.location.href.split("?");

  const brandUrl = decodeURIComponent(pageUrl[1].split("brand=")[1])//1
  const userUrl = decodeURIComponent(pageUrl[3].split("username=")[1]);//3
  const balanceUrl = decodeURIComponent(pageUrl[5].split("balance=")[1]);
  const typeUrl = decodeURIComponent(pageUrl[2].split("type=")[1]);//2
  const addressUrl = decodeURIComponent(pageUrl[4].split("shippingAddress=")[1]);//





  const headerBrandName = document.createElement('h2');
  headerBrandName.textContent = brandUrl;
  document.querySelector('header').appendChild(headerBrandName);

  const img =document.querySelector(".logo-img")
  img.addEventListener('click',goToMain)
  function goToMain(){
    window.location.href=`/html/main.html?type=${typeUrl}?username=${userUrl}?brand=${brandUrl}`
  }
 
  async function loadProducts() {
      try {
          const response = await fetch('/json/products.json');
          const products = await response.json();
          const filteredProducts = products.filter(product => product.brand === brandUrl);
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
                  <p class="rating">${fullStars}<span class="half-star">${halfStar}</span></p>
                  <p class="product-price">${boldPrice}</p>
                  ${product.stock!==0?
                    `<button type="button" class="purchaseButton" data-title="${product.title}" >Purchase</button> ` :
                    `<label class='red'>Out of Stock</label>`
                }
              </div>
          `;
          productsList.appendChild(productContainer);
      });

      // Add event listener to Purchase buttons
    const purchaseButtons = document.querySelectorAll('.purchaseButton');
    purchaseButtons.forEach(button => {
    button.addEventListener('click', function () {
        if (typeUrl === 'customer') {
            const productTitle = this.getAttribute('data-title');
            const purchaseUrl = `purchase.html?brand=${brandUrl}?productTitle=${productTitle}?type=${typeUrl}?username=${userUrl}?balance=${balanceUrl}?shippingAddress=${addressUrl}`;
            window.location.href = purchaseUrl;
        } else {
            alert('You should be logged in as a customer to make a purchase.');
        }
    });
    });
            
    }
    });
