document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const username =urlParams.get('username');
    const productTitle=urlParams.get('productTitle')
    const type=urlParams.get('type')
    const brand=urlParams.get('brand')
    renderPurchaseHistory();
    const img =document.querySelector(".logo-img")
    img.addEventListener('click',goToMain)
    function goToMain(){
      window.location.href=`/html/main.html?productTitle=${productTitle}&type=customer&username=${username}`
    }
    function renderPurchaseHistory() {
        const purchaseHistoryData = JSON.parse(localStorage.getItem(username)) || [];
        const purchaseHistoryElement = document.querySelector('.purchaseHistory');

        if (purchaseHistoryData.length === 0) {
            purchaseHistoryElement.innerHTML = '<p>No purchase history found.</p>';
        } else {
            purchaseHistoryElement.innerHTML = ''; // Clear previous entries
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
                    <p> totalCost: ${purchase.totalCost}</p>
                    <p> purchaseDateTime: ${purchase.purchaseDateTime}</p>
                    <p> purchaseList: ${purchase.purchaseList}</p>
                    <hr>
                `;
                purchaseHistoryElement.appendChild(purchaseEntry);
            });
        }
    }

    // Add an event listener to listen for a purchase event
    document.addEventListener('purchase', renderPurchaseHistory);
});
// After the purchase is successfully completed
document.dispatchEvent(new Event('purchase'));

