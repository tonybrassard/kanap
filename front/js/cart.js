//    ELEMENTS CONCERNANTS LE PANIER     //


/**
 * Récupére le panier a partir du localstorage
 * @return { JSON data }
 */
function getCart() {
  let items = [];
  if (localStorage.getItem("panier") != null) {
    items = JSON.parse(localStorage.getItem("panier"));
  }
  return items;
}


/**
 * Ajoute le canapé selectionné au localstorage, en fonction de sa presence ou non dans le localstorage
 * @param { Number } productId l'idée du produit à ajouter
 * @param { Number } color la valeur de la couleur
 * @param { Number } qty la quantité à ajouter
 * @return { JSON data }
 */
function add2Cart(productId, color, qty) {
  if (qty <= 0 || color == "") {
    return;
  }
  let items = getCart();
  if (items.length == 0) {
    items = [[productId, color, qty]];
  } else {
    let found = false;
    for (let i = 0; i < items.length; i++) {
      if (productId === items[i][0] && color === items[i][1]) {
        found = true;
        items[i][2] += qty;
      }
    }
    if (found == false) {
      let item = [productId, color, qty];
      items.push(item);
    }
  }
  localStorage.setItem("panier", JSON.stringify(items));
}


/**
 * Fonction qui éfface un article du localstorage
 * @param { Number } productId l'idée du produit à ajouter
 * @param { Number } color la valeur de la couleur
 */
function deleteItem(id, color) {
  if (confirm("Confirmer la suppression ?") == true) {
    let items = getCart();
    for (i = 0; i < items.length; i++) {
      if (id === items[i][0] && color === items[i][1]) {
        items.splice(i, 1);
        localStorage.setItem("panier", JSON.stringify(items));
        if (items.length === 0) {
          localStorage.removeItem('panier');
        }
        window.location.reload();
      }
    }
  }

}


// function changeQuantity makes the localStorage quantity reflect whats the user chooses on the HTML page
/**
 * Cette fonction remet a jour la quantité de canapé demandée dans le localstorage en fonction de la quantité demandée dans la page HTML
 * @param { Number } productId l'idée du produit à ajouter
 * @param { Number } color la valeur de la couleur
 * @param { Number } qty la quantité à ajouter
 * @return { JSON data }
 */
function changeQuantity(id, color, qty) {
  if ((qty >= 1 && qty < 100)) {
    let items = getCart();
    for (let i = 0; i < items.length; i++) {
      if (id === items[i][0] && color === items[i][1]) {
        items[i][2] = qty;
      }
      localStorage.setItem("panier", JSON.stringify(items));
      reloadCart()
    }
  } else {
    window.location.reload();
  }
}


// elements concernant le formulaire //


const prenom = document.getElementById("firstName");
const nom = document.getElementById("lastName");
const ville = document.getElementById("city");
const adresse = document.getElementById("address");
const mail = document.getElementById("email");


/**
 * Vérification de la validité de l'email
 * @param { String } mail l'email du client
 * @return { Boolean }
 */
const emailErrorMsg = document.getElementById("emailErrorMsg");
function validateEmail(mail) {
  const regexMail =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regexMail.test(mail) == false) {
    return false;
  } else {
    emailErrorMsg.innerHTML = null;
    return true;
  }
}


// simple RegEx pour les noms, prenoms et ville : pas de chiffer accéptés
const regexName = /^[a-z][a-z '-.,]{1,31}$|^$/i;


/**
 * Vérification de la validité du prenom
 * @param { String } prenom le prénom du client
 * @return { Boolean }
 */
const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
function validateFirstName(prenom) {
  if (regexName.test(prenom) == false || prenom == '') {
    return false;
  } else {
    firstNameErrorMsg.innerHTML = null;
    return true;
  }
}


/**
 * Vérification de la validité du nom
 * @param { String } nom le nom du client
 * @return { Boolean }
 */
const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
function validateLastName(nom) {
  if (regexName.test(nom) == false || nom == '') {
    return false;
  } else {
    lastNameErrorMsg.innerHTML = null;
    return true;
  }
}

/**
 * Vérification de la validité de la ville
 * @param { String } ville la ville du client
 * @return { Boolean }
 */
const cityErrorMsg = document.getElementById("cityErrorMsg");
function validateCity(ville) {
  if (regexName.test(ville) == false || ville == '') {
    return false;
  } else {
    cityErrorMsg.innerHTML = null;
    return true;
  }
}


/**
 * Vérification de la validité de l'adresse
 * @param { String } adresse l'adresse du client
 * @return { Boolean }
 */
const addressErrorMsg = document.getElementById("addressErrorMsg");
function validateAddress(adresse) {
  if (adresse == '') {
    return false;
  } else {
    addressErrorMsg.innerHTML = null;
    return true;
  }
}

/**
 * Fonction qui gébére le JSON à poster
 * @return { JSON data }
 */
function makeJsonData() {
  let contact = {
    firstName: prenom.value,
    lastName: nom.value,
    address: adresse.value,
    city: ville.value,
    email: mail.value,
  };
  let items = getCart();
  let products = [];

  for (i = 0; i < items.length; i++) {
    if (products.find((e) => e == items[i][0])) {
    } else {
      products.push(items[i][0]);
    }
  }
  let jsonData = JSON.stringify({ contact, products });
  return jsonData;
}