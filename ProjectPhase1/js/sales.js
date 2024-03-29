
document.addEventListener('DOMContentLoaded',()=>{
        try {

        } catch (error) {
            console.error("Error fetching data:", error);
        }
}

)


const urlParams = new URLSearchParams(window.location.search);

//brand name
//getting it from url
const brandName = urlParams.get('brand');

//h2 for the brand name on the right
const headerBrandName = document.createElement('h2');


//changeing th etxt of brand
headerBrandName.textContent = brandName;

//adding it to the hdr
const mHeader = document.querySelector(".header");
mHeader.appendChild(headerBrandName);




//queries
const img =document.querySelector(".logoImg")
const productContainer = document.querySelector('.product')
const ref = document.querySelector('.aref')

const detailcontainer = document.querySelector('.detailContainer')
detailcontainer.classList.remove('detailContainer')

img.addEventListener("click", goToMain)

function goToMain(){
    window.location.href=`/html/main.html?type=seller?brand=${brandName}`
}


//events

//Lists
let products = []
showProducts();




async function showProducts() {
    if(!localStorage.products){
        const data = await fetch('/json/products.json')
        products = await data.json()
    }
    else
        products=JSON.parse(localStorage.products)


    const filteredProducts = products.filter(product => product.brand.match(brandName));
    console.log(filteredProducts[0].id);

    const productList= displayProducts(filteredProducts)
    productContainer.innerHTML =productList
    localStorage.products = JSON.stringify(products)
}


function displayProducts(products) {
    const prodList = products.map(product => `
            <div class="productInfo">
                <img src="${product.image}" alt="${product.title}" >
                <h4 class="productTitle">${product.title}</h4>
                <p class="productPrice"><b>Price:</b> ${product.price}</p>
                <p class="productStock"><b>Stock:</b> ${product.stock}</p>
                <p class="productSold"><b>Sold:</b> ${product.stock}</p>
                <a href="#" ><input type="button" class ="detailButton" onClick= "showDetails('${product.id}')" value="Show Details">  </a>   
                </div>
        `).join(" ");
    return prodList

}
function showDetails(id){
    console.log(id);
    const prod = products.find(p=>p.id == id)
    detailcontainer.classList.add('detailContainer')

    detailcontainer.innerHTML= displayDetail(prod);   
    
}

function displayDetail(product){

    return `
    <div class="productDetail">
                <div><h2>Sale History</h2></div>
                <div><h4>${product.title}</h4></div>
                <div><p><b>Selling Price:</b> ${product.price}</p></div>
                <div><p><b>Total Amount Available:</b> ${product.stock}</p></div>
                <div><p><b>Total Amount Sold:</b> ${product.stock}</p></div>
                <div><p class ='productRevnue'><b>Revnue:</b> ${product.stock}</p></div>
                <div><p class ='productBuyer'><b>Buyers:</b> ${product.stock}</p> </div>
                <div> <input type="button" class ="closeButton" onClick= "switchView()" value="Close">   </div> 
               
    </div>
    `

}
function switchView(){
    detailcontainer.innerHTML=""
    detailcontainer.classList.remove('detailContainer')
}