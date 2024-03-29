
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
// const detailBtn =document.querySelector(".detailButton")



//events
// detailBtn.addEventListener('click',showDetails)

//Lists
let products = []
showProducts()




async function showProducts() {
    if(!localStorage.products){
        const data = await fetch('/json/products.json')
        products = await data.json()
    }
    else
        products=JSON.parse(localStorage.products)


    const filteredProducts = products.filter(product => product.brand.match(brandName));
    console.log(filteredProducts);

    const productList= displayProducts(filteredProducts)
    productContainer.innerHTML =productList
    localStorage.products = JSON.stringify(products)




    // const response = await fetch('/json/products.json');
    // const products = await response.json();
    // const filteredProducts = products.filter(product => product.brand.match(brandName));
    // console.log(products[0].brand);

    // console.log(brandName);
    // displayProducts(filteredProducts);
}


function displayProducts(products) {
    const prodList = products.map(product => `
            <div class="productInfo">
                <img src="${product.image}" alt="${product.title}" />
                <h4 class="productTitle">${product.title}</h4>
                <p class="productPrice"><b>Price:</b> ${product.price}</p>
                <p class="productStock"><b>Stock:</b> ${product.stock}</p>
                <p class="productSold"><b>Sold:</b> ${product.stock}</p>
                <button class="detailButton" data-title="${product.title}") onClick="showDetails(${product.id})">View Details</button>
            </div>
        `).join(" ")

    return prodList

}
function showDetails(id){
    // console.log(id.value);
    const prod = products.find(p=>p.id == id)
    console.log(prod);
    
}
