const orderId = localStorage.getItem("orderId");
console.log(orderId)
if (orderId) {
  const idNode = document.getElementById("orderId");
  idNode.innerText = localStorage.getItem("orderId");
  console.log(localStorage.getItem("orderId"));
  localStorage.clear();

} else {
  document.querySelector(".confirmation p").innerHTML = "Commande incorrecte"
}