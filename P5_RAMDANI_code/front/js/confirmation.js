const orderId = localStorage.getItem("orderId");
console.log(orderId)
let otherOrder = document.getElementById("orderId");

if (orderId) {

  const idNode = document.getElementById("orderId");
  idNode.innerText = localStorage.getItem("orderId");
  console.log(localStorage.getItem("orderId"));
  localStorage.removeItem('orderId');

} else {
  document.querySelector(".confirmation p").innerHTML = "Commande incorrecte"
}

otherOrder.addEventListener("click", (e) => {
  e.preventDefault()
});