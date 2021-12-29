const params = new URLSearchParams(document.location.search);
const id = params.get("_id");
const colorPicked = document. querySelector("#colors");
const quantityPicked = document.querySelector("#quantity");
const button_sendToCart = document.querySelector("#addToCart");
let product = null;




fetch ("http://localhost:3000/api/products")
.then((res) => res.json())
.then((objetProduits) => {
product = objetProduits.find(element => element._id == id);
getProducts();
console.log(product, objetProduits);
});


function getProducts() {
  let imageAlt = document.querySelector("article div.item__img");
  let titre = document.querySelector("#title");
  let prix = document.querySelector("#price");
  let description = document.querySelector("#description");
  let couleurOption = document.querySelector("#colors");
  
 
    imageAlt.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
    titre.textContent = `${product.name}`;
    prix.textContent = `${product.price}`;
    description.textContent = `${product.description}`;

    for (let couleur of product.colors) {
        couleurOption.innerHTML += `<option value="${couleur}">${couleur}</option>`;
      }
    
 
console.log("affichage effectué");
}



function addToCart(produit){
    const btn_envoyerPanier = document.querySelector("#addToCart");

    button_sendToCart.addEventListener("click", function(e){
        if (quantityPicked.value > 0 && quantityPicked.value <=100 && quantityPicked.value != 0){

        let choixQuantite = quantityPicked.value;
        let choixCouleur = colorPicked.value;

        let optionsProduit = {
            idProduit: produit._id,
            couleurProduit: choixCouleur,
            quantiteProduit: Number(choixQuantite),
            nomProduit: produit.name,
            prixProduit: produit.price,
            descriptionProduit: produit.description,
            imgProduit: produit.imageUrl,
            altImgProduit: produit.altTxt
        };
        
        let productInLocalStorage = JSON.parse(localStorage.getItem('products'));

        const popup =() =>{
            if(window.confirm(`Votre commande de ${choixQuantite} ${produit.name} ${choixCouleur} est ajoutée au panier
    Pour consulter votre panier, cliquez sur OK`)){
                window.location.href ="cart.html";
            }
        }

        if (productInLocalStorage) {
            const findResult = productInLocalStorage.find(
                (element) => element.idProduit === produit._id && element.couleurProduit === choixCouleur)

                if (findResult) {
                    let newQuantite =
                    parseInt(optionsProduit.quantiteProduit) + parseInt(findResult.quantiteProduit);
                    findResult.quantiteProduit = newQuantite;
                    localStorage.setItem("products", JSON.stringify(productInLocalStorage));
                    console.table(productInLocalStorage);
                    popup();

                } else {
                    productInLocalStorage.push(optionsProduit);
                    localStorage.setItem("products", JSON.stringify(productInLocalStorage));
                    console.table(productInLocalStorage);
                    popup();
                }
        
            } else {
                productInLocalStorage =[];
                productInLocalStorage.push(optionsProduit);
                localStorage.setItem("products", JSON.stringify(productInLocalStorage));
                console.table(productInLocalStorage);
                popup();
            }}
            });
        }


