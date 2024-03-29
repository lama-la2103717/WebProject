document.addEventListener('DOMContentLoaded',()=>{
    const mHeader = document.querySelector(".header");
    const urlParams = new URLSearchParams(window.location.search);
    const brandName = urlParams.get('brand');
  
    const headerBrandName = document.createElement('h2');
    headerBrandName.textContent = brandName;
    mHeader.appendChild(headerBrandName);
    const img =document.querySelector(".logoImg")
  
    async function loadProducts() {
        try {
            const response = await fetch('/json/products.json');
            const products = await response.json();
            const filteredProducts = products.filter(product => product.brand.match(brandName));
            console.log(products[0].brand);

            console.log(brandName);
            displayProducts(filteredProducts);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    loadProducts();
    function displayProducts(products) {
        const productsList = document.querySelector('.product');
        productsList.innerHTML = '';
        products.forEach(product => {
            const productContainer = document.createElement('div');
            productContainer.classList.add('product');
            productContainer.innerHTML = `
                <div class="productInfo">
                    <img src="${product.image}" alt="${product.title}" />
                    <h4 class="productTitle">${product.title}</h4>
                    <p class="productPrice"><b>Price:</b> ${product.price}</p>
                    <p class="productStock"><b>Stock:</b> ${product.stock}</p>
                    <p class="productSold"><b>Sold:</b> ${product.stock}</p>
                    <button class="detailButton" data-title="${product.title}">View Details</button>
                </div>
            `;
            productsList.appendChild(productContainer);
        });

    }
    
}

)