////////
// RECUPERER L'ID DU PRODUIT 
////////
const str = window.location;
const url = new URL(str);
const id = url.searchParams.get("id");
const host = "http://localhost:3000/";
const objectURL = host + "api/products/" + id;

/////////
// Fetching data du backend et l'afficher dans le DOM
/////////
let cardsFetch = function () {
  fetch(objectURL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
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
    });
};
cardsFetch();

////////
//Getting HTML values from HTML
/////////
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

// HTML element : button add to cart
const toCartBtn = document.getElementById("addToCart");
const goToCartButton = document.getElementById("goToCart");
goToCartButton.style.display = "none";
// at button press : toCartBtn, function addCart that activates the 2 other function by click
toCartBtn.addEventListener("click", () => {
  let qty = parseInt(qtyValue());
  let color = colorValue();
  add2Cart(id, color, qty);
  goToCartButton.style.display = "block";
});
goToCartButton.addEventListener("click", () => {
  window.location.href = "./cart.html";
});
