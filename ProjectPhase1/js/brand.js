const url = '/json/products.json';

document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const brandName = urlParams.get('brand');
    
    const headerBrandName = document.createElement('h2');
    headerBrandName.textContent = brandName;
    document.querySelector('header').appendChild(headerBrandName);

    async function loadProducts() {
        try {
          if (!localStorage.products) {
            const response = await fetch(url);
            const data = await response.json();
            localStorage.setItem("products", JSON.stringify(data));
            console.log("Data fetched and stored in local storage:", data);
            return data;
          } else {
            return JSON.parse(localStorage.getItem("products"));
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    loadProducts().then(products => {
        const filteredProducts = products.filter(product => product.brand === brandName);
        displayProducts(filteredProducts);
    });
    
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
                    <button class="purchaseButton">Purchase</button>
                </div>
            `;
            productsList.appendChild(productContainer);
        });
    }
    
    
});
