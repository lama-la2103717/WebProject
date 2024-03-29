
document.addEventListener('DOMContentLoaded',()=>{

  
        try {

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    




    
}

)

//queries
const mHeader = document.querySelector(".header");
const img =document.querySelector(".logoImg")



//events



const urlParams = new URLSearchParams(window.location.search);
const brandName = urlParams.get('brand');

const headerBrandName = document.createElement('h2');
headerBrandName.textContent = brandName;
mHeader.appendChild(headerBrandName);

async function loadProducts() {


const response = await fetch('/json/products.json');
const products = await response.json();
const filteredProducts = products.filter(product => product.brand.match(brandName));
console.log(products[0].brand);

console.log(brandName);
displayProducts(filteredProducts);}


loadProducts();
function displayProducts(products) {
    const productsList = document.querySelector('.product');
    productsList.innerHTML = '';
    products.forEach(product => {
        const productContainer = document.createElement('div');
        productContainer.classList.add('product');
        productContainer.innerHTML = `
            <div class="productInfo">
                <img src="${product.image}" alt="${product.title}" />
                <h4 class="productTitle">${product.title}</h4>
                <p class="productPrice"><b>Price:</b> ${product.price}</p>
                <p class="productStock"><b>Stock:</b> ${product.stock}</p>
                <p class="productSold"><b>Sold:</b> ${product.stock}</p>
                <button class="detailButton" data-title="${product.title}") onClick="showDetails(${product.id})">View Details</button>
            </div>
        `;
        productsList.appendChild(productContainer);
    });

}
function showDetails(id){
    // console.log(id.value);
    const prod = products.find(p=>p.id == id)
    console.log(prod);
    
}
