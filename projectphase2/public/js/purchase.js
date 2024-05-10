document.addEventListener('DOMContentLoaded', async function () {
    let products;
    let product;
    let users
    try {
        let productResponse = await fetch(`/api/products`, { method: 'GET' });
         products= await productResponse.json();

        let userResponse = await fetch(`/api/users`, { method: 'GET' });
         users= await userResponse.json();

    } catch (error) {
        console.error('Error fetching data:', error);
    }
    // 


   //attrib from url


  const pageUrl = window.location.href.split("?");

  const userUrl = decodeURIComponent(pageUrl[4].split("username=")[1]);//3
  const titleUrl = decodeURIComponent(pageUrl[2].split("productTitle=")[1]);//3
  const balanceUrl = decodeURIComponent(pageUrl[5].split("balance=")[1]);
  const addressUrl = decodeURIComponent(pageUrl[6].split("shippingAddress=")[1]);//

  const user = users.findIndex(u=> 
    u.shipping_address==addressUrl.split("+").join(" ") &&
    u.username==userUrl)



    const img =document.querySelector(".logo-img")
    img.addEventListener('click',goToMain)
    function goToMain(){
        
      window.location.href=`/html/main.html?type=customer?username=${userUrl}?balance=${users[user].balance}?shippingAddress=${addressUrl}`
    }
    // Find the product by title from the products array
    product = products.find(product => product.title === titleUrl);

    if (product) {
        displayProduct(product);
    } else {
        console.error("Product not found:", titleUrl);
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
    
        let userBalance = parseFloat(balanceUrl) || 0;

        const userBalanceElement = document.createElement('p');
        userBalanceElement.textContent = `Your balance: ${userBalance.toFixed(2)}QAR`; // Use balance from URL parameter
        document.querySelector('.Purchase-Details').appendChild(userBalanceElement);

        const addressInput = document.querySelector('#address');
        if (addressUrl) {
            addressInput.value = addressUrl;
        }
        const purchaseHistoryNav = document.querySelector('.Purchase-History')
        purchaseHistoryNav.addEventListener('click', function () {
            window.location.href = `purchaseHistory.html?username=${userUrl}?balance=${userBalance}?shippingAddress=${addressUrl}`;
        })

        const purchaseForm = document.querySelector('#purchaseForm');
purchaseForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    const quantity = parseInt(document.querySelector('#quantity').value);
    const address = document.querySelector('#address').value;

    if (!product) {
        console.error("Product not loaded yet.");
        return;
    }
    
    const productPrice = product.price;
    const totalCost = quantity * productPrice;

    if (userBalance < totalCost) {
        alert(`You don't have enough balance. Your available balance is ${userBalance.toFixed(2)} QAR.`);
        return;
    }

    if (quantity > product.stock) {
        alert(`Sorry, there's not enough stock available. Available stock: ${product.stock}`);
        return;
    }
    userBalance -= totalCost;

        try {
            // Add purchase
            const addPurchaseResponse = await fetch(`/api/users/${users[user].userId}/purchases`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    productId: product.id,
                    userId: users[user].userId, // Fix accessing user's userId
                    brandName: product.brand,
                    quantity: quantity,
                    price: product.price,
                    datePurchased: new Date().toISOString() 
                })
            });
            if (!addPurchaseResponse.ok) {
                throw new Error('Failed to add purchase');
            }
        
            // Update user balance
            const updateUserResponse = await fetch(`/api/users/${users[user].userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    balance: userBalance
                })
            });
            if (!updateUserResponse.ok) {
                throw new Error('Failed to update user balance');
            }
        
            // Update UI elements
            product.stock -= quantity;
            product.sold += quantity;
            userBalanceElement.textContent = `Your balance: ${userBalance.toFixed(2)} QAR`;
            alert(`Purchase has been recorded successfully. Your balance is ${userBalance.toFixed(2)} QAR.`);
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while processing your purchase.');
        }
        
});
});