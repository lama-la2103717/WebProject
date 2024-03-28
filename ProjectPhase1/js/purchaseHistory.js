document.addEventListener('DOMContentLoaded', function() {
    const purchaseHistoryData = JSON.parse(localStorage.getItem('purchaseHistory')) || [];
    const purchaseHistoryElement = document.querySelector('.purchaseHistory');

    if (purchaseHistoryData.length === 0) {
        purchaseHistoryElement.innerHTML = '<p>No purchase history found.</p>';
    } else {
        purchaseHistoryData.forEach(purchase => {
            const purchaseEntry = document.createElement('div');
            purchaseEntry.classList.add('purchaseEntry');
            purchaseEntry.innerHTML = `
                <p>Item: ${purchase.item}</p>
                <img src="${purchase.img}" alt="${purchase.item}" class="product-img"> 
                <p>Quantity: ${purchase.quantity}</p>
                <p>Purchase Date: ${purchase.purchaseDate}</p>
                <p>Shipping Address: ${purchase.shippingAddress}</p>
                <hr>
            `;
            purchaseHistoryElement.appendChild(purchaseEntry);
        });
    }
});
