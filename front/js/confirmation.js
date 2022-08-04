// recupére l' ID à partir de l'URL pour l'envoyer à la section "information concerant l'achat"
const str = window.location;
const url = new URL(str);
const id = url.searchParams.get("id");
const orderId = document.getElementById("orderId");
orderId.innerHTML = id;