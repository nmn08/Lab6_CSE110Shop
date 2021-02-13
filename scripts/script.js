// Script.js

window.addEventListener('DOMContentLoaded', () => {
  // TODO
  if (localStorage.getItem("items") === null) {
    fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => saveData(data))
    .then(() => {
      loadData();
    })
  } else {
    loadData();
    updateCart();
  }
});

// Load data and add product item to the page
function loadData() {
  // console.log("Loading the data to the page");
  // console.log(window.localStorage.getItem('items'));
  // console.log(window.localStorage.getItem('cart'));
  var list = document.getElementById("product-list");
  var objects = JSON.parse(window.localStorage.getItem('items'));
  var cartData = JSON.parse(window.localStorage.getItem('cart'));
  objects.forEach(element => {
    var id = element["id"];
    var newItm = new ProductItem(element);
    newItm.setAttribute("id", "product-" + element["id"]);
    newItm.setAttribute("cart", cartData[id]);
    // console.log(id);
    // console.log(cartData[id]);
    // newItm.cart = cartData[id];
    list.appendChild(newItm);
    
  });
}

function printLocalData() {
  // console.log("Printing the data on the local storage");
  // console.log(window.localStorage.getItem('items'));
}
// Save data to the local storage the first time it fetch
function saveData(data) {
  // console.log("Saving the data to local storage");
  // Saving data
  window.localStorage.setItem('items', JSON.stringify(data));
  // Initialize cart
  var cartData = {};
  data.forEach(element => {
    cartData[element["id"]] = 0;
  });
  window.localStorage.setItem('cart', JSON.stringify(cartData));
}

// Add 1 item with the id to cart
function addToCart(id) {
  // console.log("Adding 1 more to cart");
  var cartData = JSON.parse(window.localStorage.getItem('cart'));
  cartData[id] += 1;
  window.localStorage.setItem('cart', JSON.stringify(cartData));
  var div = document.getElementById("product-" + id);
  updateCart();
  div.cart = cartData[id];
}
// Remove 1 item with the id from cart
function removeFromCart(id) {
  // console.log("Removing 1 more from cart");
  var cartData = JSON.parse(window.localStorage.getItem('cart'));
  cartData[id] -= 1;
  window.localStorage.setItem('cart', JSON.stringify(cartData));
  var div = document.getElementById("product-" + id);
  updateCart();
  div.cart = cartData[id];
}
// Update number of item in cart
function updateCart() {
  var totalCart = 0;
  var cartData = JSON.parse(window.localStorage.getItem('cart'));
  for (var id in cartData) {
    totalCart += cartData[id];
  }
  // console.log(cartData);
  document.getElementById("cart-count").textContent = totalCart;
}