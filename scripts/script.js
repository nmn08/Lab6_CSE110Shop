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
  }
});


function loadData() {
  console.log("Loading the data to the page");
  // console.log(window.localStorage.getItem('items'));
  let list = document.getElementById("product-list");
  var objects = JSON.parse(window.localStorage.getItem('items'));
  objects.forEach(element => {
    let newItm = new ProductItem(element);
    list.appendChild(newItm);
    newItm.setAttribute("product-id", element["id"]);
  });
}

function printLocalData() {
  console.log("Printing the data on the local storage");
  // console.log(window.localStorage.getItem('items'));
}

function saveData(data) {
  window.localStorage.setItem('items', JSON.stringify(data));
  console.log("Saving the data to local storage");
  
}

function addToCart(id) {
  console.log(id);
  console.log(this.parentNode);
}