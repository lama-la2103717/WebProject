document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productTitle = urlParams.get('productTitle');

    async function loadProducts() {
        try {
            const response = await fetch('/json/products.json');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    loadProducts().then(products => {
        const product = products.find(product => product.title === productTitle);
        if (product) {
            displayProduct(product);
        } else {
            console.error("Product not found:", productTitle);
        }
    });

    function displayProduct(product) {
        const productDetails = document.createElement('div');
        productDetails.classList.add('product');
        productDetails.innerHTML = `
            <div class="productInfo">
                <img src="${product.image}" alt="${product.title}" />
                <h2>${product.title}</h2>
                <p><b>Description:</b> ${product.description}</p>
                <p><b>Price:</b> ${product.price}</p>
            </div>
        `;
        document.body.appendChild(productDetails);
    }
});
