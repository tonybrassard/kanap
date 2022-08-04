const host = "http://localhost:3000/";
const getUrl = host + "api/products/";
var productSection = document.getElementById("items");

/**
 * Fonction qui récupere tout les produits et qui les affiche dans le DOM
 * @return { HTMLElement }
 */
let cardsFetch = function () {
  fetch(getUrl)
    .then((response) => response.json())
    .then((data) => {
      for (i = 0; i < data.length; i++) {
        const productCard = `
          <a href="./product.html?id=${data[i]._id}">
            <article>
              <img
                src="${data[i].imageUrl}"
                alt="${data[i].altTxt}"
              />
              <h3 class="productName">${data[i].name}</h3>
              <p class="productDescription">
                ${data[i].description}
              </p>
            </article>
          </a>
        `;
        productSection.innerHTML += productCard;
      }
    })
    .catch((error) => {
      console.log(error)
      let errorMessage = '<p>Une erreur est survenue lors de la récupération des produits.<br> Veuillez réesseyer</p>'
      productSection.innerHTML = errorMessage

    });
    ;
};

cardsFetch();