

//queries
const topRating = document.querySelector("#topRating");

const url = 'json/products.json';
document.addEventListener('DOMContentLoaded', function () {
  const topRating = document.querySelector("#topRating");
  let products = [];
  loadProducts();

  

  async function loadProducts() {

  try {
    if (!localStorage.products) {
      const response = await fetch(url);
      products = await response.json();
      localStorage.setItem("products", JSON.stringify(products));
      console.log("Data fetched and stored in local storage:", products);
    } else {
      products = JSON.parse(localStorage.products);
    }
    // displayProducts(products);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  // function displayProducts(products) {
  //   const productsHTML = products.map(product => productToHTML(product)).join('');
  //   topRating.innerHTML = productsHTML;
  }
  
});



function productToHTML(product) {
  return `
    <div class="product" id="">
      <div class="product-info">
        <img src="${product.image}" alt="" />
        <h2 class="product-title">${product.title}</h2>
        <p class="product-price">${product.price}</p>
        <p class="product-description">${product.description}</p>
        <p class="rating">${product.rating}</p>
        <button type="button" class="purchase">Purchase</button>
      </div>
    </div>`;
}

// Call loadProducts to start fetching and displaying products




  



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

