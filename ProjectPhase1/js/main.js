const url = '/json/products.json';

//queries
const topRating = document.querySelector(".topRated");
const main=document.querySelector(".main")
const searchInput = document.querySelector(".searchInput")
const hidden = document.querySelector(".menu-icon")
main.classList.remove("newDiv")









document.addEventListener('DOMContentLoaded', function () {
  searchInput.addEventListener('change', searchForProduct)
  const shopB = document.querySelectorAll('.card #button');
  const defaultHTML = main.innerHTML




  let products = [];
  loadProducts().then((loadedProducts) => {
    products = loadedProducts;
    topRatings(products);
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
  //On click on SHOP Now button
    shopB.forEach(button => {
        button.addEventListener('click', function() {
            const brandName = this.parentNode.querySelector('p').textContent;
            window.location.href = `brand.html?brand=${encodeURIComponent(brandName)}`;
        });
    });

  function topRatings(products) {
    products.forEach(product => {
      const ratingParts = product.rating.split('/');
      product.rating = parseFloat(ratingParts[0]);
    });
    products.sort((a, b) => b.rating - a.rating)
    displayTopProducts(products.slice(0, 8));
  }

  function displayTopProducts(products) {
    const productsHTML = products.map(product => productToHTML(product)).join('');
    topRating.innerHTML = productsHTML;
  }


function productToHTML(product) {
    // Convert rating to filled stars
    const ratingValue = parseFloat(product.rating);
    const fullStars = '\u2605'.repeat(Math.floor(ratingValue));
    let halfStar = '';
    if (ratingValue % 1 !== 0) {
      halfStar = '\u00BD'; // Unicode for half star
    }
  
    // Make price bold
    const boldPrice = `<h3>${product.price}</h3>`;
  
    return `
      <div class="product  card" >
        <div class="productInfo">
          <img src="${product.image}" alt="" />
          <h3 class="product-title">${product.title}</h3>
  
          <p class="rating">${fullStars}<span class="half-star">${halfStar}</span></p>
          <p class="product-price">${boldPrice}</p>
          <button type="button" class="purchase">Purchase</button>
        </div>
      </div>`;
  }
  function searchForProduct(){
    const val = searchInput.value
    main.classList.add("newDiv")


    if(val && val!==" "){
      // const newDiv =document.createElement("div");
      console.log("new dix");


    
     filtered = products.filter(p=>
        p.title.toLowerCase().match(val.toLowerCase()) ||
            p.brand.toString().toLowerCase().match(val.toLowerCase())
            )
      if(filtered.length==0){
        console.log("no");
        main.innerHTML=`<h1> No Product Found</h1>`;
      }
      else{
        const productsHTML = filtered.map(product => productToHTML(product)).join('');
        hidden.classList.add("hidden");
        main.innerHTML=productsHTML}
      }
            

    else if(!val || val == " "){
      hidden.classList.remove("hidden");
      main.classList.remove("newDiv")


      console.log(defaultHTML);

      main.innerHTML=defaultHTML

    }


  }
  
  
});


let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}

function goToPage(){
  window.location.href = "brand.html";
}



