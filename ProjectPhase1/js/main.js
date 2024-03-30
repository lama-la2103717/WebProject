const url = '/json/products.json';

// Queries
const topRating = document.querySelector(".topRated");
const main = document.querySelector(".main");
const searchInput = document.querySelector(".searchInput");
const search = document.querySelector(".search");
const hidden = document.querySelector(".menu-icon");
const hdr = document.querySelector(".header");
const loginA = document.querySelector(".login");
const ulNav = document.querySelector(".mainNavUl");
main.classList.remove("newDiv");
hdr.classList.remove("hiddenHdr");


document.addEventListener('DOMContentLoaded', function () {
    searchInput.addEventListener('change', searchForProduct);
    const defaultHTML = main.innerHTML;
    const defaultUl= ulNav.innerHTML;
    const urlParams = new URLSearchParams(window.location.search);
    const userType = urlParams.get('type');
    const username = urlParams.get('username');
    const balance = urlParams.get('balance');
    const shipping_address =urlParams.get('shipping_address');
    const brand = urlParams.get('brand');
    
    const pageUrl = window.location.href.split("?");
    console.log(pageUrl);

    const brandUrl = window.location.href.split("brand=")[1];

    let products = [];
    changeNav();

    loadProducts().then((loadedProducts) => {
        products = loadedProducts;
        topRatings(products);

        const purchaseButtons = document.querySelectorAll('.topRated .purchase');
        purchaseButtons.forEach(button => {
            button.addEventListener('click', function () {
                console.log('Purchase button clicked');
                if (userType) {
                    const uType=userType.split('?')[0]
                    console.log(pageUrl[5]);

                    if (uType=='customer') {
                        const userUrl = decodeURIComponent(pageUrl[2].split("=")[1]);//3
                        const balanceUrl = decodeURIComponent(pageUrl[3].split("=")[1]);
                        const addressUrl = decodeURIComponent(pageUrl[4].split("=")[1]);//
                        const productTitle = this.parentNode.querySelector('.product-title').textContent;
                        const purchaseUrl = `purchase.html?brand=${brandUrl}?productTitle=${productTitle}?type=customer?username=${userUrl}?balance=${balanceUrl}?shippingAddress=${addressUrl}`;
                        console.log('Username:', username);

                   window.location.href = purchaseUrl;}
                   else {
                    alert('You should be logged in as a customer to make a purchase.');
                }
                } else {
                    alert('You should be logged in as a customer to make a purchase.');
                }
            });
        });

    });

    async function loadProducts() {
        try {
            if (!localStorage.products) {
                const response = await fetch(url);
                const data = await response.json();
                localStorage.setItem("products", JSON.stringify(data));
                console.log("Data fetched and stored in local storage:", data);
                return data;
            } else {
                return JSON.parse(localStorage.getItem("products"));
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    function changeNav() {
        if (userType) {
            const uType=userType.split('?')[0]

            const newLi = ulNav.appendChild(document.createElement("li").appendChild(document.createElement("a")));
            newLi.innerHTML = "Log Out";
            newLi.classList.add("logOut");
            newLi.addEventListener("click", logOut);


            if (uType == "customer") {
                console.log("Customer");
                loginA.innerHTML = "View History";
                loginA.addEventListener('click', function (event) {
                    const userUrl = decodeURIComponent(pageUrl[2].split("=")[1]);//3
                        const balanceUrl = decodeURIComponent(pageUrl[3].split("=")[1]);
                        const addressUrl = decodeURIComponent(pageUrl[4].split("=")[1]);//
                    event.preventDefault();
                    window.location.href = `purchaseHistory.html?username=${userUrl}?balance=${balanceUrl}?shippingAddress=${addressUrl}`;
                });
            } 
            else if (uType=='null') {
                const logout = document.querySelector(".logOut");
                logout.remove();
                window.location.href = pageUrl[0];
            }
            else{
                loginA.innerHTML = "View Sales";
                // console.log(brandUrl);

                loginA.addEventListener('click', (e)=>{
                    e.preventDefault();
                    console.log(brandUrl);
                    window.location.href= `sales.html?brand=${brandUrl}`
        
        
                })
            }
        }
    }
 


    const shopB = document.querySelectorAll('.card #button');
    shopB.forEach(button => {
        button.addEventListener('click', function () {
                const brandName = this.parentNode.querySelector('p').textContent;
                if(pageUrl.length>3){
                        console.log(pageUrl);
                        const userUrl = decodeURIComponent(pageUrl[2].split("=")[1]);//3
                        const balanceUrl = decodeURIComponent(pageUrl[3].split("=")[1]);
                        const addressUrl = decodeURIComponent(pageUrl[4].split("=")[1]);//
                        if(userType){
                            const uType=userType.split('?')[0]
                            if (uType === 'customer')
                               window.location.href = `brand.html?brand=${brandName}?type=customer?username=${userUrl}?shippingAddress=${addressUrl}?balance=${balanceUrl}`;
                           
        
                        }
                        else{
                            window.location.href = `brand.html?brand=${brandName}?type=${userType}?username=${userUrl}?shippingAddress=${addressUrl}?balance=${balanceUrl}`
                        }
                }
                else{
                if(userType){
                    const uType=userType.split('?')[0]
                    if (uType === 'customer')
                    window.location.href = `brand.html?brand=${brandName}?type=customer?username=${username}?shippingAddress=${shipping_address}?balance=${balance}`;
                    else
                    alert('Logged as seller, Cannot Shop');

                }
                else{
                    window.location.href = `brand.html?brand=${brandName}?type=${userType}?username=${username}?shippingAddress=${shipping_address}?balance=${balance}`
                }}
        });
    });

    function logOut() {
        const logout = document.querySelector(".logOut");
        logout.remove();
        window.location.href = pageUrl[0];
    }

    function topRatings(products) {
        products.forEach(product => {
            const ratingParts = product.rating.split('/');
            product.rating = parseFloat(ratingParts[0]);
        });
        products.sort((a, b) => b.rating - a.rating);
        displayTopProducts(products.slice(0, 8));
    }

    function displayTopProducts(products) {
        const productsHTML = products.map(product => productToHTML(product)).join('');
        topRating.innerHTML = productsHTML;
    }

    function productToHTML(product) {
     
        const ratingValue = parseFloat(product.rating);
        const fullStars = '\u2605'.repeat(Math.floor(ratingValue));
        let halfStar = '';
        if (ratingValue % 1 !== 0) {
            halfStar = '\u00BD'; // Unicode for half star
        }

        // Make price bold
        const boldPrice = `<h3>${product.price}</h3>`;

        return `
            <div class="product  card">
                <div class="productInfo">
                    <img src="${product.image}" alt="" />
                    <h3 class="product-title">${product.title}</h3>
                    <p class="rating">${fullStars}<span class="half-star">${halfStar}</span></p>
                    <p class="product-price">${boldPrice}</p>
                    ${product.stock!==0?
                        `<button type="button" class="purchase" data-title="${product.title}" >Purchase</button> ` :
                        `<label class='red'>Out of Stock</label>`
                    }
                </div>
            </div>`;
    }

    function searchForProduct() {
        const val = searchInput.value;
        main.classList.add("newDiv");

        if (val && val !== " ") {
            filtered = products.filter(p =>
                p.title.toLowerCase().match(val.toLowerCase()) ||
                p.brand.toString().toLowerCase().match(val.toLowerCase())
            );
            hdr.classList.add("hiddenHdr");

            ulNav.innerHTML=''
            if (filtered.length == 0) {
                console.log("no");
                main.innerHTML = `<h1> No Product Found</h1>`;
            } else {
                const productsHTML = filtered.map(product => productToHTML(product)).join('');
                hidden.classList.add("hidden");

                main.innerHTML = productsHTML;
            }
        } else if (!val || val == " ") {
            hidden.classList.remove("hidden");
            hdr.classList.remove("hiddenHdr");
            main.classList.remove("newDiv");
            ulNav.innerHTML=defaultUl
            main.innerHTML = defaultHTML;
        }
    }
});
let slideIndex = 0;
showSlides();

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
  
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
  
    slides[slideIndex-1].style.display = "block";  
  
    setTimeout(showSlides, 2000); // Change image every 2 seconds
  }
function goToPage() {
    window.location.href = "brand.html";
}