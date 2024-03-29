
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



const detailcontainer = document.querySelector('.detailContainer')
detailcontainer.classList.remove('detailContainer')

img.addEventListener("click", goToMain)

function goToMain(){
    window.location.href=`/html/main.html?type=seller?brand=${brandName}`
}


//events
addB.addEventListener('click', switchForm)
productForm.addEventListener('submit', addProductForm)


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

        let filteredProducts=""
        if(!filteredProducts){
             filteredProducts = products.filter(product => product.brand.match(brandName));
        }

    

    // console.log(filteredProducts[0].id);

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

                ${product.stock!==0?
                    `<p class="productStock"><b>Stock:</b> ${product.stock}</p>` :
                    `<label class='red'><b>Stock:</b> Out of Stock</label>`
                }
                
                ${product.sold?
                    `<p class="productSold"><b>Sold:</b> ${product.sold}</p>` :
                    `<label class='red'><b>Sold:</b> None</label>`
                }

                

                <div class="productButton">
                <a href="#" ><input type="button" class ="detailButton" onClick= "showDetails('${product.id}')" value="Show Details">  </a>
                <button class="updateButton" onclick="updateProduct('${product.id}')">Update</button>
                </div>
            </div>
        `).join(" ");


    return prodList;
    
    
}

function formToObject(form){
    const formData = new FormData(form)

    const data= {}

    for(const [key,value] of formData){
        data[key] = value

    }
    return data
}
function switchForm(){
    productForm.classList.toggle("hidden");


    if(addB.style.display !== "none"){
    addB.style.display = "none";}
    else{
       
        addB.style.display = "block";
    }
    

}
function addProductForm(e){
    e.preventDefault()//prevent the default local storage behaviour.
    const product = formToObject(e.target)
    const index = products.findIndex(p=>p.id==product.id)
    if(index==-1){
        product.id=Date.now()
        products.unshift(product)

    }
    else{
       product.id=product[index].id
        products[index]=product
    }
    localStorage.products = JSON.stringify(products)   
    switchForm()
    showProducts()
    productForm.reset()

}


//update product
function updateProduct(id){
    console.log(id);
    const index = products.findIndex(p => p.id ==id)
    switchForm()
    fillFrom(products[index])
    localStorage.products = JSON.stringify(products)
    showProducts()
}

function fillFrom(product){
    document.getElementById('title').value=product.title;
    document.getElementById('thumbnailUrl').value=product.image;
    document.getElementById('price').value=product.price;
    document.getElementById('rating').value=product.rating;
    document.getElementById('description').value=product.description;
    document.getElementById('stock').value=product.stock;
}

function showDetails(id){
    console.log(id);
    const prod = products.find(p=>p.id == id)
    console.log(prod);

    detailcontainer.classList.add('detailContainer')

    detailcontainer.innerHTML= displayDetail(prod);   
    
}
function displayDetail(product){
    console.log(product);

    return `
    <div class="productDetail">
                <div><h2>Product Details</h2></div>
                <div><h4>${product.title}</h4></div>
                <div><p><b>Selling Price:</b> ${product.price} QAR</p></div>

                ${product.stock!==0?
                    `<div><p><b>Total Amount Available:</b> ${product.stock}</p></div>` :
                    `<label class='red'><b>Total Amount Available:</b> Product is Sold Out</label>`
                }
                
                ${product.sold?
                    `<div><p><b>Total Amount Sold:</b> ${product.sold}</p></div>` :
                    `<label class='red'><b>Total Amount Sold:</b> None</label>`
                }

                ${product.sold?
                    `<div><p><b>Total Revenue:</b> ${parseInt(product.sold)*parseInt(product.price)} QAR</p></div>` :
                    `<label class='red'><b>Total Revenue: </b> None</label>`
                }                
                ${product.buyerList?
                    `<div><p class ='productBuyer'><b>Buyers:</b> ${product.buyerList.join(", ")}</p> </div>` :
                    `<label class='red'><b>Buyers: </b> No Buyers Yet</label>`
                }                
                
                
                <div> <input type="button" class ="closeButton" onClick= "switchView()" value="Close">   </div> 
               
    </div>
    `
}
function switchView(){
    detailcontainer.innerHTML=""
    detailcontainer.classList.remove('detailContainer')
}

