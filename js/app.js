// show cart

document.getElementById("cart-info").addEventListener("click", function() {
  const cart = document.getElementById("cart");
  cart.classList.toggle("show-cart");
});

//add itmes to the cart

document.querySelectorAll(".store-item-icon").forEach(function(btn) {
  btn.addEventListener("click", function(event) {
    // to ensure that if we click on icon then only event take place 
    if(event.target.parentElement.classList.contains("store-item-icon"))
    {
      let fullPath = event.target.parentElement.previousElementSibling.src ;
      // since "img" is a string of 3 charatcers, so we add 3 
      let pos = fullPath.indexOf('img') +3;
      // in partialPath we get the last path of the image 
      let partialPath = fullPath.slice(pos);
      
      const item = {};
      //to store the path of image(clicked) in image cart folder
      item.img = `img-cart${partialPath}`;
      //to get the item name. For ex- sweet item, cake item,etc.
      let name = event.target.parentElement.parentElement.nextElementSibling
                .children[0].children[0].textContent;
      item.name = name;
      //to get the price of the item
      let price = event.target.parentElement.parentElement.nextElementSibling
                .children[0].children[1].textContent;
      let finalPrice = price.slice( price.indexOf('$')+1 ).trim();
      item.price = finalPrice;
      
      //Now, make an item to be added into the cart
    const cartItem = document.createElement("div");
      cartItem.classList.add(
          "cart-item",
          "d-flex",
          "justify-content-between",
          "text-capitalize",
          "my-3");
      cartItem.innerHTML = `
            <img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="">
            <div class="item-text">
              <p id="cart-item-title" class="font-weight-bold mb-0">
                ${item.name}</p>
              <span>$</span>
              <span id="cart-item-price" class="cart-item-price mb-0">${item.price}</span>
            </div>
            <a href="#" id="cart-item-remove" class="cart-item-remove">
              <i class="fas fa-trash"></i>
            </a>
          </div>
          `;
      
      //select cart
      const cart = document.getElementById("cart");
      const  total = document.querySelector(".cart-total-container");

      cart.insertBefore(cartItem,total);
      alert("Item added to the cart");
      showTotalas();
    }
  });
});

//show totals
function showTotalas() {
  const total = [];
  const items = document.querySelectorAll(".cart-item-price");

  items.forEach(function(item){
    total.push(parseFloat(item.textContent));
  });
  
  const totalMoney = total.reduce(function(total, item){
    total += item;
    return total;
  },0);
  const finalMoney = totalMoney.toFixed(2);

  document.getElementById("cart-total").textContent = finalMoney;
  document.querySelector(".item-total").textContent = finalMoney;
  document.getElementById("item-count").textContent = total.length;

  console.log(finalMoney);
}


