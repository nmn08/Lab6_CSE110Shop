// product-item.js

class ProductItem extends HTMLElement {
  // TODO
  constructor(obj) {

    const template = document.createElement('template');
    template.innerHTML = `
    <style>
      .price {
        color: green;
        font-size: 1.8em;
        font-weight: bold;
        margin: 0;
      }

      .product {
        align-items: center;
        background-color: white;
        border-radius: 5px;
        display: grid;
        grid-template-areas: 
        'image'
        'title'
        'price'
        'add';
        grid-template-rows: 67% 11% 11% 11%;
        height: 450px;
        filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
        margin: 0 30px 30px 0;
        padding: 10px 20px;
        width: 200px;
      }

      .product > button {
        background-color: rgb(255, 208, 0);
        border: none;
        border-radius: 5px;
        color: black;
        justify-self: center;
        max-height: 35px;
        padding: 8px 20px;
        transition: 0.1s ease all;
      }

      .product > button:hover {
        background-color: rgb(255, 166, 0);
        cursor: pointer;
        transition: 0.1s ease all;
      }

      .product > img {
        align-self: center;
        justify-self: center;
        width: 100%;
      }

      .title {
        font-size: 1.1em;
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .title:hover {
        font-size: 1.1em;
        margin: 0;
        white-space: wrap;
        overflow: auto;
        text-overflow: unset;
      }
    </style>`;

    super();
    
    this.root = this.attachShadow({ mode: 'open' });
    this.root.appendChild(template.content.cloneNode(true));

    // console.log(obj);
    // console.log(obj["title"]);

    let shadow = this.shadowRoot;

    let wrapper = document.createElement('li');
    wrapper.setAttribute('class', 'product');
    let img = document.createElement('img');
    img.setAttribute('src', obj["image"]);
    img.setAttribute('alt', obj["title"]);
    img.setAttribute('width', 200);

    let title = document.createElement('p');
    title.setAttribute('class', "title");
    title.textContent = obj["title"];

    let price = document.createElement('p');
    price.setAttribute('class', "price");
    price.textContent = obj["price"];

    let btn = document.createElement('button');
    btn.setAttribute('onclick', `alert('Added to Cart!')`);
    btn.textContent = "Add to cart";
    shadow.appendChild(wrapper);
    wrapper.appendChild(img);
    wrapper.appendChild(title);
    wrapper.appendChild(price);
    wrapper.appendChild(btn);
    // console.log(shadow);
  }
  
  attributeChangedCallback(attrName, oldVal, newVal) {
    // console.log("Enter Here");
    // console.log(newVal);
    // console.log(JSON.parse(newVal));
    // console.log(newVal["image"]);
    
    let shadow = this.shadowRoot;
    let wrapper = document.createElement('li');
    wrapper.setAttribute('class', 'product');

    let obj = JSON.parse(newVal);
    // console.log(this.outerHTML);
    // console.log(obj);
    // console.log(obj["image"]);
    let img = document.createElement('img');
    img.setAttribute('src', obj["image"]);
    img.setAttribute('alt', obj["title"]);
    img.setAttribute('width', 200);

    let title = document.createElement('p');
    title.setAttribute('class', "title");
    title.textContent = obj["title"];

    let price = document.createElement('p');
    price.setAttribute('class', "price");
    title.textContent = obj["price"];

    let btn = document.createElement('button');
    btn.setAttribute('onclick', `addToCart(` + str(obj["id"]) + `)`);
    btn.textContent = "Add to cart";
    shadow.appendChild(wrapper);
    wrapper.appendChild(img);
    wrapper.appendChild(title);
    wrapper.appendChild(price);
    wrapper.appendChild(btn);
    console.log(shadow);
  }

  // static get observedAttributes() {
  //     return ['item'];
  // }
  
  // get item() {
  //   return this.getAttribute('item');
  // }

  // set item(newObj) {
  //   // console.log("Setting");
  //   // console.log(newObj);
  //   // console.log(JSON.stringify(newObj));
  //   this.setAttribute('item', newObj);
  // }
  
  // connectedCallback() {
  // }
}

customElements.define('product-item', ProductItem);