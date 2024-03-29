document.addEventListener('DOMContentLoaded', function () {
    let product;
    let products = JSON.parse(localStorage.getItem('products')) || [];

    const urlParams = new URLSearchParams(window.location.search);
    const productTitle = urlParams.get('productTitle');
    const username = urlParams.get('username');

    // Find the product by title from the products array
    product = products.find(product => product.title === productTitle);

    if (product) {
        displayProduct(product);
    } else {
        console.error("Product not found:", productTitle);
        // Handle product not found error (e.g., display an error message)
    }

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
        document.querySelector('main').appendChild(productDetails);

        const purchaseForm = document.querySelector('#purchaseForm');
        purchaseForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const quantity = parseInt(document.querySelector('#quantity').value);
            const address = document.querySelector('#address').value;
            if (!product) {
                console.error("Product not loaded yet.");
                return;
            }

            // Ensure buyerList is initialized as an array
            product.buyerList = product.buyerList || [];

            // Add current username to the buyerList
            product.buyerList.push(username);

            if (!product.sold) {
                product.sold = 0;
            }
            product.sold += quantity;

            if (!product.stock) {
                product.stock = 0;
            }
            product.stock -= quantity;

            // Attach purchase date and time to the product
            const purchaseDateTime = new Date().toLocaleString();
            if (!product.purchaseList) {
                product.purchaseList = [];
            }
            product.purchaseList.push({ username: username, purchaseDateTime: purchaseDateTime });

            // Save the updated product to local storage
            localStorage.setItem('products', JSON.stringify(products));

            let purchaseHistory = JSON.parse(localStorage.getItem(username)) || [];

            const purchaseRecord = {
                productTitle: product.title,
                item: product.title,
                img: product.image,
                quantity: quantity,
                address: address,
                brand: product.brand,
                item: productTitle,
                price: product.price,
                buyerList: product.buyerList, 
                stock: product.stock,
                sold: product.sold,
                purchaseDateTime: purchaseDateTime,
                purchaseList: product.purchaseList.map(entry => `${entry.username} - ${entry.purchaseDateTime}`)
            };

            purchaseHistory.push(purchaseRecord);
            localStorage.setItem(username, JSON.stringify(purchaseHistory)); 

            window.location.href = `purchaseHistory.html?username=${encodeURIComponent(username)}`;
        });
    }
});
