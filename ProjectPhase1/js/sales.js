
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

const addB=document.querySelector('.addButton')
const productForm=document.querySelector('.ProductForm')


// const detailBtn =document.querySelector(".detailButton")

const ref = document.querySelector('.aref')


const detailcontainer = document.querySelector('.detailContainer')
detailcontainer.classList.remove('detailContainer')

img.addEventListener("click", goToMain)

function goToMain(){
    window.location.href=`/html/main.html?type=seller?brand=${brandName}`
}


//events

// detailBtn.addEventListener('click',showDetails)
addB.addEventListener('click', handelShowForm);


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

    //search for a specific product by title 
    const searchB = document.querySelector('#search');
    searchB.addEventListener('input', () => {
    const searched = filteredProducts.filter(p => {
        const title = p.title.toLowerCase().includes(searchB.value.toLowerCase());
        return title;
    });

    productContainer.innerHTML = displayProducts(searched);
});
    

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

                <div class="productButton">
                <a href="#" ><input type="button" class ="detailButton" onClick= "showDetails('${product.id}')" value="Show Details">  </a>
                <button class="updateButton" onclick="handelUpdateForm('${product.id}')">Update</button>
                <button class="deleteButton"  onclick="deleteProduct('${product.id}')">Remove</button>
                </div>
            </div>
        `).join(" ");


    return prodList;
    
    
}

function handelShowForm() {
    addB.classList.add('hidden');
    productForm.classList.remove('hidden');
    const cancelB = document.querySelector('#cancel');
    cancelB.addEventListener('click', handelHideForm);
    productForm.addEventListener('submit', addProduct);
}

function handelHideForm(e) {
    e.preventDefault();
    productForm.reset();
    productForm.classList.add('hidden');
    addB.classList.remove('hidden');
}

//delete a product 
function deleteProduct(prodId) {
    const index = products.findIndex(p => p.id== prodId);
    if (index !== -1) {
        products.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(products));
        displayProducts(products)
    }
}
//add new product
function addProduct(e) {
    e.preventDefault();
    const productId = Date.now() + Math.floor(Math.random() * 1000);
    // console.log("callllled");
    const newProduct = {
        id: productId,
        title: productForm.querySelector('#title').value,
       image:productForm.querySelector('#thumbnailUrl').value,
       price:productForm.querySelector('#price').value,
       rating:productForm.querySelector('#rating').value,
       description:productForm.querySelector('#description').value,
       brand:brandName,
       stock:productForm.querySelector('#stock').value,
       sold:productForm.querySelector('#stock').value
    };
    let products = JSON.parse(localStorage.getItem('products'));
    products.unshift(newProduct); // to add it to the Beginning
    localStorage.setItem('products', JSON.stringify(products));
    handelHideForm(e);
    displayProducts(products)
}
//update product
function handelUpdateForm(prodId) {
    index = products.findIndex(p => p.id == prodId);
    product = products[index];
    document.querySelector('#id').value = product.id;
    document.querySelector('#title').value = product.title;
    document.querySelector('#thumbnailUrl').value = product.image;
    document.querySelector('#price').value = product.price;
    document.querySelector('#rating').value = product.rating;
    document.querySelector('#description').value = product.description;
    document.querySelector('#stock').value = product.stock;
    handelShowForm(); 
    productForm.removeEventListener('submit', addProduct);
    productForm.addEventListener('submit', function(e) {
        updateProduct(e, index); 
    });
}
function updateProduct(e, index) {
    e.preventDefault();
    const updatedProduct = {
        title: productForm.querySelector('#title').value,
        image: productForm.querySelector('#thumbnailUrl').value,
        price: productForm.querySelector('#price').value,
        rating: productForm.querySelector('#rating').value,
        description: productForm.querySelector('#description').value,
        brand: brandName,
        stock: productForm.querySelector('#stock').value,
    };
    products[index] = updatedProduct;
    localStorage.setItem('products', JSON.stringify(products));
    handelHideForm(e);
    displayProducts(products);
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

