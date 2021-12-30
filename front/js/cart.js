let productInLocalStorage = JSON.parse(localStorage.getItem('products'));
console.log(productInLocalStorage);
const emptyCartPosition = document.querySelector("#cart_item");

// Si le panier est vide
function cartGet(){
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
            productImg.appendChild(productDivImg);
            productImg.src = produit.imgProduit;
            productImg.alt = produit.altImgProduit;

            let productItemContent = document.createElement("div");
            productArticle.appendChild(productItemContent);
            productItemContent.className = "cart__item__content";

            let productItemContentDescription = document.createElement("div");
            productItemContent.appendChild(productItemContentDescription);
            productItemContentDescription.className = "cart__item__content__description";

            let productTitle = document.createElement("h2");
            productItemContentDescription.appendChild(productTitle);
            productTitle.innerHTML = produit.nomProduit;

            let productGreen = document.createElement("p");
            productTitle.appendChild(productGreen);
            productGreen.innerHTML = produit.couleurProduit;

            let productPrice = document.createElement("p");
            productTitle.appendChild(productPrice);
            productPrice.innerHTML = produit.prixProduit;

            let productItemSettings = document.createElement("div");
            productArticle.appendChild(productItemSettings);
            productItemSettings.className = "cart__item__content__settings";

            let productItemSettingsQuantity = document.createElement("div");
            productItemSettings.appendChild(productItemSettingsQuantity);
            productItemSettingsQuantity.className = "cart__item__content__settings__quantity";

            let productQte = document.createElement("p");
            productItemSettingsQuantity.appendChild(productQte);
            productQte.innerHTML = produit.quantiteProduit;

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

            let productItemDelete =document.appendChild("p");
            productItemContentSettingsDelete.appendChild(productItemDelete);
            productItemDelete.className = "deleteItem";
            product.innerHTML = produit.optionsProduit;




            
            
            


            












        }
    }
    }
