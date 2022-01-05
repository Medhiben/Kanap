let productInLocalStorage = JSON.parse(localStorage.getItem('products'));
console.log(productInLocalStorage);
const emptyCartPosition = document.querySelector("#cart_item");

// Si le panier est vide
function getCart(){
    if (productInLocalStorage === null || productInLocalStorage == 0) {
        const emptyCart = `<p>Votre panier est vide</p>`;
        emptyCartPosition.innerHTML = emptyCart;
    } else {
        productInLocalStorage.forEach((produit,i) => {
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
            productPrice.innerHTML = produit.price  + " €";

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
            productInsertionQuantity.setAttribute("name", "itemQuantity-"+ produit.idProduit);
            productInsertionQuantity.setAttribute("min", "1");
            productInsertionQuantity.setAttribute("max", "100");

            let productItemContentSettingsDelete = document.createElement("div");
            productArticle.appendChild(productItemContentSettingsDelete);
            productItemContentSettingsDelete.className = "cart__item__content__settings__delete";

            let productItemDelete =document.createElement("p");
            productItemContentSettingsDelete.appendChild(productItemDelete);
            productItemDelete.className = "deleteItem";
            productItemDelete.innerHTML = "Supprimer";
      })
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
        if(modifyQte[c].name === "itemQuantity-" + productInLocalStorage[c].idProduit) {

            let quantiteModifValue = modifyQte[c].valueAsNumber;
            
            productInLocalStorage[c].quantiteProduit
            productInLocalStorage[c].quantiteProduit = quantiteModifValue;
            localStorage.setItem("products", JSON.stringify(productInLocalStorage));
            location.reload();
        }
})
    }
}
modifyMyQuantity();

//Instauration du formulaire avec des regex
function formGet() {
    // Ajout des Regex pour le formulaire
    let form = document.querySelector(".cart__order__form");

    //Création des expressions regex 
    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
    let letterRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
    let adressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");


    // Ecoute de la modification du prénom
    form.firstName.addEventListener('change', function() {
        validFirstName(this);
    });

    // Ecoute de la modification du nom
    form.lastName.addEventListener('change', function() {
        validLastName(this);
    });

    // Ecoute de la modification de l'adresse
    form.address.addEventListener('change', function() {
        validAddress(this);
    });

    // Ecoute de la modification de la ville
    form.city.addEventListener('change', function() {
        validCity(this);
    });

    // Ecoute de la modification de l'email
    form.email.addEventListener('change', function() {
        validEmail(this);
    });

    //validation du Prénom
    const validFirstName = function(inputFirstName) {
        let firstNameErrorMsg = inputFirstName.nextElementSibling;

        if (letterRegExp.test(inputFirstName.value)) {
            firstNameErrorMsg.innerHTML = '';
        } else {
            firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation du Nom
    const validLastName = function(inputLastName) {
        let lastNameErrorMsg = inputLastName.nextElementSibling;

        if (letterRegExp.test(inputLastName.value)) {
            lastNameErrorMsg.innerHTML = '';
        } else {
            lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation de l'adresse
    const validAddress = function(inputAdress) {
        let adressErrorMsg = inputAdress.nextElementSibling;

        if (adressRegExp.test(inputAdress.value)) {
            adressErrorMsg.innerHTML = '';
        } else {
            adressErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation de la ville
    const validCity = function(inputCity) {
        let cityErrorMsg = inputCity.nextElementSibling;

        if (letterRegExp.test(inputCity.value)) {
            cityErrorMsg.innerHTML = '';
        } else {
            cityErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation de l'adresse Email
    const validEmail = function(inputEmail) {
        let emailErrorMsg = inputEmail.nextElementSibling;

        if (emailRegExp.test(inputEmail.value)) {
            emailErrorMsg.innerHTML = '';
        } else {
            emailErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };
 }
 formGet();
 console.log(formGet);

 // fonction pour l'Envoi des informations client au localstorage
 function postForm() {
    const buttonCommander = document.getElementById("order");



 }


