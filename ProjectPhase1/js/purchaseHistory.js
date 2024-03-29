document.addEventListener('DOMContentLoaded', function() {
    const username = new URLSearchParams(window.location.search).get('username');
    const purchaseHistoryData = JSON.parse(localStorage.getItem(username)) || [];
    const purchaseHistoryElement = document.querySelector('.purchaseHistory');

    if (purchaseHistoryData.length === 0) {
        purchaseHistoryElement.innerHTML = '<p>No purchase history found.</p>';
    } else {
        purchaseHistoryData.forEach(purchase => {
            const purchaseEntry = document.createElement('div');
            purchaseEntry.classList.add('purchaseEntry');
            purchaseEntry.innerHTML = `
                <p>Product Title: ${purchase.productTitle}</p>
                <img src="${purchase.img}" alt="${purchase.item}" class="product-img"> 
                <p>Quantity: ${purchase.quantity}</p>
                <p>Shipping Address: ${purchase.address}</p>
                <p> buyerslist: ${purchase.buyerList}</p>
                <p> stock: ${purchase.stock}</p>
                <p> sold: ${purchase.sold}</p>
                <hr>
            `;
            purchaseHistoryElement.appendChild(purchaseEntry);
        });
    }
});
