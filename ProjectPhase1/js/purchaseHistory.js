document.addEventListener('DOMContentLoaded', function() {
    const pageUrl = window.location.href.split("?");
    const username = decodeURIComponent(pageUrl[1].split("=")[1]);//3
    const balance = decodeURIComponent(pageUrl[2].split("=")[1]);
    const shipping_address = decodeURIComponent(pageUrl[3].split("=")[1]);//


    let users =  JSON.parse(localStorage.getItem('users')) || [];

    const user = users.findIndex(u=> 
        u.shipping_address==shipping_address.split("+").join(" ") &&
        u.username==username)
        console.log(balance);
    renderPurchaseHistory();
    const img =document.querySelector(".logo-img")
    img.addEventListener('click',goToMain)
    function goToMain(){
        window.location.href=`/html/main.html?type=customer?username=${username}?balance=${balance}?shippingAddress=${shipping_address}`
    }
    function renderPurchaseHistory() {

        const purchaseHistoryData = users[user].purchaseHistory
         || [];
        const purchaseHistoryElement = document.querySelector('.purchaseHistory');
        if (purchaseHistoryData.length === 0) {
            purchaseHistoryElement.innerHTML = '<p>No purchase history found.</p>';
        } else {
            purchaseHistoryElement.innerHTML = ''; // Clear previous entries
            purchaseHistoryData.forEach(purchase => {
                const purchaseEntry = document.createElement('div');
                purchaseEntry.classList.add('purchaseEntry');
                purchaseEntry.innerHTML = `
                    <h2><b>Product: </b>${purchase.productTitle}</h2>
                    <img src="${purchase.img}" alt="${purchase.item}" class="product-img"> 

                    <p><b>Quantity: </b>${purchase.quantity}</p>
                    <p><b>Shipping Address: </b>${purchase.address}</p>
                    <p> <b>Total Cost: </b>${purchase.totalCost}QAR</p>
                    <p> <b>Purchase DateTime: </b>${purchase.purchaseDateTime}</p>
                    <hr>
                `;
                purchaseHistoryElement.appendChild(purchaseEntry);
            });
        }
    }

    document.addEventListener('purchase', renderPurchaseHistory);
});
document.dispatchEvent(new Event('purchase'));

