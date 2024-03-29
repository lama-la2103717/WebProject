document.addEventListener('DOMContentLoaded', function () {
    let product;
    let products; // Declare products variable in the outer scope

    const urlParams = new URLSearchParams(window.location.search);
    const productTitle = urlParams.get('productTitle');
    const username = urlParams.get('username');

    async function loadProducts() {
        try {
            const response = await fetch('/json/products.json');
            products = await response.json(); // Assign products to the outer variable
            return products;
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error; // Propagate the error further for better debugging
        }
    }

    loadProducts().then(products => {
        product = products.find(product => product.title === productTitle); // Assign product value
        if (product) {
            displayProduct(product);
        } else {
            console.error("Product not found:", productTitle);
            // Handle product not found error (e.g., display an error message)
        }
    }).catch(error => {
        console.error("Error loading products:", error);
        // Handle product loading error (e.g., display an error message)
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
        document.querySelector('main').appendChild(productDetails); // Append productDetails to the main element

        const purchaseForm = document.querySelector('#purchaseForm');
        purchaseForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const quantity = parseInt(document.querySelector('#quantity').value);
            const address = document.querySelector('#address').value;
            if (!product) {
                console.error("Product not loaded yet.");
                return;
            }
 
            if (!product.buyerList) {
                product.buyerList = [];
            }
            product.buyerList.push(username);

            if (!product.sold) {
                product.sold = 0;
            }
            product.sold += quantity;

            if (!product.stock) {
                product.stock = 0;
            }
            product.stock -= quantity;

            const productIndex = products.findIndex(p => p.title === product.title);
            if (productIndex !== -1) {
                products[productIndex] = product; // Update the product in the products array
                localStorage.setItem('products', JSON.stringify(products)); // Save changes to local storage
            }

            let purchaseHistory = JSON.parse(localStorage.getItem(username)) || [];

            const purchaseRecord = {
                productTitle: product.title,
                item: product.title,
                img: product.image,
                quantity: quantity,
                address: address,
                brand: product.brand,
                item: productTitle,
                buyerList: product.buyerList,
                stock: product.stock,
                sold: product.sold,
                purchaseDate: new Date().toLocaleDateString()

            };

            purchaseHistory.push(purchaseRecord);
            localStorage.setItem(username, JSON.stringify(purchaseHistory)); // Update the purchase history in local storage

            window.location.href = `purchaseHistory.html?username=${encodeURIComponent(username)}`;
        });
    }
});
