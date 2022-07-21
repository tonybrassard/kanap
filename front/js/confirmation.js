// recover the ID from URL to the order information section
const str = window.location;
const url = new URL(str);
const id = url.searchParams.get("id");
const orderId = document.getElementById("orderId");
orderId.innerHTML = id;