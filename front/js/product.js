////////
// recover id product
////////
const str = window.location;
const url = new URL(str);
const id = url.searchParams.get("id");
const host = "http://localhost:3000/";
const objectURL = host + "api/products/" + id;
var section = document.querySelector(".item");

/////////
// Fetching one product backend data and display to DOM
/////////
let cardsFetch = function () {
  fetch(objectURL)
    .then((response) => response.json())
    .then((data) => {
      let img = document.querySelector(".item__img");
      img.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
      let name = document.getElementById("title");
      name.innerHTML = data.name;
      let title = document.querySelector("title");
      title.innerHTML = data.name;
      let price = document.getElementById("price");
      price.innerHTML = `${data.price}`;
      let description = document.getElementById("description");
      description.innerHTML = data.description;
      let color = document.getElementById("colors");
      for (i = 0; i < data.colors.length; i++) {
        color.innerHTML += `<option value="${data.colors[i]}">${data.colors[i]}</option>`;
      }
    }).catch((error) => {
      console.log(error)
      let errorMessage = "<p>Ce produit n'existe pas</p>"
      section.innerHTML = errorMessage
    })
    ;
};

cardsFetch();


// function that gets quantity value of the form in the markup
function qtyValue() {
  let qty = document.getElementById("quantity");
  return qty.value;
}

// function that get the kanap color value in the markup
function colorValue() {
  let color = document.getElementById("colors");
  return color.value;
}

// HTML element : button add to cart and button go to cart
const addCartBtn = document.getElementById("addToCart");
var goToCart = document.createElement("div")
goToCart.setAttribute("id", "goToCart");
goToCart.classList.add("item__content__addButton")
var itemContent = document.querySelector(".item__content");
itemContent.append(goToCart)

// at button press : display go to caty button and activate function add2Cart
addCartBtn.addEventListener("click", () => {
  let qty = parseInt(qtyValue());
  let color = colorValue();
  if (!(qty >= 1 && qty < 100) || (color == '')) {
    goToCart.innerHTML = '<p style="color:red;background-color:white;padding:10px;">Vous devez selectioner une couleur et une quantité valide.</p>'
    itemContent.append(goToCart)
  } else {
    document.getElementById("goToCart").innerHTML = '';
    let goToCart2 = document.getElementById("goToCart")
    goToCart2.innerHTML = '<button id="goToCart">Aller au panier</button>';
    goToCart2.innerHTML += '<p style="color:green;background-color:white;padding:10px;">Le(s) produit(s) a été ajouté avec succès.</p>'
    itemContent.append(goToCart2)
    add2Cart(id, color, qty);
    goToCart.style.flexDirection = "column";
    goToCart.style.AlignItems = "center";
    goToCart.parentNode.style.display = "flex";
  }

});

// at button press : redirection to cart.html
goToCart.addEventListener("click", () => {
  window.location.href = "./cart.html";
});