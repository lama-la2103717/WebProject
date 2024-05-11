
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
const cancelB=document.querySelector('#cancel')


const addB=document.querySelector('.addButton')
const productForm=document.querySelector('.ProductForm')


const saleSummary=document.querySelector('.record')
const saleHistory=document.querySelector('.history')



const detailcontainer = document.querySelector('.detailContainer')
detailcontainer.classList.remove('detailContainer')



cancelB.addEventListener('click',switchForm)
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
    const datum = await fetch(`/api/products`)
    let products=  await datum.json();
    // if(!localStorage.products){


    //     const data = await fetch('/json/products.json')
    //     products = await data.json()
    // }
    // else
    //     products=JSON.parse(localStorage.products)
    // products=JSON.parse(localStorage.products)
    const data = await fetch(`/api/products/${brandName}`)
    let filteredProducts=  await data.json();
    console.log(filteredProducts);
    brandName

    const purchases = await fetch(`/api/products/${brandName}/history`)
    let purch = await purchases.json();
    console.log(purch);


    //search for a specific product by title 
    const searchB = document.querySelector('#search');
    searchB.addEventListener('input', () => {
    const searched = filteredProducts.filter(p => {
        const title = p.title.toLowerCase().includes(searchB.value.toLowerCase());
        return title;
    });

    productContainer.innerHTML = displayProducts(searched);
});
    if(purch){
    const summaryList = await displaySummary(purch)
    saleSummary.innerHTML=summaryList

    const historyList = await displayHistory(purch)
    saleHistory.innerHTML=historyList
}
    else{
        saleSummary.innerHTML=`<p class='noSold'>No Products Sold Yet...</p>`
        saleHistory.innerHTML=`<p class='noSold'>No History Recorded...</p>`
    }
    const productList= displayProducts(filteredProducts)
    productContainer.innerHTML =productList
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
                <a href="#" ><button class="updateButton" onclick="updateProduct('${product.id}')">Update</button></a>
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
async function addProductForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target)
    const product = Object.fromEntries(formData)
    

    // const product = formToObject(e.target);
    product.brand = brandName;
    const index = products.findIndex(p => p.title === product.title);
    if (index == -1) {
        console.log("thuWDhqoa"+product);

        const response = await fetch('/api/products',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        }
    )
    } else {            
        product.id = products[index].id; 

        const response = await fetch(`/api/product/${product.id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(product)
                }
            )
    }
    //update products.
    switchForm();
    showProducts();
    productForm.reset();
}



//update product
async function updateProduct(id){
    console.log(id);
    const data = await fetch(`/api/product/${id}`)
    let prod=  await data.json();
    console.log(prod);
    switchForm()
    fillFrom(prod)
    showProducts()
}

function fillFrom(product){
    document.getElementById('id').value=product.id;
    document.getElementById('title').value=product.title;
    document.getElementById('image').value=product.image;
    document.getElementById('price').value=product.price;
    document.getElementById('rating').value=product.rating;
    document.getElementById('description').value=product.description;
    document.getElementById('stock').value=product.stock;
}

async function showDetails(id){
    const datum = await fetch(`/api/product/${id}`)
    let prod=  await datum.json();
    
    console.log(id)
    console.log(prod)
    detailcontainer.classList.add('detailContainer')

    detailcontainer.innerHTML= displayDetail(prod);   
    
}
function displayDetail(product){
    console.log(product);
    
    const intSold = product.prodPurchases.map(p=>p.quantity)
    const sold = intSold.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    console.log(`sol ${sold}`);

    const intRev =  product.prodPurchases.map(p=>p.quantity*p.price)
    const revenue = intRev.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    console.log(`rev ${revenue}`);

    const ids =  product.prodPurchases.map(p=>p.userId)



    return `
    <div class="productDetail">
                <div><h2>Product Details</h2></div>
                <div><h4>${product.title}</h4></div>
                <div><p><b>Selling Price:</b> ${product.price} QAR</p></div>

                ${product.stock!==0?
                    `<div><p><b>Total Amount Available:</b> ${product.stock}</p></div>` :
                    `<label class='red'><b>Total Amount Available:</b> Product is Sold Out</label>`
                }
                
                ${product.prodPurchases.length !==0?
                    `<div><p><b>Total Amount Sold:</b> ${sold}</p></div>` :
                    `<label class='red'><b>Total Amount Sold:</b> None</label>`
                }

                ${product.prodPurchases.length !==0?
                    `<div><p><b>Total Revenue:</b> ${revenue} QAR</p></div>` :
                    `<label class='red'><b>Total Revenue: </b> None</label>`
                }                
                ${product.prodPurchases.length !==0?
                    `<div><p class ='productBuyer'><b>Buyers:</b> ${[...new Set(ids)].join(" - ")}</p> </div>` :
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


async function displaySummary(data){    


    //buyers
    const buyers = data.map(d =>d.userId)
    console.log(data);

    const unqBuyers=[...new Set(buyers)]
    console.log(`un ${unqBuyers}`);


    //total sold
    const prodCount = data.reduce((counts, purchase) => {
        counts[purchase.productId] = (counts[purchase.productId] || 0) + 1;
        return counts;
      }, {});
     
      let mostOrderedBrand = "";
      let maxOrders = 0;
      for (const brand in prodCount) {
        if (prodCount[brand] > maxOrders) {
          mostOrderedBrand = brand;
          maxOrders = prodCount[brand];
        }
      }

    const intSold = data.map(p=>p.quantity)
    const sold = intSold.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    console.log(`sol ${mostOrderedBrand}`);

    //
    const prodRev = data.reduce((rev, purchase) => {
        rev[purchase.productId] = (rev[purchase.productId] || 0) + purchase.price*purchase.quantity;
        return rev;
      }, {});
     
      let mostRevBrand = "";
      let maxRev = 0;
      for (const revs in prodRev) {
        if (prodRev[revs] > maxRev) {
            mostRevBrand = revs;
            maxRev = prodRev[revs];
        }
      }


    //total revnue
    const intRev = data.map(p=>p.quantity*p.price)
    const revenue = intRev.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    console.log(`rev ${revenue}`);


    //most Sold
    const highestSold=Math.max(...intSold);
    const mostSold= data.find(p=>p.quantity==highestSold)
    console.log(`ttt ${mostSold.id}`);




    //most rev
    const highestRev=Math.max(...intRev);
    const mostRev= data.find(p=>p.quantity*p.price==highestRev)
    console.log(`ttt ${mostRev}`);



    const history = 
    `
    <table class="table">

    <tr>
    <th> Total Items Sold</th>
    <td>${sold}</td>
    </tr>

    
    <tr>
    <th>Total Revenue</th>
    <td>${revenue} QAR</td>
    </tr>

    <tr>
    <th> Most Sold Product</th>
    <td>${mostOrderedBrand}</td>
    </tr>


    <tr>
    <th> Product with Most Revenue</th>
    <td>${mostRevBrand}</td>
    </tr>


    <tr>
    <th> Buyers Usernames</th>
    <td>${unqBuyers.join(" - ")}</td>
    </tr>



    </table>
    `

    
    return history;


}

function displayHistory(product){

    // const purchased= product.filter(p=>p.buyerList)
    // console.log(purchased);


    const historyList=product.map(p=>
        `
        <div class='historyCard'>
            <div><img src="${p.Product.image}" alt="${p.Product.title}"></div>
            <div class="hdet">
                <p><b>Date: </b>${p.datePurchased}</p>
                <p><b>Customer: </b>${p.User.userId}</p>
                <p><b>Product Title:</b>${p.Product.title}</p>
                <p><b>Price: </b>${p.price}</p>
                <p><b>Quantity: </b>${p.quantity}</p>
                <p><b>Cost: </b>${p.quantity * p.price} QAR</p>
            </div>    



        </div>  
        `).join(' ')

        return historyList;



}

