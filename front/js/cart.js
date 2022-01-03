let productInLocalStorage = JSON.parse(localStorage.getItem('products'));
console.log(productInLocalStorage);
const emptyCartPosition = document.querySelector("#cart_item");

// Si le panier est vide
function getCart(){
    if (productInLocalStorage === null || productInLocalStorage == 0) {
        const emptyCart = `<p>Votre panier est vide</p>`;
        emptyCartPosition.innerHTML = emptyCart;
    } else {
        for (let produit of productInLocalStorage){
            let productArticle = document.createElement("article");
            document.querySelector("#cart__items").appendChild(productArticle);
            productArticle.className = "cart__item";
            productArticle.setAttribute('data-id', produit._id);

            let productDivImg = document.createElement("div");
            productArticle.appendChild(productDivImg);
            productDivImg.className = "cart__item__img";

            let productImg = document.createElement("img");
            productDivImg.appendChild(productImg);
            productImg.src = produit.imageUrl;
            productImg.alt = produit.altTxt;

            let productItemContent = document.createElement("div");
            productArticle.appendChild(productItemContent);
            productItemContent.className = "cart__item__content";

            let productItemContentDescription = document.createElement("div");
            productItemContent.appendChild(productItemContentDescription);
            productItemContentDescription.className = "cart__item__content__description";

            let productTitle = document.createElement("h2");
            productItemContentDescription.appendChild(productTitle);
            productTitle.innerHTML = produit.name;

            let productGreen = document.createElement("p");
            productTitle.appendChild(productGreen);
            productGreen.innerHTML = produit.couleurProduit;

            let productPrice = document.createElement("p");
            productTitle.appendChild(productPrice);
            productPrice.innerHTML = produit.price;

            let productItemSettings = document.createElement("div");
            productArticle.appendChild(productItemSettings);
            productItemSettings.className = "cart__item__content__settings";

            let productItemSettingsQuantity = document.createElement("div");
            productItemSettings.appendChild(productItemSettingsQuantity);
            productItemSettingsQuantity.className = "cart__item__content__settings__quantity";

           /* let productQte = document.createElement("p");
            productItemSettingsQuantity.appendChild(productQte);
            console.log(produit)
            productQte.innerHTML = produit.quantiteProduit; */

            let productInsertionQuantity = document.createElement("input");
            productItemSettingsQuantity.appendChild(productInsertionQuantity);
            productInsertionQuantity.className = "itemQuantity";
            productInsertionQuantity.value = produit.quantiteProduit;
            productInsertionQuantity.setAttribute("type", "number");
            productInsertionQuantity.setAttribute("name", "itemQuantity");
            productInsertionQuantity.setAttribute("min", "1");
            productInsertionQuantity.setAttribute("max", "100");

            let productItemContentSettingsDelete = document.createElement("div");
            productArticle.appendChild(productItemContentSettingsDelete);
            productItemContentSettingsDelete.className = "cart__item__content__settings__delete";

            let productItemDelete =document.createElement("p");
            productItemContentSettingsDelete.appendChild(productItemDelete);
            productItemDelete.className = "deleteItem";
            productItemDelete.innerHTML = "Supprimer";
      }
     }
    }
    getCart();

    function getTotals() {
    // Récupération du total des quantités
    let elementsQuantity = document.getElementsByClassName("itemQuantity");
    console.log(elementsQuantity);
    let quantityTotal = 0;

    for (let i = 0; i < elementsQuantity.length; ++i) {
        quantityTotal += elementsQuantity[i].valueAsNumber;
    }

    let productTotalQuantity = document.getElementById("totalQuantity");
    productTotalQuantity.innerHTML = quantityTotal;
    console.log(quantityTotal);

    // Récupération du prix total
    let priceTotal = 0;

    for (let i = 0; i < elementsQuantity.length; ++i) {
        priceTotal += (elementsQuantity[i].valueAsNumber * productInLocalStorage[i].price);
        console.log(productInLocalStorage);
    }

    let productTotalPrice = document.getElementById("totalPrice");
    productTotalPrice.innerHTML = priceTotal;
    console.log(priceTotal);

}
getTotals();

// Suppression d'un produit
function productDelete() {
    let buttonDelete = document.querySelectorAll(".deleteItem");
    
    for (let a = 0; a < buttonDelete.length; a++) {
        buttonDelete[a].addEventListener("click", (e) => {
            e.preventDefault();
        
            let idDelete = productInLocalStorage[a].idProduit;
            let colorDelete = productInLocalStorage[a].couleurProduit;


            productInLocalStorage = productInLocalStorage.filter( element => element.idProduit !== idDelete || element.couleurProduit !== colorDelete );
            localStorage.setItem("products", JSON.stringify(productInLocalStorage));

            alert("Ce produit a bien été supprimé du panier");
            location.reload();
        }) 
    }
}

productDelete();

//Fonction Modification de la quantité

function modifyMyQuantity() {
    let modifyQte = document.querySelectorAll(".itemQuantity");

    for (let c = 0; c < modifyQte.length; c++) {
        modifyQte[c].addEventListener("change", (e) => {
        e.preventDefault();

    let quantityModif = productInLocalStorage[c].quantiteProduit;
    let quantiteModifValue = modifyQte[c].valueAsNumber;

    const resultFindModif = productInLocalStorage.find((el) => el.quantityModifValue !== quantityModif);
        
            resultFindModif.quantiteProduit = quantiteModifValue;
            productInLocalStorage[c].quantiteProduit = resultFind.quantiteProduit;

            localStorage.setItem("products", JSON.stringify(productInLocalStorage));

            location.reload();

})
    }
}
modifyMyQuantity();


 