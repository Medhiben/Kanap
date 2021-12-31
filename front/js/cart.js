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
            productArticle.setAttribute('data-id', produit.idProduit);

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
            productGreen.innerHTML = produit.colors;

            let productPrice = document.createElement("p");
            productTitle.appendChild(productPrice);
            productPrice.innerHTML = produit.price;

            let productItemSettings = document.createElement("div");
            productArticle.appendChild(productItemSettings);
            productItemSettings.className = "cart__item__content__settings";

            let productItemSettingsQuantity = document.createElement("div");
            productItemSettings.appendChild(productItemSettingsQuantity);
            productItemSettingsQuantity.className = "cart__item__content__settings__quantity";

            let productQte = document.createElement("p");
            productItemSettingsQuantity.appendChild(productQte);
            productQte.innerHTML = produit.quantityPicked;

            let productInsertionQuantity = document.createElement("input");
            productItemSettingsQuantity.appendChild(productInsertionQuantity);
            productInsertionQuantity.className = "itemQuantity";
            productInsertionQuantity.value = produit.quantityPicked;
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
    let elementsQuantityLenght = elementsQuantity.length;
    let quantityTotal = 0;

    for (let i = 0; i < elementsQuantityLenght; ++i) {
        quantityTotal += elementsQuantity[i].valueAsNumber;
    }

    let productTotalQuantity = document.getElementById("totalQuantity");
    productTotalQuantity.innerHTML = quantityTotal;
    console.log(quantityTotal);

    // Récupération du prix total
    let priceTotal = 0;

    for (let i = 0; i < elementsQuantityLenght; ++i) {
        priceTotal += (elementsQuantity[i].valueAsNumber * productInLocalStorage[i].price);
    }

    let productTotalPrice = document.getElementById("totalPrice");
    productTotalPrice.innerHTML = priceTotal;
    console.log(priceTotal);

}
getTotals();

// Suppression d'un produit
function productDelete() {
    let buttonDelete = document.querySelectorAll("deleteItem");
    let buttonDeleteLength = buttonDelete.length
    for (let a = 0; a < buttonDeleteLength; a++) {
        buttonDelete[a].addEventListener("click", (e) => {
            e.preventDefault();

            let idDelete = productInLocalStorage[a]._id;
            let colorDelete = productInLocalStorage[a].colors;


            productInLocalStorage = productInLocalStorage.filter( element => element._id !== idDelete || element.colors !== colorDelete );
            localStorage.setItem("products", JSON.stringify(productInLocalStorage));

            alert("Ce produit a bien été supprimé du panier");
            location.reload();
        })
    }
}
productDelete();