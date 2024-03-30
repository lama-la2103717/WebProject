document.addEventListener('DOMContentLoaded', function () {
    let product;
    let products = JSON.parse(localStorage.getItem('products')) || [];

    const urlParams = new URLSearchParams(window.location.search);
    const productTitle = urlParams.get('productTitle');
    const username = urlParams.get('username');
    const balance = parseFloat(urlParams.get('balance')) || 0; 

    const shipping_address=urlParams.get('shippingAddress');
    const type=urlParams.get('type');
    const brand=urlParams.get('brand');
    const img =document.querySelector(".logo-img")
    img.addEventListener('click',goToMain)
    function goToMain(){
        
      window.location.href=`/html/main.html?type=customer&username=${username}&balance=${balance}`
    }
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
                <p>${product.description}</p>
                <h3>${product.price}</h3>

            </div>
        `;
        document.querySelector('.product-info-container').appendChild(productDetails);
    }
    
        let userBalance = parseFloat(localStorage.getItem(`${username}_balance`)) || 0;
        // Display user balance
        const userBalanceElement = document.createElement('p');
        userBalanceElement.textContent = `Your balance: ${userBalance.toFixed(2)}QAR`; // Use balance from URL parameter
        document.querySelector('.Purchase-Details').appendChild(userBalanceElement);

        const addressInput = document.querySelector('#address');
        if (shipping_address) {
            addressInput.value = shipping_address;
        }
        const purchaseHistoryNav = document.querySelector('.Purchase-History')
        purchaseHistoryNav.addEventListener('click', function () {
            window.location.href = `purchaseHistory.html?brand=${brand}&productTitle=${productTitle}&type=${type}&username=${encodeURIComponent(username)}`;
        })

        const purchaseForm = document.querySelector('#purchaseForm');
        purchaseForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const quantity = parseInt(document.querySelector('#quantity').value);
            const address = document.querySelector('#address').value;


            if (!product) {
                console.error("Product not loaded yet.");
                return;
            }
            // Inside the purchaseForm event listener
            const productPrice = parseFloat(product.price.replace(/[^\d.]/g, '')); 
            const totalCost = quantity * productPrice; 
          
            if (userBalance < totalCost) {
                // Show alert if user doesn't have enough balance
                alert(`You don't have enough balance. Your available balance is ${userBalance.toFixed(2)} QAR.`);
                return;
            }

            // Check if there's enough stock
            if (quantity > product.stock) {
                alert(`Sorry, there's not enough stock available. Available stock: ${product.stock}`);
                return;
            }

           userBalance -= totalCost;
    
            localStorage.setItem(`${username}_balance`, userBalance.toFixed(2));

            product.buyerList = product.buyerList || [];


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
            product.purchaseList.push(
                { username: username, 
                purchaseDateTime: purchaseDateTime ,
                totalCost: totalCost });



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
                price: product.price,
                buyerList: product.buyerList, 
                stock: product.stock,
                sold: product.sold,
                totalCost: totalCost,
                purchaseDateTime: purchaseDateTime,
                purchaseList: product.purchaseList.map(entry => `${entry.username} - ${entry.purchaseDateTime} - ${entry.totalCost}`) // Concatenate strings properly
            };
            
            purchaseHistory.unshift(purchaseRecord);
            localStorage.setItem(username, JSON.stringify(purchaseHistory)); 

            alert(`Purchase have been recorded successfully. Your balance is $${userBalance.toFixed(2)}.`);
           
           
        });
    })
        

