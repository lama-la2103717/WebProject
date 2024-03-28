document.addEventListener('DOMContentLoaded', function () {
    let product; // Declare product variable outside the loadProducts().then() block

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
        product = products.find(product => product.title === productTitle); // Assign product value
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

    const purchaseForm = document.getElementById('purchaseForm');
    purchaseForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const quantity = document.getElementById('quantity').value;
        const address = document.getElementById('address').value;
        if (!product) {
            console.error("Product not loaded yet.");
            return;
        }
        const purchase = {
            img: product.image,
            title: product.title,
            description: product.description,
            price: product.price,
            brand: product.brand,
            item: productTitle,
            quantity: quantity,
            shippingAddress: address,
            purchaseDate: new Date().toLocaleString() // Current date and time
        };

        let purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || [];
        purchaseHistory.push(purchase);
        localStorage.setItem('purchaseHistory', JSON.stringify(purchaseHistory));

        // Redirect to purchase history page
        window.location.href = 'purchaseHistory.html';
    });
});
