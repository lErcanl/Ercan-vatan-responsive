//for mobile and tablet screens 1 element per slide.
function slider(responsive){
  if(responsive.matches){
    swipe(1,0,1);
}
// else: for bigger screens 3 elements per slide.
else{
  swipe(3,30,3);
} 
}
function swipe(slidesPerview,spaceBetween,slidesPerGroup){
new Swiper(".mySwiper", {

    slidesPerView: slidesPerview,
    spaceBetween: spaceBetween,
    slidesPerGroup: slidesPerGroup,
    loop: true,
    loopFillGroupWithBlank: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}

  //One Cıkan Urunler
  ajaxCall('relatedProducts.json','#related');

  //Cok Satanlar
  ajaxCall('bestSeller.json','#seller');

    //responsive slider
    var responsive = window.matchMedia("(max-width: 767px)")
    slider(responsive); // Call listener function at run time
    responsive.addListener(slider); // Attach listener function on state changes
    
  
  //click event shopping
  var clicks;
  if(localStorage.getItem("counter")){
    document.getElementById("clicks").innerHTML =localStorage.getItem("counter");

    clicks=parseInt(localStorage.getItem("counter"))
  }
  else{
    clicks=0;
  }
  function onClick() {
    clicks += 1;
    localStorage.setItem("counter", clicks);
    document.getElementById("clicks").innerHTML =localStorage.getItem("counter");
  };




function ajaxCall(fetching,id){

  var relatedShipping;
  var text;
  fetch(fetching)
  .then(response => response.json())
  .then(data=>{
    console.log(data);

    const html = data.map(product=>{
      relatedShipping=product.samedayshipping;
      if  (relatedShipping) {
         text="BUGUN KARGODA";
      }   

      else{
        text="BUGUN KARGOYA VERILEMEZ"
      }
      return ` 
              <div class="product">
              <a href="${product.dest_url}">
              <img src="${product.img}">
              </a>
              <div class="product__container">
              <div class="product__img">
              <img src="./images/star.png" width="20">
              
              <p class="ml-5">${product.rating}</p>
              </div>

              <p class="product__comment" >(${product.comment} Yorum)</p>
              </div>
              <p class="product__code">${product.code}</p>

              <p class="product__title">${product.title}</p>
              <p class="product__price"> ${product.price} ${product.cur}</p>
            
              <p class="product__cargo" id="shipping">${text}</p>
              <div class="basket__btn__container">
              
              <svg style="background-color:#1764c0;"xmlns="http://www.w3.org/2000/svg" width=33 fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
</svg>
            <button onClick="onClick()" class="basket__btn" type="button">Sepete Ekle</button>

              </div>
              </div>
            
             
`
          
    }).join('')
  
    
    document.querySelector(id).insertAdjacentHTML("afterbegin",html);

  })


}


// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

// Get the header
var header = document.querySelector(".header__container");

// Get the offset position of the navbar
var sticky = header.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}