document.addEventListener('DOMContentLoaded', async function() {
    const pageUrl = window.location.href.split("?");
    const username = decodeURIComponent(pageUrl[1].split("=")[1]);
    const balance = decodeURIComponent(pageUrl[2].split("=")[1]);
    const shipping_address = decodeURIComponent(pageUrl[3].split("=")[1]);

    try {
        const users = await fetch(`/api/users`, { method: 'GET' }).then(res => res.json());
        const user = users.find(u => 
            u.shipping_address === shipping_address.split("+").join(" ") &&
            u.username === username
        );

        if (!user) {
            console.error("User not found:", username);
            return;
        }
        const userId = user.userId;
        const purchaseHistory = await fetch(`/api/users/${userId}/purchases`, { method: 'GET' }).then(res => res.json());
        
        // Fetch product details for each purchase
        const purchaseHistoryWithDetails = await Promise.all(purchaseHistory.map(async purchase => {
            const productDetails = await fetch(`/api/products/${purchase.productId}`, { method: 'GET' }).then(res => res.json());
            return { ...purchase, productTitle: productDetails.title, img: productDetails.image };
        }));

        renderPurchaseHistory(user, purchaseHistoryWithDetails);
    } catch (error) {
        console.error('Error:', error);
    }

    const img = document.querySelector(".logo-img");
    img.addEventListener('click', goToMain);

    function goToMain() {
        window.location.href = `/html/main.html?type=customer?username=${username}?balance=${balance}?shippingAddress=${shipping_address}`;
    }

    function renderPurchaseHistory(user, purchaseHistory) {
        const purchaseHistoryElement = document.querySelector('.purchaseHistory');

        if (purchaseHistory.length === 0) {
            purchaseHistoryElement.innerHTML = '<p>No purchase history found.</p>';
        } else {
            purchaseHistoryElement.innerHTML = ''; 
            purchaseHistory.forEach(purchase => {
                const purchaseEntry = document.createElement('div');
                purchaseEntry.classList.add('purchaseEntry');
                purchaseEntry.innerHTML = `
                    <h2><b>Product: </b>${purchase.title}</h2>
                    <img src="${purchase.image}" alt="${purchase.title}" class="product-img"> 
                    <p><b>Quantity: </b>${purchase.quantity}</p>
                    <p><b>Shipping Address: </b>${user.shipping_address}</p>
                    <p><b>Total Cost: </b>${purchase.price * purchase.quantity} QAR</p>
                    <p><b>Purchase DateTime: </b>${purchase.datePurchased}</p>
                    <hr>
                `;
                purchaseHistoryElement.appendChild(purchaseEntry);
            });
        
        }
    }

    // You may not need this unless you're dispatching a custom 'purchase' event elsewhere
    // document.addEventListener('purchase', renderPurchaseHistory);
});

// You may not need this unless you're dispatching a custom 'purchase' event elsewhere
// document.dispatchEvent(new Event('purchase'));
