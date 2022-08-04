// elements HTML 
const cartSection = document.getElementById("cart__items");
const cartOrder = document.getElementsByClassName("cart__order");
const cartPrice = document.getElementsByClassName("cart__price");
const h1 = document.getElementsByTagName("h1");
const host = "http://localhost:3000/";


/**
 * Récupération des données du BACKEND pour remplir les propiétes des canapés dans la page cart.html
 * @return { HTMLElement }
 */
function fetchIdData() {
  let items = getCart();
  let qty = 0;
  let price = 0;
  if (localStorage.getItem("panier") != null) {
    for (let i = 0; i < items.length; i++) {
      let id = items[i][0];
      let color = items[i][1];
      let url = host + "api/products/" + id;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          cartSection.innerHTML += `<article class="cart__item" data-id="${id}" data-color="${color}">
                <div class="cart__item__img">
                  <img src="${data.imageUrl}" alt="${data.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__titlePrice">
                    <h2>${data.name}</h2>
                    <p>${color}</p>
                    <p>${data.price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" onchange="changeQuantity('${id}', '${color}', this.value)" min="1" max="100" value="${items[i][2]}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem" onclick="deleteItem('${id}','${color}')">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`;
          // prix total (if qty (items[i][2]))
          price += data.price * items[i][2];
          document.getElementById("totalPrice").innerHTML = price;
        });

      // quantité totale
      qty += parseInt(items[i][2]);
      document.getElementById("totalQuantity").innerHTML = qty;
    }
  } else {
    h1[0].innerHTML = `Votre panier est vide`;
    cartOrder[0].innerHTML = "";
    cartPrice[0].innerHTML = "";
  }
}
fetchIdData();


/**
 * Fonction qui rafraichie les données du panier à la suppression et au changement de quantité d'articles dans le panier
 * @return { HTMLElement }
 */
function reloadCart() {
  let items = getCart();
  let qty = 0;
  let price = 0;
  if (localStorage.getItem("panier") != null) {
    for (let i = 0; i < items.length; i++) {
      let id = items[i][0];
      let color = items[i][1];
      let url = host + "api/products/" + id;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          // prix total (if qty (items[i][2]))
          price += data.price * items[i][2];
          document.getElementById("totalPrice").innerHTML = price;
        });

      // quantité totale
      qty += parseInt(items[i][2]);
      document.getElementById("totalQuantity").innerHTML = qty;
    }
  } else {
    h1[0].innerHTML = `Votre panier est vide`;
    cartOrder[0].innerHTML = "";
    cartPrice[0].innerHTML = "";
  }
}


// Récupération et validation des donnés du formulaire "client" afin de valider l'achat
if (localStorage.getItem("panier") != null) {
  const postUrl = host + "api/products/order/";
  const orderButton = document.getElementById("order");
  orderButton.addEventListener("click", (e) => {
    e.preventDefault();

    // quelques vérifications avec des regex avant d'envoyer les  données du formulaire:
    let email = validateEmail(mail.value);
    let firstName = validateFirstName(prenom.value);
    let lastName = validateLastName(nom.value);
    let city = validateCity(ville.value);
    let address = validateAddress(adresse.value);
    if (
      email == false ||
      firstName == false ||
      lastName == false ||
      city == false ||
      address == false
    ) {
      if (email == false) {
        emailErrorMsg.innerHTML = "Entrez une adresse e-mail valide.";
      }
      if (firstName == false) {
        firstNameErrorMsg.innerHTML = "Entrez un prénom valide sans chiffre.";
      }
      if (lastName == false) {
        lastNameErrorMsg.innerHTML = "Entrez un nom valide sans chiffre.";
      }
      if (city == false) {
        cityErrorMsg.innerHTML = "Entrez une commune valide sans chiffre.";
      }
      if (address == false) {
        addressErrorMsg.innerHTML = "Entrez une adresse valide.";
      }
      return;
    }

    let jsonData = makeJsonData();
    

    // envoi des données du formulaire en POST et redirection vers la page de confirmation si tous ce passe bien
    fetch(postUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    })
      .then((res) => res.json())
      // on check le status res.ok 
      .then((data) => {
        localStorage.clear();
        let confirmationUrl = "./confirmation.html?id=" + data.orderId;
        window.location.href = confirmationUrl;
      })
      .catch(() => {
        alert("Une erreur est survenue, merci de revenir plus tard.");
      }); // on attrape ici les erreurs
  });
}