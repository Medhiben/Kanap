const params = new URLSearchParams(document.location.search);
const id = params.get("_id");

fetch ("http://localhost:3000/api/products")
.then((res) => res.json())
.then((objetProduits) => {
const product = objetProduits.find(element => element._id == id);
console.log(product);
})




